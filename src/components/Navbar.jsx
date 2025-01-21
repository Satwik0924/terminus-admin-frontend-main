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
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const pathname = useLocation().pathname;
  const [isVisible, setIsVisible] = useState(false);
  const [logo, setLogo] = useState(fullLogo);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "auto";
      return !prev;
    });
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

  const scrollToSection = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    } else {
      window.location.href = `/#${id}`;
    }
    setIsMenuOpen(false);
    // setIsAboutOpen(false);
    document.body.style.overflow = "auto";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto";
    };
  }, [handleScroll]);

  useEffect(() => {
    // Automatically open the "About" dropdown if the user is on the "About" page
    setIsAboutOpen(pathname === "/about");
  }, [pathname]);

  const aboutSublinks = [
    { id: "news", label: "Team" },
    { id: "milestones", label: "Milestones" },
    { id: "hospitality", label: "Philanthropy" },
    { id: "lifesciences", label: "Awards" },
    { id: "retail", label: "Consultants & Partners" },
  ];

  const navLinks = [
    {
      href: "/about",
      label: "About",
      hasDropdown: true,
      subLinks: aboutSublinks,
    },
    { href: "/projects", label: "Projects" },
    { href: "/news", label: "News & Media" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`${pathname === "/" ? "fixed" : "sticky"} ${
        isVisible || isMenuOpen ? "bg-white" : "bg-transparent"
      } w-full top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out`}
    >
      <div className="w-[95%] mx-auto px-4 flex items-center justify-between h-24 overflow-hidden">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" onClick={scrollToTop} className="relative inline-block">
            <div className="flex items-center relative">
              <img
                src={LogoT}
                alt="T"
                className="object-contain lg:h-10 lg:w-10 h-[33px] w-[33px] absolute pr-2 cursor-pointer"
                onClick={scrollToTop}
              />
              <img
                src={HalfLogo}
                alt="Erminus"
                className={cn(
                  "object-contain lg:w-64 lg:h-64 w-52 h-52 transition-opacity duration-500 ease-out",
                  isVisible || isMenuOpen ? "opacity-0" : "opacity-100"
                )}
              />
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex gap-5 items-center">
          <button onClick={toggleMenu} className="md:hidden bg-transparent border-none cursor-pointer">
            {isMenuOpen ? "✕" : "☰"}
          </button>
          <ProjectSearch className="md:hidden" />
        </div>

        {/* Desktop Navigation */}
        <ul className="flex items-center justify-between list-none w-full m-0 pt-2 flex-1 max-lg:!flex-[1.5] max-md:hidden">
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
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-24 bg-white z-50 transition-all duration-300 ease-out ${
          isMenuOpen ? "opacity-100 border-y border-input" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-start justify-start list-none m-0 p-4 pt-6 gap-6 w-full">
          {navLinks.map((link) => (
            <li key={link.href} className="w-full">
              {link.hasDropdown ? (
                <div className="w-full">
                  <div className="flex items-center justify-between w-full px-4">
                    {pathname === "/about" ? (
                      <span className="text-[#727272] bg-transparent border-none cursor-pointer p-0 text-left font-normal">
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => {
                          toggleMenu();
                          scrollToTop();
                        }}
                        className="text-[#727272] no-underline"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                  {pathname === "/about" && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isAboutOpen ? "max-h-96" : "max-h-0"}`}
                    >
                      <ul className="list-none pl-8 gap-2 m-0 pt-2">
                        {link.subLinks.map((subLink) => (
                          <li key={subLink.id} className="m-0 py-2">
                            <button
                              onClick={() => scrollToSection(subLink.id)}
                              className="text-[#727272] hover:text-primary-foreground transition-colors duration-200 bg-transparent border-none cursor-pointer text-sm"
                            >
                              {subLink.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={link.href}
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                  className="text-[#727272] px-4 no-underline"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
