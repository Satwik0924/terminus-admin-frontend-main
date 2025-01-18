import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: "commercial", label: "About" },
    { id: "residential", label: "Team" },
    { id: "milestones", label: "Milestones" },
    { id: "hospitality", label: "Philanthropy" },
    { id: "lifesciences", label: "Awards" },
    { id: "retail", label: "Consultants & Partners" },
  ];

  const handleItemClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(id); // Set active section immediately

    if (id !== "milestones") {
      const targetElement = document.getElementById(id);
      if (targetElement) {
        const offset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        setTimeout(() => {
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }, 0);
      }
    }
  };

  // Handle button click separately
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full px-5 z-50">
      <button
        onClick={handleButtonClick}
        className="flex items-center justify-between w-full px-4 py-3 text-xl font-medium bg-background border focus:outline-none"
      >
        <span className="text-2xl tracking-tighter">
          {navigationItems.find((item) => item.id === activeSection)?.label || "About"}
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          {/* Add overlay to catch clicks outside */}
          <div className="fixed inset-0 bg-transparent" onClick={() => setIsOpen(false)} />
          <div className="absolute z-50 w-full mt-2 bg-background border  shadow-lg">
            <ul className="py-2">
              {navigationItems.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={(e) => handleItemClick(e, id)}
                    className={`w-full text-left px-4 py-3 text-lg transition-colors duration-200 tracking-tighter ${
                      activeSection === id ? "text-[#F58220]" : "text-foreground hover:bg-gray-100"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
