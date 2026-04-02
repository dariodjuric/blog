import { AUTHOR_NAME, SITE_URL, SOCIAL_PROFILES } from '@/lib/constants';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Coffee } from 'lucide-react';

const aboutTitle = `About ${AUTHOR_NAME} — Software Engineer`;
const aboutDescription = `${AUTHOR_NAME} is a software engineer from Zagreb, Croatia with 15+ years of IT experience, specializing in JavaScript and TypeScript.`;

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: aboutTitle },
      { name: 'description', content: aboutDescription },
      { property: 'og:title', content: aboutTitle },
      { property: 'og:description', content: aboutDescription },
      { property: 'og:url', content: `${SITE_URL}/about` },
      { name: 'twitter:title', content: aboutTitle },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/about` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/about-me.webp`,
    jobTitle: 'Software Engineer',
    knowsAbout: ['JavaScript', 'TypeScript', 'DevOps', 'Software Development'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Zagreb',
      addressCountry: 'Croatia',
    },
    sameAs: SOCIAL_PROFILES,
  };

  return (
    <div className="py-16 md:py-20 max-w-[720px] mx-auto px-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="animate-fade-in-up">
        <h1 className="font-display text-2xl font-bold text-foreground">
          About Me
        </h1>

        <div className="mt-8 flex flex-col md:flex-row gap-8 items-start">
          <img
            src="/about-me.webp"
            alt="Dario Djuric"
            className="relative rounded-2xl w-52 object-cover"
          />

          <div className="space-y-4">
            <p>
              I&apos;m Dario Djuric, and I&apos;m a software engineer born and
              living in Zagreb, Croatia. I love to write, and this blog is a
              place where love to share all the things I learn.
            </p>
            <p>
              I have over 15 years of experience working in different areas of
              IT. After finishing college, I started to work as a network
              engineer, then shortly worked as an SAP consultant, after which I
              returned to my passion from my high school days, which is software
              development.
            </p>
            <p>
              Since then, I&apos;ve worked mostly in the service/consulting
              space in the enterprise, and I&apos;ve led teams, small and large.
              Currently, I work as a freelancer, specializing in JavaScript and
              TypeScript on both the frontend and the backend.
            </p>
            <p>
              Outside of work, most of my time is spent with my wife and our two
              boys, and every once in a while I manage to squeeze in a bit of
              time for my hobbies: sports, guitar playing, or being a home
              barista (a title that justifies me spending a lot on my coffee
              gear).
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center rounded-xl bg-card border border-border py-9 px-10 gap-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <Coffee className="w-[1.375rem] h-[1.375rem] text-primary" />
          </div>
          <h2 className="font-display text-[1.375rem] font-bold text-foreground">
            Want to chat?
          </h2>
          <p className="text-center text-[0.9375rem] leading-[1.6] text-muted-foreground max-w-[480px]">
            I&apos;m always happy to talk about tech, freelancing, or coffee.
            Got a project idea, a question, or just want to say hi? Don&apos;t
            hesitate to reach out.
          </p>
          <div className="flex gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-primary px-5 py-2 font-display text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Contact Me
            </Link>
            <Link
              to="/posts"
              className="rounded-full border border-border px-5 py-2 font-display text-sm font-semibold text-foreground hover:border-primary/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Read My Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
