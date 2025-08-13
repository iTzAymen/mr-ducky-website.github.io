import { ReactComponent as LinkIcon } from "../assets/arrow-top-right.svg";

import { TiltCard } from "./TiltCard";

import { abbreviateNumber } from "../utils";
import type { ProjectData } from "../Types";
import { useEffect, useState } from "react";

function ThumbnailCarousel({
  thumbnails,
  isHovered,
}: {
  thumbnails: string[];
  isHovered?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (thumbnails.length <= 1) return;
    if (!isHovered) {
      setCurrentIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === thumbnails.length - 1 ? 0 : prev + 1
      );
    }, 3000); // 4 seconds

    return () => clearInterval(interval);
  }, [isHovered, thumbnails.length]);

  return (
    <div className="relative rounded-lg w-full mx-auto aspect-video group/thumbnail overflow-hidden">
      {thumbnails.map((thumbnail, index) => (
        <img
          src={thumbnail || ""}
          alt={`Project Thumbnail ${currentIndex + 1}`}
          className={`rounded-lg absolute w-full h-full object-cover group-hover/thumbnail:brightness-75 transition-all duration-500 ${
            currentIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Link Icon overlay */}
      <LinkIcon
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
         h-6 w-6 opacity-0 fill-white group-hover/thumbnail:opacity-100 transition-opacity"
      />

      {/* Dots (not clickable) */}
      {thumbnails.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {thumbnails.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all bg-white hidden group-hover/card:block ${
                currentIndex === index ? "scale-110" : "opacity-30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ projectData }: { projectData: ProjectData }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TiltCard
      rotateMax={2}
      scale={1.05}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="opacity-100 bg-white shadow-lg hover:shadow-2xl hover:z-20 rounded-[20px] p-3 w-[400px] h-[400px] flex flex-col transition-all duration-300 ease-out group/card"
    >
      <a
        className="relative  rounded-lg w-full mx-auto aspect-video group/thumbnail"
        href={`https://www.roblox.com/games/${projectData?.placeId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ThumbnailCarousel
          isHovered={isHovered}
          thumbnails={projectData?.thumbnails || []}
        />
      </a>
      <div className="mt-2 flex justify-between items-center">
        <h3 className="text-[1.2em] font-bold">{projectData?.name}</h3>
        <div className="defaultFont flex items-center gap-1.5">
          <div className="bg-red-600 rounded-full h-1.5 w-1.5 group-hover/card:animate-ping mb-0.5" />
          {abbreviateNumber(projectData?.playing)}
        </div>
      </div>
      <p className="text-[0.9em] text-gray-600 mt-1 defaultFont">
        {projectData?.description}
      </p>
      <p className="text-[0.9em] text-gray-600 mt-auto defaultFont">
        Created on: {projectData?.created}
      </p>
      <div className="flex justify-between mt-0.5 defaultFont">
        <span>Visits: {abbreviateNumber(projectData?.visits)}</span>
        <span>Favorites: {abbreviateNumber(projectData?.favorites)}</span>
      </div>
    </TiltCard>
  );
}

export function Projects({ projectsData }: { projectsData: ProjectData[] }) {
  return (
    <section id="projects" className="p-[20px]">
      <h2 className="text-[2em] text-[#009dff] text-center mt-[10px] mb-[20px] boldFont">
        Our Projects
      </h2>
      <div className="flex flex-wrap gap-5 my-[30px] justify-center">
        {projectsData.map((projectData) => (
          <ProjectCard key={projectData.placeId} projectData={projectData} />
        ))}
      </div>
    </section>
  );
}
