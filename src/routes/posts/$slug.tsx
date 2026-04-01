import { Badge } from '@/components/Badge';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';
import { AUTHOR_NAME, SITE_URL } from '@/lib/constants';
import { fetchPostBySlug } from '@/lib/posts.api';
import { slugifyLowercase } from '@/utils/slugify';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = await fetchPostBySlug({ data: params.slug });
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {};
    }
    const { post } = loaderData;
    const postUrl = `${SITE_URL}/posts/${post.slug}`;
    return {
      meta: [
        { title: `${post.frontMatter.title} — ${AUTHOR_NAME}` },
        { name: 'description', content: post.frontMatter.summary },
        { property: 'og:title', content: post.frontMatter.title },
        { property: 'og:description', content: post.frontMatter.summary },
        { property: 'og:url', content: postUrl },
        { property: 'og:type', content: 'article' },
        {
          property: 'article:published_time',
          content: new Date(post.dateCreated).toISOString(),
        },
        {
          property: 'article:modified_time',
          content: new Date(post.dateUpdated).toISOString(),
        },
        { name: 'twitter:title', content: post.frontMatter.title },
        { name: 'twitter:description', content: post.frontMatter.summary },
      ],
      links: [{ rel: 'canonical', href: postUrl }],
    };
  },
  notFoundComponent: () => (
    <div className="py-16 md:py-20 max-w-[720px] mx-auto px-5">
      <h1 className="font-display text-2xl font-bold text-foreground">
        Post not found
      </h1>
      <p className="mt-3">The blog post you are looking for does not exist.</p>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();

  const postUrl = `${SITE_URL}/posts/${post.slug}`;
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontMatter.title,
    description: post.frontMatter.summary,
    url: postUrl,
    datePublished: new Date(post.dateCreated).toISOString(),
    dateModified: new Date(post.dateUpdated).toISOString(),
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  return (
    <div className="py-16 md:py-20 max-w-[720px] mx-auto px-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <article className="animate-fade-in-up">
        <Link
          to="/posts"
          className="no-underline inline-flex items-center gap-1.5 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to posts
        </Link>

        {post.frontMatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.frontMatter.tags.map((tagName: string) => (
              <Badge key={tagName} href={`/tags/${slugifyLowercase(tagName)}`}>
                {tagName}
              </Badge>
            ))}
          </div>
        )}

        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
          {post.frontMatter.title}
        </h1>

        <time className="block mt-2 text-xs">
          {format(new Date(post.dateCreated), 'LLLL d, yyyy')}
        </time>

        <MarkdownRenderer content={post.content || ''} className="mt-8" />
      </article>
    </div>
  );
}
