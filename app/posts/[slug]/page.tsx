import { getPostBySlug } from '@/data/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';
import { Code } from 'bright';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/Badge';
import slugify from 'slugify';

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <>
      <span className="opacity-60 text-xs">
        {format(post.date, 'LLLL d, yyyy')}
      </span>
      <h2 className="mb-6 mt-0">{post.frontMatter.title}</h2>
      <div>
        <MDXRemote source={post.content || ''} components={mdxComponents} />
      </div>
      {post.frontMatter.tags.length > 0 && (
        <div className="mt-5">
          {post.frontMatter.tags.map((tagName: string) => (
            <Badge href={`/tags/${slugify(tagName).toLowerCase()}`}>
              {tagName}
            </Badge>
          ))}
        </div>
      )}
    </>
  );
}

const mdxComponents: MDXComponents = {
  a: ({ children, ...props }) => {
    return (
      // @ts-ignore
      <Link {...props} href={props.href || ''}>
        {children}
      </Link>
    );
  },
  // @ts-ignore
  img: ({ children, props }) => {
    return <Image {...props} />;
  },
  // @ts-ignore
  pre: ({ children, props }) => {
    return <Code {...props}>{children}</Code>;
  },
  ol: ({ children }) => {
    return <ol className="mt-5 mb-5 list-decimal list-inside">{children}</ol>;
  },
};
