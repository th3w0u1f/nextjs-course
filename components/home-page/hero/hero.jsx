import React from 'react';
import classes from './hero.module.css';
import Image from 'next/image';

const Hero = () => {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image
					src='/images/site/max.png'
					alt='An image showing Max'
					width={400}
					height={400}
				/>
			</div>
			<h1>Hi, I'm Jabez!</h1>
			<p>I blog about web development, UI/UX design and a few more interesting topics</p>
		</section>
	);
};

export default Hero;
