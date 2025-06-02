import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Bio } from "./bio.js";
import { Projects } from "./projects.js";
import { Layout } from "./layout_n.js";
import Homepage from "./homepage.js";

export function Routing() {
  return (
    <Router basename="/portfolio-app">
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
