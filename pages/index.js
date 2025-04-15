import Head from 'next/head';
import FeaturedPosts from '../components/home-page/featured-posts/featured-posts';
import Hero from '../components/home-page/hero/hero';
import { getFeaturedPosts } from '../helpers/posts-util';

function HomePage({ posts }) {
	return (
		<main>
			<Head>
				<title>Next Blog</title>
				<meta
					name='description'
					content='I post about programming and web development.'
				/>
			</Head>
			<Hero />
			<FeaturedPosts posts={posts} />
		</main>
	);
}

export async function getStaticProps(context) {
	const featuredPosts = getFeaturedPosts();

	return {
		props: {
			posts: featuredPosts
		},
		revalidate: 1800
	};
}

export default HomePage;
