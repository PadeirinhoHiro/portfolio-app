import { useEffect, useState } from "react";
import { fetchGitHubData } from "../Auxiliary/GithubFetch";
import type { GitHubData } from "../Auxiliary/GithubFetch";
import "./Homescreen.css"


function Homescreen() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGitHub = async () => {
      const data = await fetchGitHubData("PadeirinhoHiro");

      setGithubData(data);
      setLoading(false);
    };

    loadGitHub();
  }, []);

  if (loading) {
    return (
      <main className="homescreen">
        <pre className="loading-text">
          {`
Inicializando terminal...
Carregando perfil de Pão...
`}
        </pre>
      </main>
    );
  }

  if (githubData?.error) {
    return (
      <main className="homescreen">
        <pre className="error-text">
          {githubData.error}
        </pre>
      </main>
    );
  }

  return (
    <main className="homescreen">
      <div className="terminal-window">
        <header className="terminal-header">
          Home Terminal
        </header>

        <section className="terminal-content">
          <section className="dashboard-content">
            <div className="terminal-section">
              <p className="terminal-command">
                ./profile --info
              </p>

              <div className="profile-stats-grid">
                <div className="profile-stat-card">
                  <p className="stat-title">
                    Repositories
                  </p>

                  <p className="stat-value">
                    {githubData?.profile?.public_repos}
                  </p>
                </div>

                <div className="profile-stat-card">
                  <p className="stat-title">
                    Followers
                  </p>

                  <p className="stat-value">
                    {githubData?.profile?.followers}
                  </p>
                </div>

                <div className="profile-stat-card">
                  <p className="stat-title">
                    Following
                  </p>

                  <p className="stat-value">
                    {githubData?.profile?.following}
                  </p>
                </div>

                <div className="profile-stat-card">
                  <p className="stat-title">
                    Since
                  </p>

                  <p className="stat-value">
                    {new Date(
                      githubData?.profile?.created_at || "",
                    ).getFullYear()}
                  </p>
                </div>
              </div>
            </div>

            <div className="terminal-section">
              <p className="terminal-command">
                ./repositories --recent
              </p>

              <div className="repositories-list">
                {githubData?.repositories?.map((repo) => (
                  <div
                    key={repo.id}
                    onClick={() => window.open(repo.html_url, "_blank", "noreferrer")}
                    onKeyDown={(e) => e.key === "Enter" && window.open(repo.html_url, "_blank", "noreferrer")}
                    role="link"
                    tabIndex={0}
                    className="repository-card"
                  >
                    <div className="repository-header">
                      <h2 className="repository-name">
                        {repo.name}
                      </h2>

                      <span className="repository-language">
                        {repo.language || "Unknown"}
                      </span>
                    </div>

                    <p className="repository-description">
                      {repo.description || "Sem descrição"}
                    </p>

                    <div className="repository-footer">
                      <span className="repository-stars">
                        stars: {repo.stargazers_count}
                      </span>

                      <span className="repository-date">
                        updated:{" "}
                        {new Date(
                          repo.updated_at,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="terminal-section">
              <p className="terminal-command">
                ./links
              </p>

              <a
                href={githubData?.profile?.html_url}
                target="_blank"
                rel="noreferrer"
                className="profile-link"
              >
                github.com/PadeirinhoHiro
              </a>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}


export default Homescreen;
