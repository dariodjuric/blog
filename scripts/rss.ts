import { Feed } from 'feed';
import { getPosts, Post } from '../data/posts';
import * as fs from 'fs';

const main = () => {
  const allPosts = getPosts();
  const siteUrl = 'https://darios.blog';

  const feedOptions = {
    title: "Dario's Blog",
    description: "Dario's blog posts",
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/logo.png`,
    favicon: `${siteUrl}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Dario Djuric`,
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
  };

  const feed = new Feed(feedOptions);

  allPosts.forEach((post: Post) => {
    feed.addItem({
      title: post.frontMatter.title,
      id: `${siteUrl}/posts/${post.slug}`,
      link: `${siteUrl}/posts/${post.slug}`,
      description: post.frontMatter.description,
      date: post.dateUpdated,
    });
  });

  fs.writeFileSync('./public/rss.xml', feed.rss2());
};

main();
