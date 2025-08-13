import { ReactComponent as DiscordIcon } from "../assets/discord.svg";

import contacts from "../Data/contacts.json";

export function Contacts() {
  return (
    <section id="contacts" className="p-[20px]">
      <h2 className="text-[2em] text-[#009dff] text-center mt-[10px] mb-[20px] boldFont z-10">
        Contact Us
      </h2>
      <p className="text-center max-w-[800px] m-auto text-[1.1em] mb-[20px]">
        For inquiries, collaborations, or feedback, feel free to reach out to us
        via our Discord server or Roblox group.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href={contacts.Discord}
          className="bg-[#5C68EE] text-white font-bold px-[20px] py-[10px] rounded-full hover:bg-[#4653df] transition-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DiscordIcon className="inline-block h-5 w-5 mr-3 fill-white" />
          Join Discord
        </a>
        <a
          href={contacts.RobloxGroup}
          className="bg-[#181818] text-white font-bold px-[20px] py-[10px] rounded-full hover:bg-[#333333] transition-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Roblox_Logo.svg/64px-Roblox_Logo.svg.png?20220929193725"
            alt="Roblox Logo"
            className="inline-block h-5 w-5 mr-3"
          />
          Roblox Group
        </a>
      </div>
    </section>
  );
}
