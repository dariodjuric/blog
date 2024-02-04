import { cache } from 'react';
import { getPosts, Post } from '@/data/posts';

export const getCachedPosts = cache(getPosts);

export function getPostBySlug(slug: string) {
  return getCachedPosts().find((post: Post) => post.slug === slug) || null;
}
