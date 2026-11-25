import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { navLinks, profile } from "../data/portfolio";
import { scrollToSection, useActiveSection } from "../hooks/useActiveSection";
import ShinyText from "./reactbits/ShinyText";

interface NavbarProps {
  onSwitchTo3D?: () => void;
}

export function Navbar({ onSwitchTo3D }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = navLinks.map((l) => l.id);
  const activeSection = useActiveSection(sectionIds);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-orange-500/15 bg-[#111113]/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="font-racing text-lg font-bold tracking-wider transition-transform hover:scale-105"
          aria-label="Scroll to top"
        >
          <ShinyText
            text="AV"
            color="#f4f4f5"
            shineColor="#f97316"
            speed={2.5}
          />
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? "text-orange-400"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {onSwitchTo3D && (
            <button
              type="button"
              onClick={onSwitchTo3D}
              className="rounded-lg border border-orange-500/30 bg-white/5 px-3.5 py-2 text-sm font-medium text-orange-300 transition-colors hover:border-orange-400 hover:text-orange-200"
            >
              Back to 3D
            </button>
          )}
          <a
            href={profile.resumeFile}
            download
            className="rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-red-600/20 transition-opacity hover:opacity-90"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-zinc-300 transition-colors hover:bg-white/5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-orange-500/15 bg-[#111113]/95 px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? "bg-white/5 text-orange-400"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            {onSwitchTo3D && (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onSwitchTo3D();
                  }}
                  className="mt-2 block w-full rounded-lg border border-orange-500/30 bg-white/5 px-3 py-2 text-center text-sm font-medium text-orange-300"
                >
                  Back to 3D
                </button>
              </li>
            )}
            <li>
              <a
                href={profile.resumeFile}
                download
                className="mt-2 block rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-3 py-2 text-center text-sm font-medium text-white"
              >
                Download Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
