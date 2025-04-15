import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postDir = path.join(process.cwd() + '/posts');

export const getAllPosts = () => {
	const postFiles = getPostFiles();

	const allPosts = postFiles.map((postFile) => {
		return getPostData(postFile);
	});

	const sortedPosts = allPosts.sort(() => (postA, postB) => postA.date > postB.date ? -1 : 1); // sort posts by date (newer posts first)

	return sortedPosts;
};

export const getPostFiles = () => {
	return fs.readdirSync(postDir);
};

export const getPostData = (postIdentifier) => {
	const postSlug = postIdentifier.replace(/\.md$/, ''); // remove the file extension
	const filePath = path.join(postDir, `${postSlug}.md`);
	const fileContent = fs.readFileSync(filePath, 'utf-8');

	const { data, content } = matter(fileContent);

	const postData = { slug: postSlug, ...data, content };

	return postData;
};

export const getFeaturedPosts = () => {
	const allPosts = getAllPosts();

	const featuredPosts = allPosts.filter((post) => post.isFeatured);

	return featuredPosts;
};
