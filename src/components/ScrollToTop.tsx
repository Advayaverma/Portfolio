import { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi";
import { scrollToSection } from "../hooks/useActiveSection";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => scrollToSection("hero")}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-900/90 text-zinc-300 shadow-lg backdrop-blur-sm transition-all hover:border-cyan-400/50 hover:text-cyan-400"
      aria-label="Scroll to top"
    >
      <HiArrowUp size={20} />
    </button>
  );
}
