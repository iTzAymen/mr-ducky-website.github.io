import { Projects } from "./Components/Projects";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { NavBar } from "./Components/NavBar";
import { About } from "./Components/About";
import { Contacts } from "./Components/Contacts";

import projects from "./Data/projects.json";
import { useState, useEffect } from "react";
import { fetchProjectThumbnails, fetchProjectData } from "./dataFetch";

import type { ProjectData } from "./Types";

function App() {
  const [projectsData, setProjectsData] = useState<ProjectData[]>(
    projects.map((project) => ({
      universeId: project.universeId,
      placeId: project?.placeId || "",
      name: project?.name || "",
      description: project?.description || "",
      created: project?.created || "N/A",
      visits: project?.visits || 0,
      favorites: project?.favorites || 0,
      thumbnails: project?.thumbnails || [],

      playing: 0,
      noFetch: project?.noFetch || false,
    }))
  );

  // fetch project data from Roblox API
  useEffect(() => {
    for (const project of projectsData) {
      const universeId = project.universeId;
      console.log("Fetching data for project:", universeId);
      if (project?.noFetch) {
        return;
      }

      fetchProjectThumbnails(universeId).then((thumbnails) => {
        setProjectsData((prev) =>
          prev.map((proj) =>
            proj.universeId === universeId
              ? { ...proj, thumbnails: thumbnails || proj.thumbnails }
              : proj
          )
        );
      });

      fetchProjectData(universeId).then((data) => {
        if (!data) return;
        setProjectsData((prev) =>
          prev.map((proj) =>
            proj.universeId === universeId ? { ...proj, ...data } : proj
          )
        );
      });
    }
  }, []);

  return (
    <div className="bg-[#f0f9ff]">
      <Header />
      <NavBar />
      <About projectsData={projectsData} />
      <Projects projectsData={projectsData} />
      <Contacts />
      <Footer />
    </div>
  );
}

export default App;
