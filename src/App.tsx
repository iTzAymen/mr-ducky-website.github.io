import { ReactComponent as DiscordIcon } from "./assets/discord.svg";
import { ReactComponent as LinkIcon } from "./assets/arrow-top-right.svg";
import { useState, useEffect } from "react";
import duckyLogo from "./assets/ducky-masked.png";
import { TiltCard } from "./Components/TiltCard";
import projects from "./Data/projects.json";
import devs from "./Data/devs.json";
import contacts from "./Data/contacts.json";

function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shrinks from 1 → 0.7 scale over the first 300px of scroll
  const scale = Math.max(0.5, 1 - scrollY / 400);
  const transition = "0.35s ease";

  return (
    <div className="relative overflow-hidden w-full from-[#009dff] to-[#00c6ff] bg-gradient-to-r">
      <img
        src="https://img.freepik.com/premium-vector/hud-grid-pattern-background-04_758394-54.jpg?semt=ais_hybrid&w=740&q=80"
        alt="Background"
        className="absolute inset-0 z-0 w-full h-full object-cover opacity-20 mix-blend-multiply"
      />
      <div
        className="z-10"
        style={{
          paddingTop: `${40 * scale ** 2}px`,
          paddingBottom: `${40 * scale ** 2}px`,
          paddingLeft: "20px",
          paddingRight: "20px",
          transition: `padding ${transition}`,
        }}
      >
        <img
          src={duckyLogo}
          alt="ducky logo"
          style={{
            height: `${200 * scale}px`,
            marginTop: `${0 * scale ** 2}px`, // change 0 to your top margin value if needed
            marginBottom: `${15 * scale ** 2}px`,
            transition: `height ${transition}, margin ${transition}`,
          }}
          className="rounded-[7px] mx-auto"
        />
        <h1
          className="mx-auto w-full text-center text-white boldFont"
          style={{
            fontSize: `${48 * scale}px`,
            marginTop: `${15 * scale ** 2}px`,
            transition: `font-size ${transition}, margin-top ${transition}, margin-bottom ${transition}`,
          }}
        >
          Mr.Ducky Studio
        </h1>
        <p
          className="text-white w-full text-center opacity-90"
          style={{
            fontSize: `${19 * scale}px`,
            marginBottom: `${8 * scale ** 2}px`,
            transition: `font-size ${transition}, margin-top ${transition}, margin-bottom ${transition}`,
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

function About() {
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
      </TiltCard>
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
      <div className="text-center flex justify-center gap-4 defaultFont">
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

function Projects() {
  function ProjectCard({ placeId }: { placeId?: string }) {
    const project = projects.find((p) => p.placeId === placeId);

    return (
      <TiltCard
        rotateMax={2}
        scale={1.05}
        className="opacity-100 bg-white shadow-lg hover:shadow-2xl hover:z-20 rounded-[20px] p-3 w-[400px] h-[400px] flex flex-col transition-all duration-300 ease-out"
      >
        <a
          className="relative  rounded-lg w-full mx-auto aspect-video group"
          href={`https://www.roblox.com/games/${placeId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={project?.thumbnail || ""}
            alt="Project Thumbnail"
            className="rounded-lg group-hover:brightness-75 transition-all"
          />
          <LinkIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
               h-6 w-6 opacity-0 fill-white group-hover:opacity-100 transition-opacity"
          />
        </a>
        <h3 className="text-[1.2em] font-bold mt-2">{project?.name}</h3>
        <p className="text-[0.9em] text-gray-600 mt-1">
          {project?.description}
        </p>
        <p className="text-[0.9em] text-gray-600 mt-auto defaultFont">
          Created on: {project?.created}
        </p>
        <div className="flex justify-between mt-0.5 defaultFont">
          <span>Visits: {project?.visits}</span>
          <span>Favorites: {project?.favorites}</span>
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
