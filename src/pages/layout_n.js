import { Link, Outlet } from "react-router-dom";
import "../css/Layout.css"; // Importe um arquivo de estilos específico

export function Layout() {
  return (
    <div className="layout-container">
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link lexend">
              Página Principal
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className="nav-link lexend">
              Projetos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link lexend">
              Sobre
            </Link>
          </li>
        </ul>
      </nav>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}
