import { ReactComponent as DiscordIcon } from "./assets/discord.svg";
import { useState, useEffect } from "react";

function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shrinks from 1 → 0.7 scale over the first 300px of scroll
  const scale = Math.max(0.5, 1 - scrollY / 300);

  return (
    <div className="relative overflow-hidden w-full from-[#009dff] to-[#00c6ff] bg-gradient-to-r">
      <img
        src="https://img.freepik.com/premium-vector/hud-grid-pattern-background-04_758394-54.jpg?semt=ais_hybrid&w=740&q=80"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply"
      />
      <div
        style={{
          paddingTop: `${40 * scale}px`,
          paddingBottom: `${40 * scale}px`,
          paddingLeft: "20px",
          paddingRight: "20px",
          transition: "padding 0.3s ease-out",
        }}
      >
        <img
          src="/ducky-masked.png"
          alt="ducky logo"
          style={{
            height: `${200 * scale}px`,
            marginTop: `${0 * scale}px`, // change 0 to your top margin value if needed
            marginBottom: `${15 * scale}px`,
            transition: "height 0.3s ease-out, margin 0.3s ease-out",
          }}
          className="rounded-[7px] mx-auto"
        />
        <h1
          className="mx-auto w-full text-center text-white boldFont"
          style={{
            fontSize: `${48 * scale}px`,
            marginTop: `${15 * scale}px`,
            marginBottom: `${10 * scale}px`,
            transition:
              "font-size 0.3s ease-out, margin-top 0.3s ease-out, margin-bottom 0.2s ease-out",
          }}
        >
          Mr.Ducky Studio
        </h1>
        <p
          className="text-white w-full text-center opacity-90"
          style={{
            fontSize: `${19 * scale}px`,
            marginTop: `${16 * scale}px`,
            marginBottom: `${16 * scale}px`,
            transition:
              "font-size 0.3s ease-out, margin-top 0.3s ease-out, margin-bottom 0.3s ease-out",
          }}
        >
          Fun, Creative, and Playful Roblox Game Development!
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="p-[20px] bg-[#009dff] z-10">
      <p className="text-white font-sans text-center py-[1em]">
        &copy; 2025 Mr.Ducky Studio |&nbsp;
        <a
          href="https://discord.gg/mrduckystudio"
          className="underline font-sans"
        >
          Join our Discord
        </a>
      </p>
    </footer>
  );
}

function NavBar() {
  function NavButton({ text, href }: { text: string; href: string }) {
    return (
      <a
        href={href}
        className="bg-[#009dff] text-white font-bold px-[20px] py-[10px] rounded-full hover:bg-[#007acc] hover:scale-105 transition-all cursor-pointer"
      >
        {text}
      </a>
    );
  }

  return (
    <nav className="bg-[#ffff0d] w-full p-[10px] gap-2 flex justify-center items-center sticky top-0 z-50">
      <NavButton text="About Us" href="#about" />
      <NavButton text="Projects" href="#projects" />
      <NavButton text="Contact" href="#contacts" />
    </nav>
  );
}

