import { createServerFn } from '@tanstack/react-start';
import { getPosts } from './posts';
import { slugifyLowercase } from '@/utils/slugify';

export const fetchPosts = createServerFn({ method: 'GET' }).handler(
  async () => {
    return getPosts();
  },
);

export const fetchPostBySlug = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const posts = getPosts();
    return posts.find((p) => p.slug === slug) ?? null;
  });

export const fetchPostsByTag = createServerFn({ method: 'GET' })
  .inputValidator((tag: string) => tag)
  .handler(async ({ data: tag }) => {
    const posts = getPosts();
    return posts.filter((post) =>
      post.frontMatter.tags
        .map((t: string) => slugifyLowercase(t))
        .includes(tag),
    );
  });
