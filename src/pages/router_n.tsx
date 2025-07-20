import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Bio } from "./bio";
import { Projects } from "./projects";
import { Layout } from "./layout_n";
import Homepage from "./homepage";

export function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="about" element={<Bio />} />
        </Route>
      </Routes>
    </Router>
  );
}
