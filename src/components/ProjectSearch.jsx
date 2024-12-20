import { cn } from "@/lib/utils";
import axios from "axios";
import { ArrowUpRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

export default function ProjectSearch({ className }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [commercialProjects, setCommercialProjects] = useState([]);
  const [residentialProjects, setResidentialProjects] = useState([]);
  const [hospitalityProjects, setHospitalityProjects] = useState([]);
  const [lifeSciencesProjects, setLifeSciencesProjects] = useState([]);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.terminus-group.com/forms/project");
        if (response.data && response.data.length > 0) {
          console.log("projects data:", response.data);
          categorizeProjects(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const categorizeProjects = (projects) => {
      setCommercialProjects(() => projects.filter((project) => project.type === "commercial"));
      setResidentialProjects(() => projects.filter((project) => project.type === "residential"));
      setHospitalityProjects(() => projects.filter((project) => project.type === "hospitality"));
      setLifeSciencesProjects(() => projects.filter((project) => project.type === "life Sciences"));
    };

    if (open) fetchData();
  }, [open]);

  const handleNavigation = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <Search
        className={cn("-ms-1 me-3 text-foreground md:size-6 size-4 md:stroke-[3]", className)}
        aria-hidden="true"
        onClick={() => setOpen(true)}
      />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandSeparator />
          {commercialProjects.length > 0 && (
            <CommandGroup heading="Commercial Projects">
              {commercialProjects.map((project) => (
                <CommandItem
                  onSelect={() => {
                    handleNavigation(`/projects/${project._id}`);
                  }}
                  key={project._id}
                >
                  <ArrowUpRight size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                  <span>{project.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {/* Break */}
          {residentialProjects.length > 0 && (
            <CommandGroup heading="Residential Projects">
              {residentialProjects.map((project) => (
                <CommandItem
                  onSelect={() => {
                    handleNavigation(`/projects/${project._id}`);
                  }}
                  key={project._id}
                >
                  <ArrowUpRight size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                  <span>{project.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {hospitalityProjects.length > 0 && (
            <CommandGroup heading="Hospitality Projects">
              {hospitalityProjects.map((project) => (
                <CommandItem
                  onSelect={() => {
                    handleNavigation(`/projects/${project._id}`);
                  }}
                  key={project._id}
                >
                  <ArrowUpRight size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                  <span>{project.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {lifeSciencesProjects.length > 0 && (
            <CommandGroup heading="Life Science Projects">
              {lifeSciencesProjects.map((project) => (
                <CommandItem
                  onSelect={() => {
                    handleNavigation(`/projects/${project._id}`);
                  }}
                  key={project._id}
                >
                  <ArrowUpRight size={16} strokeWidth={2} className="opacity-60" aria-hidden="true" />
                  <span>{project.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
