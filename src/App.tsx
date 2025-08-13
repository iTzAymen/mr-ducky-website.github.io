import { Projects } from "./Components/Projects";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { NavBar } from "./Components/NavBar";
import { About } from "./Components/About";
import { Contacts } from "./Components/Contacts";

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
