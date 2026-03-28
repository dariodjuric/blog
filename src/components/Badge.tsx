import { Link } from '@tanstack/react-router';

interface BadgeProps {
  href: string;
  children: string;
}

export function Badge({ children, href }: BadgeProps) {
  return (
    <Link
      to={href}
      className="no-underline"
      onClick={(e) => e.stopPropagation()}
    >
      <span className="inline-flex items-center text-[0.6875rem] font-medium bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-2 py-0.5 transition-colors">
        {children}
      </span>
    </Link>
  );
}
