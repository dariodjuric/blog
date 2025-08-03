import { getCachedPosts } from '@/app/cached-posts';
import PostsList from '@/components/PostsList';
import { slugifyLowercase } from '@/utils/slugify';

export default async function TagsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getCachedPosts();

  const filteredPosts = posts.filter((post) =>
    post.frontMatter.tags
      .map((tag: string) => slugifyLowercase(tag))
      .includes(slug),
  );

  return (
    <>
      <h2>#{slug}</h2>
      <PostsList posts={filteredPosts} />
    </>
  );
}
