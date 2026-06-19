import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { navLinks, profile } from "../data/portfolio";
import { scrollToSection, useActiveSection } from "../hooks/useActiveSection";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = navLinks.map((l) => l.id);
  const activeSection = useActiveSection(sectionIds);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="text-lg font-semibold text-zinc-100 transition-colors hover:text-cyan-400"
        >
          AV
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? "text-cyan-400"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href={profile.resumeFile}
          download
          className="hidden rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 md:inline-block"
        >
          Resume
        </a>

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
        <div className="border-t border-white/5 bg-zinc-950/95 px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? "bg-white/5 text-cyan-400"
                      : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeFile}
                download
                className="mt-2 block rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-3 py-2 text-center text-sm font-medium text-white"
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
