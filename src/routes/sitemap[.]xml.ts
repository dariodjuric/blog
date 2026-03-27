import { createFileRoute } from '@tanstack/react-router';
import { getPosts } from '@/lib/posts';

export const Route = createFileRoute('/sitemap.xml' as any)({
  server: {
    handlers: {
      GET: async () => {
        const posts = getPosts();
        const siteUrl = 'https://darios.blog';
        const today = new Date().toISOString().split('T')[0];

        const staticRoutes = ['', '/about', '/posts', '/contact'];

        const urls = [
          ...staticRoutes.map(
            (route) => `
    <url>
      <loc>${siteUrl}${route}</loc>
      <lastmod>${today}</lastmod>
    </url>`,
          ),
          ...posts.map(
            (post) => `
    <url>
      <loc>${siteUrl}/posts/${post.slug}</loc>
      <lastmod>${new Date(post.dateUpdated).toISOString().split('T')[0]}</lastmod>
    </url>`,
          ),
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('')}
</urlset>`;

        return new Response(xml, {
          headers: { 'Content-Type': 'application/xml' },
        });
      },
    },
  },
});
