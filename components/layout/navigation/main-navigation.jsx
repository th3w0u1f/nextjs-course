import React from 'react';
import classes from './main-navigation.module.css';
import Logo from '../logo/logo';
import Link from 'next/link';

const MainNavigation = () => {
	return (
		<header className={classes.header}>
			<Link href='/'>
				<Logo />
			</Link>
			<nav>
				<ul>
					<li>
						<Link href='/'>Home</Link>
					</li>
					<li>
						<Link href='/posts'>Posts</Link>
					</li>
					<li>
						<Link href='/contact'>Contact</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
