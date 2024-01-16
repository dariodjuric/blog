interface BadgeProps {
  children: string;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center px-2 bg-hippie-blue text-half-colonial-white font-bold text-[0.7em] uppercase rounded-full">
      {children}
    </span>
  );
}
