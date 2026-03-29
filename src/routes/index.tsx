import PostsList from '@/components/PostsList';
import { AUTHOR_NAME, SITE_URL, SOCIAL_PROFILES } from '@/lib/constants';
import { fetchPosts } from '@/lib/posts.api';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/')({
  loader: async () => {
    const posts = await fetchPosts();
    return { latestPosts: posts.slice(0, 3) };
  },
  head: () => ({
    links: [{ rel: 'canonical', href: SITE_URL }],
  }),
  component: HomePage,
});

function HomePage() {
  const { latestPosts } = Route.useLoaderData();

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_NAME,
    url: SITE_URL,
    jobTitle: 'Software Engineer',
    sameAs: SOCIAL_PROFILES,
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <section className="py-20 md:py-28 max-w-[720px] mx-auto px-5">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 animate-fade-in-left">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Hi, I&apos;m{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'var(--gradient-warm)' }}
              >
                Dario Djuric
              </span>
            </h1>

            <div className="max-w-md flex flex-col gap-4">
              <p>
                I'm a full-stack software engineer experienced in a variety of
                technologies, with a current focus mainly on
                JavaScript/TypeScript and related frameworks and tools.
              </p>

              <p>
                Welcome to my corner of the internet, where I write about
                technology, primarily focusing on software development and
                DevOps.
              </p>
            </div>

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

          <div
            className="shrink-0 animate-scale-in"
            style={{ animationDelay: '0.15s' }}
          >
            <img
              src="/me.jpg"
              alt="Dario Djuric"
              className="relative rounded-2xl w-44 h-44 md:w-52 md:h-52 object-cover shadow-lg shadow-black/10 ring-1 ring-white/10"
            />
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
