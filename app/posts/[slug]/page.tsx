import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/Badge';
import { Metadata, ResolvingMetadata } from 'next';
import { getCachedPosts, getPostBySlug } from '@/app/cached-posts';
import { slugifyLowercase } from '@/utils/slugify';
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer';

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
      <MarkdownRenderer content={post.content || ''} className="mt-5" />
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
