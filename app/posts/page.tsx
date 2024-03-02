import { getCachedPosts } from '@/app/cached-posts';
import PostsList from '@/components/PostsList';

export default async function PostsPage() {
  const posts = getCachedPosts();

  return (
    <>
      <h2>All blog posts</h2>
      <PostsList posts={posts} />
    </>
  );
}
