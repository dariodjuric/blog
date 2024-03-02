import myPicture from '@/public/me.jpg';
import Image from 'next/image';

export default async function AboutPage() {
  return (
    <>
      <h2>About me</h2>

      <Image
        src={myPicture}
        alt="My picture"
        quality={100}
        priority
        sizes="176w"
        className="w-44 float-right m-3"
        placeholder="blur"
      />

      <p>
        I&apos;m Dario Djuric, and I&apos;m a software engineer born and living
        in Zagreb, Croatia. I love to write, and this blog is a place where love
        to share all the things I learn.
      </p>
      <p>
        I have over 15 years of experience working in different areas of IT.
        After finishing college, I started to work as a network engineer, then
        shortly worked as an SAP consultant, after which I returned to my
        passion from my high school days, which is software development.
      </p>
      <p>
        Since then, I&apos;ve worked mostly in the service/consulting space in
        the enterprise, and I&apos;ve led teams, small and large. Currently, I
        work as a freelancer, specializing in JavaScript and TypeScript on both
        the frontend and the backend.
      </p>
      <p>
        Outside of work, most of my time is spent with my wife and our two boys,
        and every once in a while I manage to squeeze in a bit of time for my
        hobbies: sports (soccer, swimming, jogging), guitar playing, or PC
        gaming.
      </p>
    </>
  );
}
