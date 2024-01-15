import Link from 'next/link';

const menuItems = [
  { label: 'Blog posts', href: '/blogs' },
  { label: 'About me', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Home() {
  return (
    <main className="bg-half-colonial-white w-full lg:mx-auto lg:w-5/12 min-h-screen">
      <header className="h-[70px] flex flex-row">
        <Link
          href="/"
          className="w-8 lg:w-16 flex flex-col justify-center text-[36px] text-right"
        >
          <span className="text-thunderbird text-[36px] font-bold font-logo text-shadow">
            &gt;&nbsp;
          </span>
        </Link>
        <Link href="/" className="self-center">
          <h1 className="text-[36px] font-bold font-logo text-shadow">
            dario
            <span className="text-thunderbird">'</span>s.blog
          </h1>
        </Link>
        <nav className="flex-grow flex flex-row justify-end pr-8 lg:pr-16">
          <ul className="hidden lg:flex flex-row space-x-7 self-center">
            {menuItems.map((item) => (
              <li key={item.href} className="">
                <Link
                  className="no-underline font-bold hover:text-thunderbird text-lg"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <hr className="h-[5px] bg-thunderbird shadow-light" />
      <div className="content p-8 lg:px-16 lg:py-14">
        <h2 className="font-bold text-4xl">
          Hi, I'm{' '}
          <span className="underline underline-offset-[4px] decoration-thunderbird">
            Dario
          </span>
        </h2>
        <p className="my-2">
          I'm a software engineer with more than 15 years of experience in
          full-stack development using a variety of technologies, currently
          specialized in JavaScript/TypeScript, along with their associated
          frameworks and tools.
        </p>

        <p className="my-2">
          Welcome to my corner of the Internet, where I write about technology,
          primarily focusing on software development and devops.
        </p>

        <p className="my-2">
          If you're curious, feel free to explore more about my journey and
          expertise. As a freelancer, I'm always open to collaborations and
          projects. Should you be interested in working together, don't hesitate
          to get in touch!
        </p>
      </div>
      <hr className="h-[5px] bg-thunderbird shadow-light" />
      <footer className="h-[70px] bg-hippie-blue"></footer>
    </main>
  );
}
