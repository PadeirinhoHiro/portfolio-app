import "../css/Homepage.css";
import GithubWidget from "../components/githubwidget/githubwidget.jsx";
export default function homepage() {
  return (
    <div className="main_c">
      <Header />
    </div>
  );
}

function Header() {
  return (
    <header>
      <div header_c>
        <h1 className="title lexend">Padeiro</h1>
        <GithubWidget />
      </div>
    </header>
  );
}
