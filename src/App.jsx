import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import News from "./pages/News";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <div>
      <Navbar />

        <div style={{ paddingTop: "100px" }}>
          {/* Add padding to avoid content being hidden behind the navbar */}
          <Routes>
            <Route path="/about" Component={About} />
            <Route path="/contact" Component={Contact} />
            <Route path="/" Component={Home} />
            <Route path="/news" Component={News} />
            <Route path="/projects" Component={Projects} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
