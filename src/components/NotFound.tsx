import { Link } from '@tanstack/react-router';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-5 py-20 md:py-28">
      <div className="flex items-center gap-1 rounded-lg border border-border bg-[hsl(245_27%_9%)] px-5 py-2.5">
        <span className="font-mono text-base font-bold text-primary">$</span>
        <span className="font-mono text-base text-muted-foreground">
          page --not-found
        </span>
        <span className="h-5 w-2.5 bg-primary/40 animate-pulse" />
      </div>

      <p className="max-w-120 text-center text-base text-muted-foreground leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        <br />
        Maybe you mistyped the URL, or maybe I moved things around.
      </p>

      <div className="flex gap-3">
        <Link
          to="/"
          className="no-underline inline-flex items-center rounded-full font-display text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 transition-colors"
        >
          Go Home
        </Link>
        <Link
          to="/posts"
          className="no-underline inline-flex items-center rounded-full font-display text-sm font-semibold border border-border text-foreground hover:border-primary/50 px-5 py-2 transition-colors"
        >
          Read Blog
        </Link>
      </div>
    </div>
  );
}
