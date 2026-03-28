import { Link } from '@tanstack/react-router';

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  slug: string;
  index: number;
}

export default function BlogCard({
  title,
  date,
  excerpt,
  tags,
  slug,
  index,
}: BlogCardProps) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <Link
        to={`/posts/${slug}`}
        className="group block no-underline rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] hover:border-primary/40 transition-all duration-300"
      >
        <time className="text-xs">{date}</time>
        <h3 className="mt-2 font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-[0.6875rem] font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-3">{excerpt}</p>
      </Link>
    </div>
  );
}
