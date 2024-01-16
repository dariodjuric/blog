import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Badge } from '@/components/Badge';
import githubIcon from '@/public/icons/github.svg';
import linkedinIcon from '@/public/icons/linkedin.svg';
import xIcon from '@/public/icons/x.svg';
import arrow from '@/public/arrow.svg';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-half-colonial-white w-full lg:mx-auto lg:w-5/12 min-h-screen">
      <header className="h-[70px] flex flex-row">
        <Link
          href="/"
          className="w-8 lg:w-16 flex flex-col justify-center text-[36px] text-right unstyled-link"
        >
          <span className="text-thunderbird text-[36px] font-bold font-logo text-shadow">
            &gt;&nbsp;
          </span>
        </Link>
        <Link href="/" className="self-center unstyled-link">
          <h1 className="text-[36px] font-bold font-logo text-shadow">
            dario
            <span className="text-thunderbird">&apos;</span>s.blog
          </h1>
        </Link>
        <nav className="flex-grow flex flex-row justify-end self-center pr-8 lg:pr-16">
          <Navigation />
        </nav>
      </header>
      <hr className="h-[5px] bg-thunderbird shadow-light" />
      <div className="content p-8 lg:px-16 lg:py-12 flex flex-col space-y-6">
        <div className="grid grid-cols-10">
          <div className="col-span-6">
            <div className="flex flex-row justify-between">
              <h2 className="font-bold text-4xl">
                Hi, I&apos;m{' '}
                <span className="underline underline-offset-[4px] decoration-hippie-blue">
                  Dario
                </span>
              </h2>
              <Image priority src={arrow} alt="Pointer to me" />
            </div>
            <p>
              I&apos;m a software engineer with more than 15 years of experience
              in full-stack development using a variety of technologies,
              currently specialized in JavaScript/TypeScript, along with their
              associated frameworks and tools.
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
          <div className="col-span-4 w-full h-full flex flex-col justify-center">
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
          <ul>
            <li>
              <span className="opacity-80 text-xs">
                Thursday, October 26th, 2023
              </span>
              <br />
              <Link href="/blogs" className="font-bold text-2xl">
                Why doesn’t autofill work on my form?
              </Link>
              <br />
              <Badge>HTML</Badge> <Badge>Forms</Badge>{' '}
              <Badge>Accessibility</Badge>
              <br />
              You&apos;ve implemented a beautiful login form, but the browser
              will not autofill username and password on it. What could be the
              reason?
            </li>
          </ul>
        </div>
      </div>
      <hr className="h-[5px] bg-thunderbird shadow-light" />
      <footer className="h-[70px] bg-hippie-blue flex flex-row justify-between  p-8 lg:px-14 text-white">
        <p className="self-center text-sm">ⓒ 2024 Dario Djuric</p>
        <div className="self-center flex flex-row space-x-2">
          <a
            href="https://github.com/dariodjuric"
            target="_blank"
            className="opacity-100 hover:opacity-90"
          >
            <Image priority src={githubIcon} alt="My GitHub profile" />
          </a>
          <a
            href="https://www.linkedin.com/in/dario-djuric"
            target="_blank"
            className="opacity-100 hover:opacity-90"
          >
            <Image priority src={linkedinIcon} alt="My LinkedIn profile" />
          </a>
          <a
            href="https://twitter.com/dario_djuric"
            target="_blank"
            className="opacity-100 hover:opacity-90"
          >
            <Image priority src={xIcon} alt="My X profile" />
          </a>
        </div>
      </footer>
    </main>
  );
}
