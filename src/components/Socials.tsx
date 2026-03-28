import { FaBluesky, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';

const links = [
  { href: 'https://github.com/dariodjuric', label: 'GitHub', icon: FaGithub },
  {
    href: 'https://www.linkedin.com/in/dario-djuric',
    label: 'LinkedIn',
    icon: FaLinkedin,
  },
  {
    href: 'https://bsky.app/profile/dariodjuric.bsky.social',
    label: 'Bluesky',
    icon: FaBluesky,
  },
  {
    href: 'https://www.instagram.com/dariodjuric/',
    label: 'Instagram',
    icon: FaInstagram,
  },
];

export default function Socials() {
  return (
    <div className="flex items-center gap-3">
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label={label}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
