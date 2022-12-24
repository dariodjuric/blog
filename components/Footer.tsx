import siteMetadata from '@/data/siteMetadata';
import SocialIcon from '@/components/social-icons';

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
        </div>
        <div className="mb-1 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{siteMetadata.author}</div>
        </div>
        <div className="mb-3 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>
            Powered by the{' '}
            <a
              href="https://vercel.com/templates/next.js/tailwind-css-starter-blog"
              target="_blank"
              rel="noreferrer"
            >
              Tailwind Next.js starter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
