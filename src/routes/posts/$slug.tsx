import { createFileRoute } from '@tanstack/react-router';
import { notFound } from '@tanstack/react-router';
import { format } from 'date-fns';
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
    <div>
      <h2>Post not found</h2>
      <p>The blog post you are looking for does not exist.</p>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();

  return (
    <article>
      <span className="opacity-60 text-xs">
        {format(new Date(post.dateCreated), 'LLLL d, yyyy')}
      </span>
      <h2>{post.frontMatter.title}</h2>
      <MarkdownRenderer content={post.content || ''} className="mt-5" />
      {post.frontMatter.tags.length > 0 && (
        <div className="mt-5">
          {post.frontMatter.tags.map((tagName: string) => (
            <Badge key={tagName} href={`/tags/${slugifyLowercase(tagName)}`}>
              {tagName}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
