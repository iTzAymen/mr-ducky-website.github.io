import { TiltCard } from "./TiltCard";

import devs from "../Data/devs.json";
import { fetchGroupData } from "../dataFetch";
import { useEffect, useState } from "react";

import { ReactComponent as DiscordIcon } from "../assets/discord.svg";
import { ReactComponent as YouTubeIcon } from "../assets/youtube.svg";
import { ReactComponent as TwitterIcon } from "../assets/twitter.svg";

const GROUP_ID = "8954519";

export function About() {
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

  const [groupData, setGroupData] = useState({
    memberCount: "123K+",
  });

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

      <div className="text-center flex justify-center gap-4 defaultFont">
        <p>
          <strong>Group Members:</strong> {`${groupData.memberCount} Members`}
        </p>
        <p>
          <strong>Discord Members:</strong> 6K+ Members
        </p>
      </div>
      <div className="flex gap-5 flex-wrap justify-center my-[30px]">
        {devs.map((dev) => (
          <DevCard key={dev.userId} userId={dev.userId} />
        ))}
      </div>
    </section>
  );
}
