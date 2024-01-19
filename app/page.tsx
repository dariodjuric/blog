import Link from 'next/link';
import { Badge } from '@/components/Badge';
import arrow from '@/public/arrow.svg';
import Image from 'next/image';

export default function Home() {
  return (
    <>
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
            I&apos;m a software engineer with more than 15 years of experience
            in full-stack development using a variety of technologies, currently
            specialized in JavaScript/TypeScript, along with their associated
            frameworks and tools.
          </p>
          <p>
            Welcome to my corner of the Internet, where I write about
            technology, primarily focusing on software development and devops.
          </p>
          <p>
            If you&apos;re curious, feel free to{' '}
            <Link href="/about">explore more</Link> about my journey and
            expertise. As a freelancer, I&apos;m always open to collaborations
            and projects. Should you be interested in working together,
            don&apos;t hesitate to <Link href="/contact">get in touch</Link>!
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
        <ul className="mt-2">
          <li>
            <span className="opacity-80 text-xs">
              Thursday, October 26th, 2023
            </span>
            <br />
            <Link href="/blogs" className="font-bold text-2xl">
              Why doesn’t autofill work on my form?
            </Link>
            <br />
            <Badge href="/tags/html">HTML</Badge>{' '}
            <Badge href="/tags/forms">Forms</Badge>{' '}
            <Badge href="/tags/accessibility">Accessibility</Badge>
            <br />
            You&apos;ve implemented a beautiful login form, but the browser will
            not autofill username and password on it. What could be the reason?
          </li>
        </ul>
      </div>
    </>
  );
}
