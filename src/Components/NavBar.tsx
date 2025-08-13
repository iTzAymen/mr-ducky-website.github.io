export function NavBar() {
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
