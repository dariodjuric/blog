import { createFileRoute, Link } from '@tanstack/react-router';
import { fetchPosts } from '@/lib/posts.api';
import PostsList from '@/components/PostsList';

export const Route = createFileRoute('/')({
  loader: async () => {
    const posts = await fetchPosts();
    return { latestPosts: posts.slice(0, 3) };
  },
  component: HomePage,
});

function HomePage() {
  const { latestPosts } = Route.useLoaderData();

  return (
    <div className="flex flex-col space-y-6">
      <div className="md:grid md:grid-cols-10">
        <div className="md:col-span-6">
          <div className="flex flex-row justify-between">
            <h2 className="font-bold text-4xl">
              Hi, I&apos;m{' '}
              <span className="underline underline-offset-[4px] decoration-neutral-content">
                Dario
              </span>
            </h2>
            <img
              src="/arrow.svg"
              alt="Pointer to me"
              className="hidden md:block"
            />
          </div>
          <p>
            I&apos;m a full-stack software engineer experienced in a variety of
            technologies, with a current focus mainly on JavaScript/TypeScript
            and related frameworks and tools.
          </p>
          <p>
            Welcome to my corner of the internet, where I write about
            technology, primarily focusing on software development and DevOps.
          </p>
          <p>
            If you&apos;re curious, feel free to{' '}
            <Link to="/about">explore more</Link> about my journey and
            expertise, or read through{' '}
            <Link to="/posts">my blog&apos;s archive</Link>.
          </p>
        </div>
        <div className="md:col-span-4 w-full flex flex-col justify-center py-3 md:py-0">
          <div className="self-center rotate-3 border-2 border-white shadow-picture">
            <img
              src="/me.jpg"
              alt="My picture"
              className="w-44"
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-4xl">
          My latest&nbsp;
          <span className="underline underline-offset-[4px] decoration-neutral-content">
            blog posts
          </span>
        </h2>
        <PostsList posts={latestPosts} />
      </div>
    </div>
  );
}
