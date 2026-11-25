import { lazy, Suspense, useState } from "react";
import { About } from "./components/About";
import { Certifications } from "./components/Certifications";
import { CheckeredFooter } from "./components/CheckeredFooter";
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

const CarsWorld3D = lazy(() => import("./components/world3d/CarsWorld3D"));

function App() {
  const [viewMode, setViewMode] = useState<"3d" | "classic">(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "classic"
      : "3d"
  );

  if (viewMode === "3d") {
    return (
      <Suspense
        fallback={
          <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 bg-[#111113] text-zinc-300">
            <span className="font-racing text-sm uppercase tracking-widest text-orange-400">
              Starting Engines...
            </span>
            <button
              type="button"
              onClick={() => setViewMode("classic")}
              className="text-xs text-zinc-500 underline hover:text-zinc-300"
            >
              Switch to Classic view
            </button>
          </div>
        }
      >
        <CarsWorld3D onSwitchToClassic={() => setViewMode("classic")} />
      </Suspense>
    );
  }

  return (
    <>
      <ScrollProgressBar />
      <Navbar onSwitchTo3D={() => setViewMode("3d")} />
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
      <CheckeredFooter />
      <ScrollToTop />
    </>
  );
}

export default App;
