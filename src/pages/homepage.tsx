import "../css/Homepage.css";
import GithubWidget from "../components/githubwidget/githubwidget";
export default function homepage() {
  return (
    <div className="main_c">
      <Header />
      <GithubWidget />
    </div>
  );
}

function Header() {
  return (
    <header>
      <div className="header_c">
        <h1 className="title lexend">Padeiro</h1>
      </div>
    </header>
  );
}
