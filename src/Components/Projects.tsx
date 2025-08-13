import { ReactComponent as LinkIcon } from "../assets/arrow-top-right.svg";
import projects from "../Data/projects.json";
import { TiltCard } from "./TiltCard";
import { useState, useEffect } from "react";
import { fetchProjectThumbnail, fetchProjectData } from "../dataFetch";

export function Projects() {
  function ProjectCard({ universeId }: { universeId: string }) {
    const project = projects.find((p) => p.universeId === universeId);
    const [projectData, setProjectData] = useState({
      placeId: project?.placeId || "",
      name: project?.name || "",
      description: project?.description || "",
      created: project?.created || "N/A",
      visits: project?.visits || "N/A",
      favorites: project?.favorites || "N/A",
      thumbnail: project?.thumbnail || "",

      playing: "N/A",
    });

    // fetch project data from Roblox API
    useEffect(() => {
      fetchProjectThumbnail(universeId).then((imageUrl) => {
        setProjectData((prev) => ({
          ...prev,
          thumbnail: imageUrl || prev?.thumbnail,
        }));
      });

      fetchProjectData(universeId).then((data) => {
        if (!data) return;
        setProjectData((prev) => ({
          ...prev,
          ...data,
        }));
      });
    }, []);

    return (
      <TiltCard
        rotateMax={2}
        scale={1.05}
        className="opacity-100 bg-white shadow-lg hover:shadow-2xl hover:z-20 rounded-[20px] p-3 w-[400px] h-[400px] flex flex-col transition-all duration-300 ease-out group"
      >
        <a
          className="relative  rounded-lg w-full mx-auto aspect-video group"
          href={`https://www.roblox.com/games/${projectData?.placeId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={projectData?.thumbnail || ""}
            alt="Project Thumbnail"
            className="rounded-lg group-hover:brightness-75 transition-all"
          />
          <LinkIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
               h-6 w-6 opacity-0 fill-white group-hover:opacity-100 transition-opacity"
          />
        </a>
        <div className="mt-2 flex justify-between items-center">
          <h3 className="text-[1.2em] font-bold">{projectData?.name}</h3>
          <div className="defaultFont flex items-center gap-1.5">
            <div className="bg-red-600 rounded-full h-1.5 w-1.5 group-hover:animate-ping mb-0.5" />
            {projectData?.playing}
          </div>
        </div>
        <p className="text-[0.9em] text-gray-600 mt-1 defaultFont">
          {projectData?.description}
        </p>
        <p className="text-[0.9em] text-gray-600 mt-auto defaultFont">
          Created on: {projectData?.created}
        </p>
        <div className="flex justify-between mt-0.5 defaultFont">
          <span>Visits: {projectData?.visits}</span>
          <span>Favorites: {projectData?.favorites}</span>
        </div>
      </TiltCard>
    );
  }

  return (
    <section id="projects" className="p-[20px]">
      <h2 className="text-[2em] text-[#009dff] text-center mt-[10px] mb-[20px] boldFont">
        Our Projects
      </h2>
      <div className="flex flex-wrap gap-5 my-[30px] justify-center">
        {projects.map((project) => (
          <ProjectCard key={project.placeId} universeId={project.universeId} />
        ))}
      </div>
    </section>
  );
}
