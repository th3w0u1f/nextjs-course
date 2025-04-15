import AllPosts from '../../components/posts/all-posts/all-posts';
import { getAllPosts } from '../../helpers/posts-util';
import Head from 'next/head';

function AllPostsPage({ posts }) {
	return (
		<main>
			<Head>
				<title>All Posts</title>
				<meta
					name='description'
					content='A list of all programming-related tutorials and posts!'
				/>
			</Head>
			<AllPosts posts={posts} />
		</main>
	);
}

export async function getServerSideProps(context) {
	const allPosts = getAllPosts();

	return {
		props: {
			posts: allPosts
		}
	};
}

export default AllPostsPage;
