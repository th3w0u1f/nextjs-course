import PostContent from '../../components/posts/post-content/post-content';
import { getPostData, getPostFiles } from '../../helpers/posts-util';
import Head from 'next/head';

function PostDetailPage(props) {
	const { post } = props;

	if (!post) {
		return <p>Loading...</p>;
	}

	return (
		<main>
			<Head>
				<title>{post.title}</title>
				<meta
					name='description'
					content={post.excerpt}
				/>
			</Head>
			<PostContent post={post} />
		</main>
	);
}

export async function getStaticProps(context) {
	const currentPost = getPostData(context.params.slug);

	return {
		props: {
			post: currentPost
		},
		revalidate: 600
	};
}

export async function getStaticPaths() {
	const postFilesNames = getPostFiles();

	const slugs = postFilesNames.map((fileName) => fileName.replace(/\.md$/, ''));

	return {
		paths: slugs.map((slug) => ({ params: { slug: slug } })),
		fallback: false
	};
}

export default PostDetailPage;
