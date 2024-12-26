import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HalfLogo from "../assets/tg_logo_erminus.png";
import fullLogo from "../assets/tg_logo_full.webp";
import LogoT from "../assets/tg_logo_t.svg";
import useWindowDimensions from "../hooks/useWindowDimensions";
import ProjectSearch from "./ProjectSearch";

// const  =
//   "https://i-p.rmcdn.net/6704dad37ea051caab873de5/5036787/image-27f5270f-9dd9-4b1e-9dad-9d96ce0f1455.png?w=302&amp;e=webp&amp;nll=true&amp;cX=0&amp;cY=9&amp;cW=1299&amp;cH=172 2x;";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const pathname = useLocation().pathname;
  const [isVisible, setIsVisible] = useState(false);
  const [logo, setLogo] = useState(fullLogo);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleScroll = useCallback(() => {
    const cur = window.scrollY;
    setIsVisible(cur > 100);
    if (cur > 400) {
      setLogo(LogoT);
    } else {
      setLogo(fullLogo);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [location]);

  const styles = {
    container: {
      width: "95%",
      margin: "0 auto",
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "6rem",
      overflow: "hidden",
    },
    menuButton: {
      display: "none",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    desktopNavList: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      listStyle: "none",
      width: "100%",
      margin: 0,
      padding: 0,
      flex: 1,
    },
    navLink: {
      textDecoration: "none",
      fontWeight: 500,
      fontSize: "0.95rem",
      letterSpacing: "-0.2px",
      transition: "opacity 0.2s ease",
      color: "#727272",
    },
    mobileMenu: {
      display: "none",
      position: "absolute",
      left: 0,
      right: 0,
      top: "6rem",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      transition: "opacity 0.3s ease-in-out",
      backgroundColor: "white",
      opacity: 1,
    },
    mobileNavList: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      listStyle: "none",
      margin: 0,
      padding: "16px 0",
      gap: "16px",
      color: "#727272",
    },
  };

  // Responsive adjustments
  const isMobile = windowWidth < 768;
  if (isMobile) {
    styles.menuButton.display = "block";
    styles.desktopNavList.display = "none";
    styles.mobileMenu.display = isMobile ? "block" : "none";
    styles.mobileMenu.opacity = isMenuOpen ? "1" : "0";
  }

  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/news", label: "News & Media" },
    { href: "/contact", label: "Contact" },
  ];

  // shadow-md shadow-gray-200/50 backdrop-blur-2xl bg-white/30

  return (
    <nav
      className={`${pathname === "/" ? "fixed" : "sticky"} ${isVisible ? "bg-white" : "bg-transparent"} w-full top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out`}
    >
      <div style={styles.container}>
        {/* Change this with the Logo */}
        <div className="flex-1">
          <Link to="/" className={`relative overflow-hidden inline-block`}>
            <div className="flex items-center relative">
              <img src={LogoT} alt="T" className="object-contain h-10 w-10 absolute pr-2" />
              <img
                src={HalfLogo}
                alt="Erminus"
                className={cn(
                  "object-contain lg:w-64 lg:h-64 w-52 h-52 transition-opacity duration-500 ease-out",
                  isVisible ? "opacity-0" : "opacity-100"
                )}
              />
            </div>
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="flex gap-5 items-center">
          <button onClick={toggleMenu} style={styles.menuButton}>
            {isMenuOpen ? "✕" : "☰"}
          </button>
          <ProjectSearch className="md:hidden" />
        </div>
        {/* Desktop Navigation */}
        <ul className="flex items-center justify-between list-none w-full m-0 pt-2 flex-1 max-lg:!flex-[1.5]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="hover:text-primary-foreground text-[#727272] transition-opacity duration-200 ease-in-out xl:text-[22px] text-base font-bold"
                onClick={() => {
                  scrollToTop();
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <ProjectSearch />
          </li>
        </ul>
        {/* Mobile Menu */}
        <div style={styles.mobileMenu}>
          <ul style={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  style={{
                    ...styles.navLink,
                  }}
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
