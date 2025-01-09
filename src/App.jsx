import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import News from "./pages/News";
import Projects from "./pages/Projects";
import ProjectDetailPage from "./components/ProjectDetailPage";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div>
          {/* Add padding to avoid content being hidden behind the navbar */}
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/news" Component={News} />
            <Route path="/about" Component={About} />
            <Route path="/contact" Component={Contact} />
            <Route path="/projects" Component={Projects} />
            <Route path="/projects/:id" Component={ProjectDetailPage} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

//