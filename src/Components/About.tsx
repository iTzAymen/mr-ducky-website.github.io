import { TiltCard } from "./TiltCard";

import devs from "../Data/devs.json";
import { fetchGroupData } from "../dataFetch";
import { useEffect, useState } from "react";

import { ReactComponent as DiscordIcon } from "../assets/discord.svg";
import { ReactComponent as YouTubeIcon } from "../assets/youtube.svg";
import { ReactComponent as TwitterIcon } from "../assets/twitter.svg";
import { abbreviateNumber } from "../utils";

import type { ProjectData } from "../Types";

const GROUP_ID = "8954519";

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-4"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
      clipRule="evenodd"
    />
  </svg>
);

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-4"
  >
    <path
      fillRule="evenodd"
      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
      clipRule="evenodd"
    />
  </svg>
);

const MembersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-4"
  >
    <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
  </svg>
);

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-4"
  >
    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
  </svg>
);

function DevCard({ userId }: { userId?: string }) {
  const data = devs.find((dev) => dev.userId === userId);
  return (
    <TiltCard
      rotateMax={4}
      scale={1.05}
      className="opacity-100 bg-white shadow-lg hover:shadow-2xl hover:z-20 transition-all duration-300 ease-out rounded-[20px] p-3 w-110 h-min flex flex-row gap-3 z-10"
    >
      <img
        src={data?.icon || ""}
        alt="Developer Avatar"
        className="rounded-lg h-full mx-auto aspect-square grow"
      />
      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-[1.2em] font-bold">{data?.name}</h3>
          <div className="flex gap-2">
            {data?.youtubeUsername && (
              <a
                className="hover:scale-110 transition-transform duration-300"
                href={`https://www.youtube.com/@${data.youtubeUsername}`}
                target="_blank"
              >
                <YouTubeIcon className="fill-[#FF0000]" />
              </a>
            )}
            {data?.twitterUsername && (
              <a
                className="hover:scale-110 transition-transform duration-300"
                href={`https://x.com/${data.twitterUsername}`}
                target="_blank"
              >
                <TwitterIcon className="fill-[#1DA1F2]" />
              </a>
            )}
            {data?.discordUserId && (
              <a
                className="hover:scale-110 transition-transform duration-300"
                href={`https://discord.com/users/${data.discordUserId}`}
                target="_blank"
              >
                <DiscordIcon className="fill-[#5C68EE]" />
              </a>
            )}
          </div>
        </div>
        <p className="text-[0.9em] text-gray-600 italic">{data?.role}</p>
        <p className="text-[0.9em] text-gray-600 mt-1 mb-1">
          {data?.description}
        </p>
        <a
          href={`https://www.roblox.com/users/${userId}/profile`}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-auto text-center bg-[#009dff] text-white font-bold px-[20px] py-[10px] rounded-full hover:bg-[#007acc] transition-all"
        >
          View Profile
        </a>
      </div>
    </TiltCard>
  );
}

function StatCard({
  title,
  value,
  live,
  icon,
}: {
  title: string;
  value: string;
  live?: boolean;
  icon?: React.JSX.Element;
}) {
  return (
    <TiltCard
      rotateMax={8}
      scale={1.05}
      className="flex flex-col group/card items-start mb-[20px] bg-white p-5 rounded-lg shadow-md min-w-2xs hover:shadow-lg transition-shadow duration-300 ease-in-out"
    >
      <h3 className="text-left text-[1em] flex gap-1 items-center">
        {icon}
        {title}
      </h3>
      <p className="text-left text-[2em] font-bold flex items-center gap-1.5">
        {value}{" "}
        {live && (
          <div className="bg-red-600 rounded-full h-1.5 w-1.5 group-hover/card:animate-ping mb-0.5" />
        )}
      </p>
    </TiltCard>
  );
}

export function About({ projectsData }: { projectsData: ProjectData[] }) {
  const [groupData, setGroupData] = useState({
    memberCount: 123000,
  });

  const totalVisits = projectsData.reduce(
    (acc, project) => acc + project.visits,
    0
  );
  const totalFavorites = projectsData.reduce(
    (acc, project) => acc + project.favorites,
    0
  );
  const totalPlaying = projectsData.reduce(
    (acc, project) => acc + project.playing,
    0
  );

  useEffect(() => {
    fetchGroupData(GROUP_ID).then((data) => {
      if (!data) return;
      setGroupData(data);
    });
  }, []);

  return (
    <section id="about" className="p-[20px]">
      <h2 className="text-[2em] text-[#009dff] text-center mt-[10px] mb-[20px] boldFont">
        About Us
      </h2>
      <p className="text-center max-w-[800px] m-auto text-[1.1em] mb-[20px]">
        We are <strong>Mr.Ducky Studio</strong>, a vibrant Roblox game
        development group dedicated to crafting unique, high-quality
        experiences. Founded with a passion for creativity and fun, we aim to
        create well-designed, engaging adventures that bring players together
        for unforgettable adventures.
      </p>
      <h3 className="text-[1.5em] text-gray-950 text-center mt-[10px] mb-[20px] font-bold">
        Our Stats
      </h3>
      <div className="flex flex-wrap justify-center gap-5 mb-[30px]">
        <StatCard
          title="Total Visits"
          value={abbreviateNumber(totalVisits, true)}
          icon={<HomeIcon />}
        />
        <StatCard
          title="Group Members"
          value={abbreviateNumber(groupData.memberCount, true)}
          icon={<MembersIcon />}
        />
        <StatCard
          title="Total Favorites"
          value={abbreviateNumber(totalFavorites, true)}
          icon={<StarIcon />}
        />
        <StatCard
          title="Total Active"
          value={abbreviateNumber(totalPlaying, true)}
          live={true}
          icon={<PlayIcon />}
        />
      </div>
      {/* <div className="text-center flex justify-center gap-4 defaultFont">
        <p>
          <strong>Group Members:</strong> {`${groupData.memberCount} Members`}
        </p>
        <p>
          <strong>Discord Members:</strong> 6K+ Members
        </p>
      </div> */}
      <h3 className="text-[1.5em] text-gray-950 text-center mt-[10px] mb-[20px] font-bold">
        The Team
      </h3>
      <div className="flex gap-5 flex-wrap justify-center my-[30px]">
        {devs.map((dev) => (
          <DevCard key={dev.userId} userId={dev.userId} />
        ))}
      </div>
    </section>
  );
}
