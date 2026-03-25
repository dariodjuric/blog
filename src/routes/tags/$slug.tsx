import { createFileRoute } from '@tanstack/react-router';
import { fetchPostsByTag } from '@/lib/posts.api';
import PostsList from '@/components/PostsList';

export const Route = createFileRoute('/tags/$slug')({
  loader: async ({ params }) => {
    const posts = await fetchPostsByTag({ data: params.slug });
    return { posts, slug: params.slug };
  },
  component: TagsPage,
});

function TagsPage() {
  const { posts, slug } = Route.useLoaderData();

  return (
    <>
      <h2>#{slug}</h2>
      <PostsList posts={posts} />
    </>
  );
}
