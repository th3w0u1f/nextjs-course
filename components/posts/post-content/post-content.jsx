import React from 'react';
import classes from './post-content.module.css';
import PostHeader from '../post-header/post-header';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

const PostContent = (props) => {
	const { post } = props;

	const imagePath = `/images/posts/${post.slug}/${post.image}`;

	const customComponents = {
		img(image) {
			return (
				<Image
					src={`/images/posts/${post.slug}/${image.src}`}
					alt={image.alt}
					width={700}
					height={350}
				/>
			);
		},
		paragraph(paragraph) {
			const { node } = paragraph;
			if (node.children[0].type === 'image') {
				const image = node.children[0];
				return (
					<div className={classes.image}>
						<Image
							src={`/images/posts/${post.slug}/${image.src}`}
							alt={image.alt}
							width={700}
							height={350}
						/>
					</div>
				);
			}
			return <p>{paragraph.children}</p>;
		},
		code(code) {
			const { className, children } = code;
			const match = /language-(\w+)/.exec(className || '')[1];
			return (
				<SyntaxHighlighter
					style={atomDark}
					language={match}
					children={String(children).replace(/\n$/, '')}
				/>
			);
		}
	};

	return (
		<article className={classes.content}>
			<PostHeader
				title={post.title}
				image={imagePath}
			/>
			<ReactMarkdown
				components={customComponents}
				children={post.content}
			/>
		</article>
	);
};

export default PostContent;
