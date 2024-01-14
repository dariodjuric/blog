import { getCachedPosts } from '@/app/cached-posts';
import Heading from '@/components/Heading';
import PostsList from '@/components/PostsList';

export default async function PostsPage() {
  const posts = getCachedPosts();

  return (
    <>
      <Heading>All blog posts</Heading>
      <PostsList posts={posts} />
    </>
  );
}
