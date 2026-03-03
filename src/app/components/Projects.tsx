import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import aqumodaImage from "@/assets/aquimoda.PNG";
import gymImage from "@/assets/gym.PNG";
import jobFinderImage from "@/assets/jobfinder.PNG";

export function Projects() {
  const projects = [
    {
      title:
        "Aquimoda London — Luxury Personal Styling & Wardrobe Curation Platform",
      description:
        "luxury fashion and lifestyle website built to showcase and support bespoke personal styling services, including wardrobe curation, expert fashion sourcing, and personal shopping. The platform emphasizes exclusivity, premium brand storytelling, and seamless client booking experiences for high-end clientele.",
      image: aqumodaImage,

      tags: ["HTML", "CSS", "JavaScript", "Figma"],
      align: "left",
      demoUrl: "https://aquimoda.vercel.app/",
      repoUrl: "https://github.com/OzoyahOyakhire/aquimoda",
    },
    {
      title: "Get-fit Gym — Modern Fitness & Membership Experience Platform",
      description:
        "A modern, responsive gym website designed to showcase fitness services, drive membership signups, and present training programs through a clean, high-performance user interface. ",
      image: gymImage,
      tags: ["React", "Tailwindcss", "Framer Motion"],
      align: "right",
      demoUrl: "https://oze-gym-website.vercel.app/",
      repoUrl: "https://github.com/OzoyahOyakhire/gym-website",
    },
    {
      title: "Job Finder — Intelligent Job Search & Listings Platform",
      description:
        " A modern job discovery platform that allows users to search, filter, and explore job opportunities with ease. The interface focuses on intuitive job search, advanced filtering by role and location, and clean presentation of job details — delivering a seamless job-seeker experiences",
      image: jobFinderImage,
      tags: ["React", "TailwindCss", "Firebase", "Redux"],
      align: "left",
      demoUrl: "job-finder-one-ebon.vercel.app",
      repoUrl: "https://github.com/OzoyahOyakhire/Job-finder-React-ap",
    },
  ];

  return (
    <section id="projects" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm mb-6">
            Featured Work
          </div>
          <h2 className="text-5xl mb-6">Products I've built</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world applications solving real problems for real users.
          </p>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                project.align === "right" ? "md:grid-flow-dense" : ""
              }`}
            >
              
              <div
                className={project.align === "right" ? "md:col-start-2" : ""}
              >
                <div className="group relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-300">
                  <div className="aspect-[16/10] overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <div
                className={
                  project.align === "right"
                    ? "md:col-start-1 md:row-start-1"
                    : ""
                }
              >
                <h3 className="text-4xl mb-4">{project.title}</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-700 border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200"
                  >
                    Live Demo
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
