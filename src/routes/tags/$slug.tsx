import { AUTHOR_NAME } from '@/lib/constants';
import { createFileRoute } from '@tanstack/react-router';
import { fetchPostsByTag } from '@/lib/posts.api';
import PostsList from '@/components/PostsList';

export const Route = createFileRoute('/tags/$slug')({
  loader: async ({ params }) => {
    const posts = await fetchPostsByTag({ data: params.slug });
    return { posts, slug: params.slug };
  },
  head: ({ loaderData }) => {
    const slug = loaderData?.slug ?? '';
    const tagTitle = `Posts tagged "${slug}" — ${AUTHOR_NAME}`;
    return {
      meta: [
        { title: tagTitle },
        {
          name: 'description',
          content: `Blog posts by ${AUTHOR_NAME} tagged with "${slug}".`,
        },
        { property: 'og:title', content: tagTitle },
      ],
    };
  },
  component: TagsPage,
});

function TagsPage() {
  const { posts, slug } = Route.useLoaderData();

  return (
    <div className="py-16 md:py-20 max-w-[720px] mx-auto px-5">
      <div className="animate-fade-in-up">
        <h1 className="font-display text-2xl font-bold text-foreground">
          #{slug}
        </h1>
      </div>
      <div className="mt-8">
        <PostsList posts={posts} columns={2} />
      </div>
    </div>
  );
}
