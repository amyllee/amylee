import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import AboutMe from "./components/AboutMe/AboutMe";
import Projects from "./components/Projects/Projects";
import DesignSection from "./components/DesignSection/DesignSection";
import Footer from "./components/Footer/Footer";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <DesignSection />
      <AboutMe />
      <Footer />
    </>
  )
}

export default App;