import { FaBluesky, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';

export default function Socials() {
  return (
    <div className="self-center flex flex-row space-x-3">
      <a
        href="https://github.com/dariodjuric"
        target="_blank"
        className="opacity-100 hover:opacity-95"
      >
        <FaGithub
          className="h-full text-brand-content-inverse drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
          aria-label="My GitHub profile"
        />
      </a>
      <a
        href="https://www.linkedin.com/in/dario-djuric"
        target="_blank"
        className="opacity-100 hover:opacity-95"
      >
        <FaLinkedin
          className="h-full text-brand-content-inverse drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
          aria-label="My LinkedIn profile"
        />
      </a>
      <a
        href="https://bsky.app/profile/dariodjuric.bsky.social"
        target="_blank"
        className="opacity-100 hover:opacity-95"
      >
        <FaBluesky
          className="h-full text-brand-content-inverse drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
          aria-label="My Bluesky profile"
        />
      </a>
      <a
        href="https://www.instagram.com/dariodjuric/"
        target="_blank"
        className="opacity-100 hover:opacity-95"
      >
        <FaInstagram
          className="h-full text-brand-content-inverse drop-shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
          aria-label="My Instagram profile"
        />
      </a>
    </div>
  );
}
