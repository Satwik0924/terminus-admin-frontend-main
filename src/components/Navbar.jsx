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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleScroll = useCallback(() => {
    const cur = window.scrollY;
    setIsVisible(cur > 100);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const isMobile = windowWidth < 768;

  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/news", label: "News & Media" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`${pathname === "/" ? "fixed" : "sticky"} ${
        isVisible ? "bg-white" : "bg-transparent"
      } w-full top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="w-[95%] mx-auto px-4 flex items-center justify-between h-24">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" onClick={scrollToTop} className="relative inline-block">
            <div className="flex items-center relative">
              {/* T Logo */}
              <img
                src={LogoT}
                alt="T"
                className="object-contain h-10 w-10 absolute pr-2 cursor-pointer"
                onClick={scrollToTop}
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
        <div className="flex items-center">
          <button onClick={toggleMenu} className="block lg:hidden text-2xl focus:outline-none">
            {isMenuOpen ? "✕" : "☰"}
          </button>
          <ProjectSearch className="hidden md:block" />
        </div>
        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="hover:text-primary-foreground text-[#727272] transition-opacity duration-200 ease-in-out text-lg font-bold"
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
        {isMobile && isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md z-50">
            <ul className="flex flex-col items-center space-y-4 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => {
                      toggleMenu();
                      scrollToTop();
                    }}
                    className="text-[#727272] font-medium text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
