import Navbar from "../src/components/Navbar/Navbar";
import Hero from "../src/components/Hero/Hero";
import AboutBox from "../src/components/AboutBox/AboutBox";
import "./App.css";
// import Projects from "../src/components/Projects/Projects";
// import DesignSection from "../src/components/DesignSection/DesignSection";
// import Footer from "../src/components/Footer/Footer";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutBox />
      <div className="work-in-progress">
        <h2>🚧 Work in progress 🚧</h2>
        <p>More updates and projects to be added!</p>
      </div>
    </>
  )
}

export default App;