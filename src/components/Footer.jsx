import LogoFooter from "../assets/tg_logo_full.png";

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
  return (
    <footer className="bg-white w-full">
      <div className="flex justify-between mx-auto py-16 lg:px-16 w-full">
        <div className="flex-1 max-lg:hidden">
          <div className="h-52 w-52  overflow-hidden">
            <img src={LogoFooter} alt="Terminus" className="object-cover h-auto w-full" />
          </div>
          <h1 className="font-medium text-black">{new Date().getFullYear()}</h1>
        </div>
        <div className="flex-1 max-lg:w-full">
          <div className="grid grid-cols-4 gap-2 place-items-center items-start w-full max-sm:grid-cols-2">
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
              <li className="h-6 my-3"></li> {/* Adds a subtle dividing line */}
              {socialLinks.map((project, index) => (
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
