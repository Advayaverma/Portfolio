interface Lightning95BadgeProps {
  label?: string;
  className?: string;
}

export function Lightning95Badge({
  label = "95",
  className = "",
}: Lightning95BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-orange-500/35 bg-gradient-to-r from-red-600/20 via-orange-500/15 to-yellow-400/15 px-3 py-1 text-xs font-semibold tracking-wider text-yellow-300 shadow-[0_0_16px_rgba(249,115,22,0.25)] ${className}`}
    >
      <svg
        width="12"
        height="14"
        viewBox="0 0 12 16"
        fill="none"
        aria-hidden="true"
        className="text-yellow-400"
      >
        <path
          d="M7.2 0.5L1 9.2H5.8L4.8 15.5L11 6.8H6.2L7.2 0.5Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-number italic tracking-widest">{label}</span>
    </span>
  );
}
