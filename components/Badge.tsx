import Link from 'next/link';

interface BadgeProps {
  href: string;
  children: string;
}

export function Badge({ children, href }: BadgeProps) {
  return (
    <Link href={href} className="unstyled-link opacity-95 hover:opacity-100">
      <span className="inline-flex items-center mr-1 px-2 bg-hippie-blue text-half-colonial-white font-bold text-[0.7em] uppercase rounded-full">
        {children}
      </span>
    </Link>
  );
}
