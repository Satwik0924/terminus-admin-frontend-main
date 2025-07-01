import { Toaster } from "react-hot-toast";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProjectDetailPage from "./components/ProjectDetailPage";
import { ProjectRedirect } from "./components/ProjectRedirect";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import News from "./pages/News";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Projects from "./pages/Projects";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Router>
        <div>
          <Navbar />
          <div>
            {/* Add padding to avoid content being hidden behind the navbar */}
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/blogs" Component={Blogs} />
              <Route path="/blogs/:slug" Component={BlogDetail} />
              <Route path="/news" Component={News} />
              <Route path="/about" Component={About} />
              <Route path="/contact" Component={Contact} />
              <Route path="/projects" Component={Projects} />
              <Route path="/projects/:slug/:id" element={<ProjectRedirect />} />
              <Route path="/projects/:slug" Component={ProjectDetailPage} />
              <Route path="/privacy-policy" Component={PrivacyPolicy} />
              <Route
                path="/theline"
                Component={() => {
                  window.location.href = "https://www.info.terminus-group.com/theline/";
                  return null;
                }}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
//
