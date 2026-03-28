import { createFileRoute } from '@tanstack/react-router';
import { fetchPosts } from '@/lib/posts.api';
import PostsList from '@/components/PostsList';

export const Route = createFileRoute('/posts/')({
  loader: async () => {
    const posts = await fetchPosts();
    return { posts };
  },
  component: PostsPage,
});

function PostsPage() {
  const { posts } = Route.useLoaderData();

  return (
    <div className="py-16 md:py-20 max-w-[720px] mx-auto px-5 min-h-screen">
      <div className="animate-fade-in-up">
        <h1 className="font-display text-2xl font-bold text-foreground">
          All Posts
        </h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-xl">
          All blog posts published here. I&apos;ve also written for{' '}
          <a
            href="https://www.thisdot.co/blog?authors=dario+djuric"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            This Dot Labs
          </a>{' '}
          and{' '}
          <a
            href="https://dario-djuric.medium.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Medium
          </a>{' '}
          &mdash; you can find those posts there.
        </p>
      </div>
      <div className="mt-8">
        <PostsList posts={posts} columns={2} />
      </div>
    </div>
  );
}
