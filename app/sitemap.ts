import { getPosts } from '@/data/posts';

export default async function sitemap() {
  const posts = getPosts();
  const blogs = posts.map((post) => ({
    url: `https://darios.blog/posts/${post.slug}`,
    lastModified: new Date(post.dateUpdated).toISOString().split('T')[0],
  }));

  const routes = ['', '/about', '/posts', '/contact'].map((route) => ({
    url: `https://darios.blog${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
