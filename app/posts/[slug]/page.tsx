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
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const article = getPostBySlug(params.slug);

  return {
    title: article?.frontMatter.title,
    description: (await parent).description,
  };
}

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
        <MDXRemote
          source={post.content || ''}
          components={mdxComponents}
          options={{
            mdxOptions: {},
          }}
        />
      </div>
      {post.frontMatter.tags.length > 0 && (
        <div className="mt-5">
          {post.frontMatter.tags.map((tagName: string) => (
            <Badge
              key={tagName}
              href={`/tags/${slugify(tagName).toLowerCase()}`}
            >
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
    if (props.href?.includes('darios.blog')) {
      return (
        // @ts-ignore
        <Link {...props} href={props.href || ''}>
          {children}
        </Link>
      );
    }
    return (
      // @ts-ignore
      <a {...props} href={props.href || ''} target="_blank">
        {children}
      </a>
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
  // @ts-ignore
  ol: ({ children, props }) => {
    return (
      <ol className="list-decimal ml-4" {...props}>
        {children}
      </ol>
    );
  },
};
