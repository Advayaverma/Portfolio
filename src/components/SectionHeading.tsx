interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-10 text-center md:mb-12">
      <h2 className="font-racing text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-zinc-400 md:text-lg">{subtitle}</p>
      )}
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400" />
    </div>
  );
}
