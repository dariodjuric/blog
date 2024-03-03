import Link from 'next/link';
import arrow from '@/public/arrow.svg';
import myPicture from '@/public/me.jpg';
import Image from 'next/image';
import { getCachedPosts } from '@/app/cached-posts';
import PostsList from '@/components/PostsList';

export default function Home() {
  const latestPosts = getCachedPosts().slice(0, 3);

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
            <Image
              priority
              src={arrow}
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
            <Link href="/about">explore more</Link> about my journey and
            expertise, or read through{' '}
            <Link href="/posts">my blog&apos;s archive</Link>.
          </p>
        </div>
        <div className="md:col-span-4 w-full h-full flex flex-col justify-center py-3 md:py-0">
          <div className="self-center rotate-3 border-2 border-white shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
            <Image
              src={myPicture}
              alt="My picture"
              quality={100}
              priority
              className="w-44"
              sizes="176w"
              placeholder="blur"
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
