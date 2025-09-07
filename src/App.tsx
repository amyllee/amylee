import Navbar from "../src/components/Navbar/Navbar";
import Hero from "../src/components/Hero/Hero";
import AboutBox from "../src/components/AboutBox/AboutBox";
import "./App.css";
import Projects from "../src/components/Projects/Projects";
import DesignSection from "../src/components/DesignSection/DesignSection";
import Footer from "../src/components/Footer/Footer";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutBox />
      <Projects />
      <DesignSection />
      <Footer />
    </>
  )
}

export default App;