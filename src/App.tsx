import { Projects } from "./Components/Projects";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { NavBar } from "./Components/NavBar";
import { Ticker } from "./Components/Ticker";
import { About } from "./Components/About";
import { Team } from "./Components/Team";
import { Contacts } from "./Components/Contacts";

import projects from "./Data/projects.json";
import { useState, useEffect } from "react";
import {
  fetchProjectThumbnails,
  fetchProjectData,
  fetchGroupData,
} from "./dataFetch";

import type { ProjectData } from "./Types";

const GROUP_ID = "8954519";
const GROUP_MEMBERS_FALLBACK = 656_900;

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
      isNew: project?.isNew || false,
      featured: project?.featured || false,
      archived: project?.archived || false,
      badge: project?.badge,
      collab: project?.collab || false,
    })),
  );
  const [groupMembers, setGroupMembers] = useState(GROUP_MEMBERS_FALLBACK);

  // fetch project data from Roblox API
  useEffect(() => {
    for (const project of projectsData) {
      const universeId = project.universeId;
      if (project?.noFetch) {
        continue;
      }

      fetchProjectThumbnails(universeId).then((thumbnails) => {
        setProjectsData((prev) =>
          prev.map((proj) =>
            proj.universeId === universeId
              ? { ...proj, thumbnails: thumbnails || proj.thumbnails }
              : proj,
          ),
        );
      });

      fetchProjectData(universeId).then((data) => {
        if (!data) return;
        setProjectsData((prev) =>
          prev.map((proj) =>
            proj.universeId === universeId ? { ...proj, ...data } : proj,
          ),
        );
      });
    }

    fetchGroupData(GROUP_ID).then((data) => {
      if (!data) return;
      setGroupMembers(data.memberCount);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featured = projectsData.find((p) => p.featured);
  const gridGames = projectsData.filter((p) => !p.featured && !p.archived);
  const archiveGames = projectsData.filter((p) => p.archived);

  const totalVisits = projectsData.reduce((acc, p) => acc + p.visits, 0);
  const totalFavourites = projectsData.reduce(
    (acc, p) => acc + p.favorites,
    0,
  );
  const totalPlaying = projectsData.reduce((acc, p) => acc + p.playing, 0);

  const playHref = featured
    ? `https://www.roblox.com/games/${featured.placeId}`
    : "#games";

  return (
    <div className="relative overflow-x-clip bg-[#EAF6FF]">
      <NavBar playHref={playHref} />
      <Header totalPlaying={totalPlaying} playHref={playHref} />
      <Ticker
        totalVisits={totalVisits}
        groupMembers={groupMembers}
        totalFavourites={totalFavourites}
      />
      <About projectsData={projectsData} groupMembers={groupMembers} />
      <Projects featured={featured} games={gridGames} archive={archiveGames} />
      <Team />
      <Contacts groupMembers={groupMembers} />
      <Footer />
    </div>
  );
}

export default App;
