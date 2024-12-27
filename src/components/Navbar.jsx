import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HalfLogo from "../assets/tg_logo_erminus.png";
import fullLogo from "../assets/tg_logo_full.webp";
import LogoT from "../assets/tg_logo_t.svg";
import useWindowDimensions from "../hooks/useWindowDimensions";
import ProjectSearch from "./ProjectSearch";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const pathname = useLocation().pathname;
  const [isVisible, setIsVisible] = useState(false);
  const [logo, setLogo] = useState(fullLogo);

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

  const styles = {
    container: {
      width: "95%",
      margin: "0 auto",
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "6rem",
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
    mobileMenu: {
      display: "none",
      position: "absolute",
      left: 0,
      right: 0,
      top: "6rem",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
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
    },
  };

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

  return (
    <nav
      className={`${pathname === "/" ? "fixed" : "sticky"} ${isVisible ? "bg-white" : "bg-transparent"} w-full top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <div style={styles.container}>
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" onClick={scrollToTop} className="relative inline-block">
            <div className="flex items-center relative">
              {/* T Logo */}
              <img
                src={LogoT}
                alt="T"
                className="object-contain h-10 w-10 absolute pr-2 cursor-pointer"
                onClick={scrollToTop} // Ensure T logo always navigates to the top
              />
              {/* Erminus Logo */}
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
                onClick={scrollToTop}
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
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                  style={{ color: "#727272" }}
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
