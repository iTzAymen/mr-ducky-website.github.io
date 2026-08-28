import { Projects } from "./Components/Projects";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { NavBar } from "./Components/NavBar";
import { Ticker } from "./Components/Ticker";
import { About } from "./Components/About";
import { Team } from "./Components/Team";
import { Contacts } from "./Components/Contacts";
import { Timeline } from "./Components/Timeline";
import { Media } from "./Components/Media";
import { Collaborations } from "./Components/Collaborations";
import { Faq } from "./Components/Faq";
import { StructuredData } from "./Components/StructuredData";

import projects from "./Data/projects.json";
import { useState, useEffect } from "react";
import {
  fetchProjectThumbnails,
  fetchProjectData,
  fetchProjectVotes,
  fetchGroupData,
} from "./dataFetch";
import { useTheme } from "./hooks/useTheme";
import { STUDIO } from "./config/studio";

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
      videos: project?.videos || [],

      playing: 0,
      noFetch: project?.noFetch || false,
      isNew: project?.isNew || false,
      featured: project?.featured || false,
      archived: project?.archived || false,
      badge: project?.badge,
      collab: project?.collab || false,
    })),
  );
  const [groupMembers, setGroupMembers] = useState<number>(
    STUDIO.robloxGroupMembersFallback,
  );
  const [statsLoading, setStatsLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();

  // fetch project data from Roblox API
  useEffect(() => {
    const pending: Promise<unknown>[] = [];

    for (const project of projectsData) {
      const universeId = project.universeId;
      if (project?.noFetch) {
        continue;
      }

      pending.push(
        fetchProjectThumbnails(universeId).then((thumbnails) => {
          setProjectsData((prev) =>
            prev.map((proj) =>
              proj.universeId === universeId
                ? {
                    ...proj,
                    thumbnails: thumbnails.length
                      ? thumbnails
                      : proj.thumbnails,
                  }
                : proj,
            ),
          );
        }),
      );

      pending.push(
        fetchProjectData(universeId).then((data) => {
          if (!data) return;
          setProjectsData((prev) =>
            prev.map((proj) =>
              proj.universeId === universeId ? { ...proj, ...data } : proj,
            ),
          );
        }),
      );

      pending.push(
        fetchProjectVotes(universeId).then((votes) => {
          if (!votes) return;
          setProjectsData((prev) =>
            prev.map((proj) =>
              proj.universeId === universeId ? { ...proj, ...votes } : proj,
            ),
          );
        }),
      );
    }

    pending.push(
      fetchGroupData(STUDIO.robloxGroupId).then((data) => {
        if (!data) return;
        setGroupMembers(data.memberCount);
      }),
    );

    Promise.allSettled(pending).then(() => setStatsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featured = projectsData.find((p) => p.featured);
  const gridGames = projectsData.filter((p) => !p.featured && !p.archived);
  const archiveGames = projectsData.filter((p) => p.archived);

  const gamesShipped = projectsData.length;

  const totalVisits = projectsData.reduce((acc, p) => acc + p.visits, 0);
  const totalFavourites = projectsData.reduce((acc, p) => acc + p.favorites, 0);
  const totalPlaying = projectsData.reduce((acc, p) => acc + p.playing, 0);

  const playHref = featured
    ? `https://www.roblox.com/games/${featured.placeId}`
    : "#games";

  return (
    <div className="relative overflow-x-clip bg-[var(--bg-page)]">
      <StructuredData projects={projectsData} />
      <NavBar playHref={playHref} theme={theme} toggleTheme={toggleTheme} />
      <Header
        totalPlaying={totalPlaying}
        playHref={playHref}
        gamesShipped={gamesShipped}
        statsLoading={statsLoading}
      />
      <Ticker
        totalVisits={totalVisits}
        groupMembers={groupMembers}
        totalFavourites={totalFavourites}
      />
      <About
        projectsData={projectsData}
        groupMembers={groupMembers}
        gamesShipped={gamesShipped}
        statsLoading={statsLoading}
      />
      <Projects featured={featured} games={gridGames} archive={archiveGames} />
      <Team gamesShipped={gamesShipped} />
      <Media />
      <Timeline />
      <Collaborations />
      <Faq />
      <Contacts groupMembers={groupMembers} />
      <Footer />
    </div>
  );
}

export default App;
