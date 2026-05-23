import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="main-nav">
      <NavLink className="nav-link" to="/" end>
        /home
      </NavLink>
      <NavLink className="nav-link" to="/about" end>
        /about
      </NavLink>
    </nav>
  )
}

export default Navigation;
