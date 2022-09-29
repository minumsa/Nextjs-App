import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');
console.log('process.cwd()', process.cwd());
// /Users/yooil/Downloads/next-typescript
console.log('postDirectory', postsDirectory);
// /Users/yooil/Downloads/next-typescript/posts

export function getSortedPostsData() {
  // /Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  // ['pre-rendering.md', ...];
  console.log('fileNames', fileNames);
  // fileNames [ 'pre-rendering.md', 'ssg-ssr.md' ]
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with id
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  // Sort posts by data
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
