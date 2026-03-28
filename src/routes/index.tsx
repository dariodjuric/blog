import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { fetchPosts } from '@/lib/posts.api';
import PostsList from '@/components/PostsList';

export const Route = createFileRoute('/')({
  loader: async () => {
    const posts = await fetchPosts();
    return { latestPosts: posts.slice(0, 3) };
  },
  component: HomePage,
});

function HomePage() {
  const { latestPosts } = Route.useLoaderData();

  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-28 max-w-[720px] mx-auto px-5">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 animate-fade-in-left">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Hi, I&apos;m{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'var(--gradient-warm)' }}
              >
                Dario
              </span>
            </h1>

            <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-md">
              Full-stack software engineer with a focus on
              JavaScript/TypeScript. Welcome to my corner of the internet,
              where I write about software development and DevOps.
            </p>

            <div className="mt-7 flex gap-3">
              <Link
                to="/about"
                className="no-underline inline-flex items-center rounded-full font-display text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 transition-colors"
              >
                About Me
              </Link>
              <Link
                to="/posts"
                className="no-underline inline-flex items-center rounded-full font-display text-sm font-semibold border border-border text-foreground hover:bg-muted hover:border-primary/40 px-5 py-2 transition-colors"
              >
                Read Blog
              </Link>
            </div>
          </div>

          <div className="shrink-0 animate-scale-in" style={{ animationDelay: '0.15s' }}>
            <div className="relative rotate-3">
              <div
                className="absolute -inset-1 rounded-2xl opacity-20"
                style={{ background: 'var(--gradient-warm)' }}
              />
              <img
                src="/me.jpg"
                alt="Dario Djuric"
                className="relative rounded-2xl w-44 h-44 md:w-52 md:h-52 object-cover shadow-lg shadow-black/10 ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 max-w-[720px] mx-auto px-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-foreground">
            Latest Posts
          </h2>
          <Link
            to="/posts"
            className="no-underline flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <PostsList posts={latestPosts} columns={3} />
      </section>
    </div>
  );
}
