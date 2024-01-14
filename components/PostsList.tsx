import { format } from 'date-fns';
import Link from 'next/link';
import { Badge } from '@/components/Badge';
import { Post } from '@/data/posts';
import { slugifyLowercase } from '@/utils/slugify';

interface PostsListsProps {
  posts: Post[];
}

export default function PostsList({ posts }: PostsListsProps) {
  return (
    <ul className="mt-3 space-y-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <span className="opacity-50 text-xs">
            {format(post.dateCreated, 'LLLL d, yyyy')}
          </span>
          <br />
          <Link href={`/posts/${post.slug}`} className="font-bold text-2xl">
            {post.frontMatter.title}
          </Link>
          <br />
          {post.frontMatter.tags.map((tagName: string) => (
            <Badge key={tagName} href={`/tags/${slugifyLowercase(tagName)}`}>
              {tagName}
            </Badge>
          ))}
          <br />
          {post.frontMatter.summary}
        </li>
      ))}
    </ul>
  );
}
