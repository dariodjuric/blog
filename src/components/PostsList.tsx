import { format } from 'date-fns';
import { Post } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';

interface PostsListProps {
  posts: Post[];
  columns?: 2 | 3;
}

export default function PostsList({ posts, columns = 2 }: PostsListProps) {
  const gridClass =
    columns === 3 ? 'grid md:grid-cols-3 gap-4' : 'grid md:grid-cols-2 gap-4';

  return (
    <div className={gridClass}>
      {posts.map((post, i) => (
        <BlogCard
          key={post.slug}
          title={post.frontMatter.title}
          date={format(new Date(post.dateCreated), 'LLLL d, yyyy')}
          excerpt={post.frontMatter.summary || ''}
          tags={post.frontMatter.tags || []}
          slug={post.slug}
          index={i}
        />
      ))}
    </div>
  );
}
