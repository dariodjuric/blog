import Navigation from '@/components/Navigation';
import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between max-w-[720px] mx-auto px-5">
        <Link
          to="/"
          className="no-underline font-display text-xl font-bold text-foreground hover:text-primary transition-colors"
        >
          dario
          <span className="align-baseline text-[0.7em] text-foreground/60">
            &apos;
          </span>
          s.blog
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
