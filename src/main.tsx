import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Homescreen from "./Homescreen/Homescreen";
import Navigation from "./Auxiliary/Navigation/Navigation";
import "./main.css"
import About from "./About/About";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route index path="/" element={<Homescreen />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter >,
);

