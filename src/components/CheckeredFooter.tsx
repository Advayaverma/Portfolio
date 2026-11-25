import { profile } from "../data/portfolio";
import { Lightning95Badge } from "./Lightning95Badge";

export function CheckeredFooter() {
  return (
    <footer className="border-t border-orange-500/15 bg-[#0c0c0e]">
      <div className="checkered-strip h-2 w-full opacity-35" aria-hidden="true" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-zinc-500 sm:flex-row md:px-6">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <Lightning95Badge label="95 · PIT LANE" />
      </div>
    </footer>
  );
}