const devs = [
  {
    userId: "2201885103",
    name: "Aymen",
    role: "Lead Developer",
    description: "Passionate about creating immersive gaming experiences.",
    icon: "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-3154A853AF695F78DC7F50E57C251FF5-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    userId: "65661447",
    name: "Mohomesad",
    role: "Builder",
    description: "Passionate about creating immersive gaming experiences.",
    icon: "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-1926B0642975228737422F92580A5207-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
];

function About() {
  function DevCard({ userId }: { userId?: string }) {
    const data = devs.find((dev) => dev.userId === userId);

    return (
      <div className="bg-white shadow rounded-[20px] p-3 w-100 h-min flex flex-row gap-3 z-10">
        <img
          src={data?.icon || ""}
          alt="Developer Avatar"
          className="rounded-lg h-full mx-auto aspect-square"
        />
        <div className="flex flex-col justify-between">
          <h3 className="text-[1.2em] font-bold">{data?.name}</h3>
          <p className="text-[0.9em] text-gray-600 italic">{data?.role}</p>
          <p className="text-[0.9em] text-gray-600 mt-1">{data?.description}</p>
          <a
            href={`https://www.roblox.com/users/${userId}/profile`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-auto text-center bg-[#009dff] text-white font-bold px-[20px] py-[10px] rounded-full hover:bg-[#007acc] transition-all"
          >
            View Profile
          </a>
        </div>
      </div>
    );
  }

  return (
    <section id="about" className="p-[20px]">
      <h2 className="text-[2em] text-[#009dff] text-center mt-[10px] mb-[20px] boldFont">
        About Us
      </h2>
      <p className="text-center max-w-[800px] m-auto text-[1.1em] mb-[20px]">
        We are <strong>Mr.Ducky Studio</strong>, a vibrant Roblox game
        development group creating unique and exciting experiences. Founded with
        a passion for creativity and fun, we aim to bring players together for
        unforgettable adventures.
      </p>
      <div className="text-center flex justify-center gap-4">
        <p>
          <strong>Group Members:</strong> 123K+ Members
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

const projects = [
  {
    placeId: "7554194743",
    name: "The Squid Game",
    description:
      'This is a fan-made game based on the show "Squid Game" on Netflix where players compete against others to win cash prizes!',
    created: "9/24/2021",
    visits: "67.0M+",
    favorites: "1.4M+",
    thumbnail:
      "https://tr.rbxcdn.com/180DAY-90c8c813d4b1e9a854c9299623760555/768/432/Image/Webp/noFilter",
  },
  {
    placeId: "18904374254",
    name: "Chained Up",
    description: "This game is inspired by the popular game Chained Together.",
    created: "8/11/2024",
    visits: "10.7M+",
    favorites: "343K+",
    thumbnail:
      "https://tr.rbxcdn.com/180DAY-00d1343e7515925c1b5dc75c2d5dc5a0/768/432/Image/Webp/noFilter",
  },
  {
    placeId: "8864942434",
    name: "Wordly",
    description:
      "Welcome to WORDLY where you have to guess a 5 letters word in 6 attempts. (Inspired by WORDLE)",
    created: "2/19/2022",
    visits: "5.5M+",
    favorites: "15K+",
    thumbnail:
      "https://tr.rbxcdn.com/180DAY-bcb19c48bfb1c7c15dcbdd5aa86c49b5/768/432/Image/Webp/noFilter",
  },
  {
    placeId: "6176293341",
    name: "Escape The Loop Obby 🕛",
    description:
      "Welcome to Super Adventure Obby! Where you play as a pirate who's looking for treasure.",
    created: "1/2/2021",
    visits: "10.3K+",
    favorites: "244",
    thumbnail:
      "https://tr.rbxcdn.com/180DAY-728610373f81cbad6ac0eba32c710c5c/768/432/Image/Webp/noFilter",
  },
  {
    placeId: "11168789256",
    name: "Fall Block",
    description:
      "Welcome to Fall Block A PVP Experience where you fight against other players by digging blocks below them or try and survive till the end!",
    created: "10/5/2022",
    visits: "3.5K+",
    favorites: "31",
    thumbnail:
      "https://tr.rbxcdn.com/180DAY-5f596acb73321692a29f1953507d8f1d/768/432/Image/Webp/noFilter",
  },
];
function Projects() {
  function ProjectCard({ placeId }: { placeId?: string }) {
    const project = projects.find((p) => p.placeId === placeId);

    return (
      <div className="bg-white shadow rounded-[20px] p-3 w-[400px] h-[400px] flex flex-col z-10">
        <a
          className="rounded-lg w-full mx-auto aspect-video group"
          href={`https://www.roblox.com/games/${placeId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={project?.thumbnail || ""}
            alt="Project Thumbnail"
            className="rounded-lg group-hover:brightness-75 transition-all"
          />
        </a>
        <h3 className="text-[1.2em] font-bold mt-2">{project?.name}</h3>
        <p className="text-[0.9em] text-gray-600 mt-1">
          {project?.description}
        </p>
        <p className="text-[0.9em] text-gray-600 mt-auto">
          Created on: {project?.created}
        </p>
        <div className="flex justify-between mt-0.5">
          <span>Visits: {project?.visits}</span>
          <span>Favorites: {project?.favorites}</span>
        </div>
      </div>
    );
  }

  return (
    <section id="projects" className="p-[20px]">
      <h2 className="text-[2em] text-[#009dff] text-center mt-[10px] mb-[20px] boldFont">
        Our Projects
      </h2>
      <div className="flex flex-wrap gap-5 my-[30px] justify-center">
        {projects.map((project) => (
          <ProjectCard key={project.placeId} placeId={project.placeId} />
        ))}
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section id="contacts" className="p-[20px]">
      <h2 className="text-[2em] text-[#009dff] text-center mt-[10px] mb-[20px] boldFont z-10">
        Contact Us
      </h2>
      <p className="text-center max-w-[800px] m-auto text-[1.1em] mb-[20px]">
        For inquiries, collaborations, or feedback, feel free to reach out to us
        via our Discord server or Roblox group.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="https://discord.gg/mrduckystudio"
          className="bg-[#5C68EE] text-white font-bold px-[20px] py-[10px] rounded-full hover:bg-[#4653df] transition-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DiscordIcon className="inline-block h-5 w-5 mr-3 fill-white" />
          Join Discord
        </a>
        <a
          href="https://www.roblox.com/groups/123456789/Mr-Ducky-Studio"
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

function App() {
  return (
    <div className="bg-[#f0f9ff]">
      <Header />
      <NavBar />
      <About />
      <Projects />
      <Contacts />
      <Footer />
    </div>
  );
}

export default App;
