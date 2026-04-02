import { Feed, FeedOptions } from 'feed';
import { getPosts, Post } from '../data/posts';
import * as fs from 'fs';

const main = () => {
  const allPosts = getPosts();
  const siteUrl = 'https://darios.blog';

  const feedOptions: FeedOptions = {
    title: "Dario's Blog",
    description: "Dario's blog posts",
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    image: `${siteUrl}/og.png`,
    favicon: `${siteUrl}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Dario Djuric`,
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
  };

  const feed = new Feed(feedOptions);

  const author = {
    name: 'Dario Djuric',
    email: 'hello@darios.blog',
    link: `${siteUrl}/about`,
  };

  allPosts.forEach((post: Post) => {
    feed.addItem({
      title: post.frontMatter.title,
      id: `${siteUrl}/posts/${post.slug}`,
      link: `${siteUrl}/posts/${post.slug}`,
      description: post.frontMatter.summary,
      image: {
        url: `${siteUrl}/og.png?slug=${post.slug}`,
        type: 'image/png',
        length: 50000,
      },
      date: post.dateUpdated,
      author: [author],
    });
  });

  fs.writeFileSync('./public/rss.xml', feed.rss2());
};

main();
