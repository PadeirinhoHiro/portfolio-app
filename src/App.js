import "./App.css";
import { Header, Projects } from "./components/components.js";

function App() {
  document.title = "Portfolio";
  return (
    <div class="main_c">
      <Header />
      <Projects />
    </div>
  );
}

export default App;
