import Link from 'next/link';
import { Badge } from '@/components/Badge';
import arrow from '@/public/arrow.svg';
import Image from 'next/image';
import { format } from 'date-fns';
import slugify from 'slugify';
import { getCachedPosts } from '@/app/cached-posts';

export default function Home() {
  const latestPosts = getCachedPosts().slice(0, 3);

  return (
    <div className=" flex flex-col space-y-6">
      <div className="lg:grid lg:grid-cols-10">
        <div className="lg:col-span-6">
          <div className="flex flex-row justify-between">
            <h2 className="font-bold text-4xl">
              Hi, I&apos;m{' '}
              <span className="underline underline-offset-[4px] decoration-hippie-blue">
                Dario
              </span>
            </h2>
            <Image
              priority
              src={arrow}
              alt="Pointer to me"
              className="hidden lg:block"
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
            <Link href="/contact">my blog&apos;s archive</Link>.
          </p>
        </div>
        <div className="lg:col-span-4 w-full h-full flex flex-col justify-center py-3 lg:py-0">
          <div className="h-[220px] w-[200px] self-center rotate-3 border-2 border-white shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]"></div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-4xl">
          My latest&nbsp;
          <span className="underline underline-offset-[4px] decoration-hippie-blue">
            blog posts
          </span>
        </h2>
        <ul className="mt-3 space-y-3">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <span className="opacity-50 text-xs">
                {format(post.dateCreated, 'LLLL d, yyyy')}
              </span>
              <br />
              <Link href={`/posts/${post.slug}`} className="font-bold text-2xl">
                {post.frontMatter.title}
              </Link>
              <br />
              {post.frontMatter.tags.map((tagName: string) => (
                <Badge
                  key={tagName}
                  href={`/tags/${slugify(tagName).toLowerCase()}`}
                >
                  {tagName}
                </Badge>
              ))}
              <br />
              {post.frontMatter.summary}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
