import Image from 'next/image';
import githubIcon from '@/public/icons/github.svg';
import linkedinIcon from '@/public/icons/linkedin.svg';
import xIcon from '@/public/icons/x.svg';

export default function Socials() {
  return (
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
        href="https://x.com/dario_djuric"
        target="_blank"
        className="opacity-100 hover:opacity-90"
      >
        <Image priority src={xIcon} alt="My X profile" />
      </a>
    </div>
  );
}
