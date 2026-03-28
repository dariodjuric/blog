import { createFileRoute, Link } from '@tanstack/react-router';
import { notFound } from '@tanstack/react-router';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { fetchPostBySlug } from '@/lib/posts.api';
import { Badge } from '@/components/Badge';
import { slugifyLowercase } from '@/utils/slugify';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

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
    return {
      meta: [
        { title: post.frontMatter.title },
        { name: 'description', content: post.frontMatter.summary },
        { name: 'og:title', content: post.frontMatter.title },
        { name: 'og:description', content: post.frontMatter.summary },
        { name: 'twitter:title', content: post.frontMatter.title },
        { name: 'twitter:description', content: post.frontMatter.summary },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="py-16 md:py-20 max-w-[720px] mx-auto px-5 min-h-screen">
      <h1 className="font-display text-2xl font-bold text-foreground">
        Post not found
      </h1>
      <p className="mt-3">
        The blog post you are looking for does not exist.
      </p>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();

  return (
    <div className="py-16 md:py-20 max-w-[720px] mx-auto px-5 min-h-screen">
      <article className="animate-fade-in-up">
        <Link
          to="/posts"
          className="no-underline inline-flex items-center gap-1.5 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to posts
        </Link>

        {post.frontMatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
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

        <time className="block mt-3">
          {format(new Date(post.dateCreated), 'LLLL d, yyyy')}
        </time>

        <MarkdownRenderer content={post.content || ''} className="mt-10" />
      </article>
    </div>
  );
}
