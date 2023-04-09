import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { IPost } from '../shared/interfaces/post.interface';

const postsDir = path.join(process.cwd(), 'content');

export function getPostsFiles() {
    return fs.readdirSync(postsDir).filter(files => files.includes('.md'));
}

export function getPostData(fileName: string) {
    const postSlug = fileName.replace(/\.md$/, ''); // removes the file extension

    const filePath = path.join(postsDir, `${postSlug}.md`);

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const { data, content } = matter(fileContent);

    const postData = data as IPost;
    postData.slug = postSlug;
    postData.content = content;

    return postData;
}

export function getAllPosts() {
    const postFiles = getPostsFiles();
    const allPosts = postFiles.map(postFile => getPostData(postFile));
    return allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts();
    return allPosts.filter(post => post.isFeatured);
}