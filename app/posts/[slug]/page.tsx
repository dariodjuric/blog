import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/Badge';
import { Metadata, ResolvingMetadata } from 'next';
import { getCachedPosts, getPostBySlug } from '@/app/cached-posts';
import { slugifyLowercase } from '@/utils/slugify';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
  const posts = getCachedPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ slug: string }>;
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const article = getPostBySlug(slug);

  return {
    title: article?.frontMatter.title,
    description: article?.frontMatter.summary,
    openGraph: {
      title: article?.frontMatter.title,
      description: article?.frontMatter.summary,
    },
    twitter: {
      title: article?.frontMatter.title,
      description: article?.frontMatter.summary,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <article>
      <span className="opacity-60 text-xs">
        {format(post.dateCreated, 'LLLL d, yyyy')}
      </span>
      <h2>{post.frontMatter.title}</h2>
      <div className="mt-5">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ children, href, ...props }) => {
              if (href?.includes('darios.blog')) {
                return (
                  <Link href={href || ''} {...props}>
                    {children}
                  </Link>
                );
              }
              return (
                <a
                  href={href || ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              );
            },
            img: ({ src, alt, width, height, ...props }) => {
              if (!src) return null;
              const widthNum =
                typeof width === 'string' ? parseInt(width, 10) : width || 800;
              const heightNum =
                typeof height === 'string'
                  ? parseInt(height, 10)
                  : height || 600;
              return (
                <Image
                  src={src}
                  alt={alt || ''}
                  width={widthNum}
                  height={heightNum}
                  {...props}
                />
              );
            },
            pre: ({ children, className, ...props }) => (
              <pre
                className={`bg-gray-100 p-4 rounded overflow-x-auto ${className || ''}`}
                {...props}
              >
                {children}
              </pre>
            ),
            code: ({ children, className, ...props }) => (
              <code className={className || ''} {...props}>
                {children}
              </code>
            ),
            ol: ({ children, className, ...props }) => (
              <ol className={`list-decimal ml-4 ${className || ''}`} {...props}>
                {children}
              </ol>
            ),
          }}
        >
          {post.content || ''}
        </ReactMarkdown>
      </div>
      {post.frontMatter.tags.length > 0 && (
        <div className="mt-5">
          {post.frontMatter.tags.map((tagName: string) => (
            <Badge key={tagName} href={`/tags/${slugifyLowercase(tagName)}`}>
              {tagName}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
