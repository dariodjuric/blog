import { getCachedPosts } from '@/app/cached-posts';
import PostsList from '@/components/PostsList';
import { slugifyLowercase } from '@/utils/slugify';

export default async function TagsPage({
  params,
}: {
  params: { slug: string };
}) {
  const posts = getCachedPosts();

  const filteredPosts = posts.filter((post) =>
    post.frontMatter.tags
      .map((tag: string) => slugifyLowercase(tag))
      .includes(params.slug),
  );

  return (
    <>
      <h2>#{params.slug}</h2>
      <PostsList posts={filteredPosts} />
    </>
  );
}
