import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import News from "./pages/News";
import Projects from "./pages/Projects";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul style={{ listStyle: "none", display: "flex", gap: "20px" }}>
            <li>
              {/* Replace 'Terminus' with the actual logo */}
              <a href="/">Terminus</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/news">News</a>
            </li>
            <li>
              <a href="/projects">Projects</a>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/about" Component={About} />
          <Route path="/contact" Component={Contact} />
          <Route path="/" Component={Home} />
          <Route path="/news" Component={News} />
          <Route path="/projects" Component={Projects} />
        </Routes>
      </div>
    </Router>
  );
}
