import React from "react";
import LogoFooter from "../assets/tg_logo_footer.webp";

const projectLinks = [
  { label: "Commercial", href: "#" },
  { label: "Residential", href: "#" },
  { label: "Hospitality", href: "#" },
  { label: "Life Sciences", href: "#" },
];

const aboutLinks = [
  { label: "Team", href: "#" },
  { label: "News & Media", href: "#" },
  { label: "Philanthropy", href: "#" },
];

const contactLinks = [
  { label: "Reach Us", href: "#" },
  { label: "Careers", href: "#" },
];

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Pinterest", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-primary-foreground w-full">
      <div className="flex justify-between mx-auto py-16 lg:px-16 w-full">
        <div className="flex-1 max-lg:hidden">
          <div className="h-64 w-64 overflow-hidden">
            <img src={LogoFooter} alt="Terminus" className="object-cover h-auto w-full" />
          </div>
          <h1 className="text-2xl">{new Date().getFullYear()}</h1>
        </div>
        <div className="flex-1 max-lg:w-full">
          <div className="grid grid-cols-3 gap-6 place-items-center items-start w-full max-sm:grid-cols-2">
            {/* Projects */}
            <ul className="space-y-3 text-2xl font-normal">
              <h3 className="text-white font-serif">Projects</h3>
              {projectLinks.map((project, index) => (
                <li className="font-serif hover:underline hover:underline-offset-4" key={`${project.label}-${index}`}>
                  {project.label}
                </li>
              ))}
            </ul>
            {/* About */}
            <ul className="space-y-3 text-2xl font-normal">
              <h3 className="text-white font-serif">About</h3>
              {aboutLinks.map((project, index) => (
                <li className="font-serif hover:underline hover:underline-offset-4" key={`${project.label}-${index}`}>
                  {project.label}
                </li>
              ))}
            </ul>
            {/* Contact */}
            <ul className="space-y-3 text-2xl font-normal">
              <h3 className="text-white font-serif">Contact</h3>
              {contactLinks.map((project, index) => (
                <li className="font-serif hover:underline hover:underline-offset-4" key={`${project.label}-${index}`}>
                  {project.label}
                </li>
              ))}
              <li className="h-6 my-3"></li> {/* Adds a subtle dividing line */}
              {socialLinks.map((project, index) => (
                <li className="font-serif hover:underline hover:underline-offset-4" key={`${project.label}-${index}`}>
                  {project.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
