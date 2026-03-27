import path from 'node:path';
import * as fs from 'fs';
import matter from 'gray-matter';

export interface Post {
  dateCreated: string;
  dateUpdated: string;
  slug: string;
  frontMatter: { [p: string]: any };
  content: string;
}

export const getPosts = (): Post[] => {
  const postsDirectory = path.join(process.cwd(), 'data/posts');
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.mdx'));
  const posts = fileNames.map((fileName) => {
    const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})-/);
    const date = dateMatch ? new Date(dateMatch[1]) : null;
    if (date === null) {
      throw new Error(`Invalid date in ${fileName}`);
    }
    const slug = fileName
      .replace(/^(\d{4}-\d{2}-\d{2})-/, '')
      .replace(/\.mdx$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      dateCreated: date.toISOString(),
      dateUpdated: matterResult.data.dateUpdated
        ? new Date(matterResult.data.dateUpdated).toISOString()
        : date.toISOString(),
      slug: slug,
      frontMatter: matterResult.data,
      content: matterResult.content,
    };
  });

  posts.sort((a, b) => {
    return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
  });

  return posts;
};
