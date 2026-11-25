import { About } from "./components/About";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { FlameGradientDivider } from "./components/FlameGradientDivider";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { ScrollToTop } from "./components/ScrollToTop";
import { Skills } from "./components/Skills";

function App() {
  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <FlameGradientDivider />
        <Skills />
        <FlameGradientDivider />
        <Projects />
        <FlameGradientDivider />
        <Experience />
        <FlameGradientDivider />
        <Education />
        <FlameGradientDivider />
        <Certifications />
        <FlameGradientDivider />
        <Contact />
      </main>
      <ScrollToTop />
    </>
  );
}

export default App;
