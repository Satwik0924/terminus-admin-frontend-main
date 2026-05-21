import { cn } from "@/lib/utils";
import LogoFooter from "../assets/tg_logo_full.png";
import { Link } from "react-router-dom";

const projectLinks = [
  { label: "Commercial", href: "/projects#commercial" },
  { label: "Residential", href: "/projects#residential" },
  { label: "Hospitality", href: "/projects#hospitality" },
  { label: "Life Sciences", href: "/projects#lifesciences" },
  { label: "Retail", href: "/projects#retail" },
  { label: "Education", href: "/projects#education" },
];

const aboutLinks = [
  { label: "Team", href: "/about#residential" },
  { label: "Milestones", href: "/#milestones" },
  { label: "Philanthropy", href: "/about#hospitality" },
  { label: "Awards", href: "/about#lifesciences" },
  { label: "Consultants", href: "/about#retail" },
  { label: "& Partners", href: "/about#retail" },
];

const contactLinks = [
  { label: "Reach Us", href: "/contact#reach_us" },
  { label: "Careers", href: "/contact#careers" },
];

const socialLinks = [
  { label: "Linkedin", href: "https://www.linkedin.com/company/3801269/admin/dashboard/" },
  { label: "Facebook", href: "https://www.facebook.com/terminusindiaindia" },
  { label: "Instagram", href: "https://www.instagram.com/terminus_group_" },
  { label: "Twitter", href: "https://x.com/Terminus_Group_" },
];

const Footer = () => {
  const currentYear = new Date().getUTCFullYear();
  return (
    <footer className="bg-white w-full">
      <div className="flex justify-between mx-auto pt-16 pb-6 px-6 md:px-16 w-full max-lg:flex-col">
        {/* Logo Section */}
        <div className="flex-1 lg:mb-0 max-lg:mb-10">
          <div className="relative flex md:flex-col max-md:items-baseline max-md:justify-between md:items-start max-md:flex-wrap max-md:gap-3">
            <div className="h-auto lg:h-52 w-52 overflow-hidden mb-0 p-0">
              <img src={LogoFooter} alt="Terminus" className="object-cover p-0 m-0" />
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex-1">
          <div className="grid md:grid-cols-4 gap-6 md:place-items-start items-start w-full max-md:grid-cols-1">
            {/* Projects */}
            <ul className="space-y-1 text-md font-normal">
              <h3 className="text-primary-foreground font-medium tracking-tighter">Projects</h3>
              {projectLinks.map((project, index) => (
                <li
                  className="hover:underline hover:underline-offset-4 text-black tracking-tighter"
                  key={`${project.label}-${index}`}
                >
                  <a style={{ all: "unset" }} href={`${project.href}`}>
                    {project.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* About */}
            <ul className="space-y-1 text-md font-normal">
              <h3 className="text-primary-foreground font-medium tracking-tighter">About</h3>
              {aboutLinks.map((project, index) => (
                <li
                  className="hover:underline hover:underline-offset-4 text-black tracking-tighter"
                  key={`${project.label}-${index}`}
                >
                  <a style={{ all: "unset" }} href={`${project.href}`}>
                    {project.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* News & Media */}
            <ul className="space-y-1 text-md font-normal">
              <a href="/news">
                <h3 className="text-primary-foreground font-medium tracking-tighter">News & Media</h3>
              </a>
            </ul>

            {/* Contact */}
            <ul className="space-y-1 text-md font-normal">
              <h3 className="text-primary-foreground font-medium tracking-tighter">Contact</h3>
              {contactLinks.map((project, index) => (
                <li
                  className="hover:underline hover:underline-offset-4 text-black tracking-tighter"
                  key={`${project.label}-${index}`}
                >
                  <a style={{ all: "unset" }} href={`${project.href}`}>
                    {project.label}
                  </a>
                </li>
              ))}
              <li className="h-6 my-3"></li>
              {socialLinks.map((project, index) => (
                <li
                  className={cn(
                    "hover:underline hover:underline-offset-4 text-black tracking-tighter",
                    socialLinks.length - 1 === index ? "w-full flex items-center justify-between" : ""
                  )}
                  key={`${project.label}-${index}`}
                >
                  <a style={{ all: "unset" }} href={`${project.href}`}>
                    {project.label}
                  </a>
                  {index === socialLinks.length - 1 && (
                    <h2 className="font-medium text-black md:hidden">{new Date().getFullYear()}</h2>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center w-full py-4">
        <span className="text-black cursor-text">© Terminus Group {currentYear} All Rights Reserved.</span>{" "}
        <Link to="/privacy-policy" className="text-primary hover:underline hover:underline-offset-4 font-medium">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
