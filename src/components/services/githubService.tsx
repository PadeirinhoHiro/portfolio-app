// src/services/githubService.js
const GITHUB_API = "https://api.github.com";
const CACHE_EXPIRY = 15 * 60 * 1000; // 15 minutos em milissegundos

export const fetchGitHubData = async (username : string) => {
  const cacheKey = `github-${username}`;
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
  };
    // Verifica o cache primeiro
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_EXPIRY) {
      return data;
    }
  }

  try {
    // Dados básicos do usuário
    const userResponse = await fetch(
      `${GITHUB_API}/users/${username}`,
      requestOptions,
    );
    if (!userResponse.ok) throw new Error("Falha ao buscar dados do usuário");
    const profile = await userResponse.json();

    // Repositórios (ordenados por mais recentes)
    const reposResponse = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&direction=desc&per_page=6`,
      requestOptions,
    );
    if (!reposResponse.ok) throw new Error("Falha ao buscar repositórios");
    const repositories = await reposResponse.json();

    // Eventos públicos (para commits recentes)
    const eventsResponse = await fetch(
      `${GITHUB_API}/users/${username}/events/public?per_page=30`,
      requestOptions,
    );
    if (!eventsResponse.ok) throw new Error("Falha ao buscar atividades");
    const eventsData = await eventsResponse.json();

    // Processa apenas eventos de push (commits)
    const recentActivity = eventsData
      .filter((event : Event) => event.type === "PushEvent")
      .slice(0, 5); // Limita a 5 commits mais recentes

    // Prepara o objeto de retorno
    const responseData = {
      profile,
      repositories,
      recentActivity,
      lastUpdated: new Date().toISOString(),
    };

    // Atualiza o cache
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data: responseData,
        timestamp: Date.now(),
      }),
    );

    return responseData;
} catch (error: unknown) {
  console.error("Erro ao buscar dados do GitHub:", error);

  let errorMessage = "Erro desconhecido";
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  // Se houver cache, retorna mesmo com erro
  if (cachedData) {
    return JSON.parse(cachedData).data;
  }

  return {
    profile: null,
    repositories: [],
    recentActivity: [],
    error: errorMessage,
    lastUpdated: new Date().toISOString(),
  }
  }
}
