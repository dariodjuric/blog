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
    <>
      <h2>All blog posts</h2>
      <p className="mb-4">
        Below is a list of all the blog posts I have published on this site so
        far. I have also written many more articles for the{' '}
        <a href="https://www.thisdot.co/blog?authors=dario+djuric">
          This Dot Labs blog
        </a>
        , along with a few posts on{' '}
        <a href="https://dario-djuric.medium.com/">Medium</a>. Through my work
        with This Dot Labs, I have contributed to the{' '}
        <a href="https://cloudinary.com/blog/">Cloudinary blog</a> as well.
      </p>
      <PostsList posts={posts} />
    </>
  );
}
