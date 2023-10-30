import React from 'react';
import '../hojas-de-estilo/header.css';

const Header = () => {
	return (
		<nav className='teal'>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<p className='brand-logo'>Meme Generator</p>
		</nav>
	);
};

export default Header;