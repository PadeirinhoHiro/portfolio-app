import "../githubwidget/githubwidget.css";
import { useState, useEffect } from "react";
import { fetchGitHubData } from "../services/githubService";


type GitHubData = {
  profile: {
    html_url: string;
    public_repos: number;
    followers: number;
  } | null;
  repositories: {
    id: number;
    name: string;
    html_url: string;
    stargazers_count: number;
  }[];
  recentActivity: {
    created_at: string;
    repo: { name: string };
    payload: { commits: { message: string }[] };
  }[];
};


const GithubWidget = () => {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  // Substitua pelo seu username do GitHub
  const githubUsername = "padeirinhohiro";

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGitHubData(githubUsername);
        if (data) {
          setGithubData(data);
        } else {
          setError("Não foi possível carregar os dados do GitHub");
        }
      } catch (err : any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [githubUsername]);

  if (loading)
    return <div className="loading">Carregando dados do GitHub...</div>;
  if (error) 
    return <div className="error">Erro: {error}</div>;
  if (!githubData || !githubData.profile) 
    return <div>Sem dados disponíveis.</div>;

  
  return (
    <div className="github-widget">
      <h3>
        <a
          href={githubData.profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Atividade no GitHub
        </a>
      </h3>

      <div className="github-stats">
        <div className="stat">
          <span>Repositórios</span>
          <strong>{githubData.profile.public_repos}</strong>
        </div>
        <div className="stat">
          <span>Seguidores</span>
          <strong>{githubData.profile.followers}</strong>
        </div>
      </div>

      <div className="recent-repos">
        <h4>Repositórios Recentes</h4>
        <ul>
          {githubData.repositories.slice(0, 5).map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              <span>{repo.stargazers_count} ⭐</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="recent-activity">
        <h4>Últimos Commits</h4>
        <ul>
          {githubData.recentActivity.map((event, index) => (
            <li key={index}>
              <p>
                <strong>
                  {event.repo.name.replace(`${githubUsername}/`, "")}
                </strong>
                <span className="date">
                  {new Date(event.created_at).toLocaleDateString()}
                </span>
              </p>
              <p className="commit-message">
                {event.payload.commits[0].message}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GithubWidget;
