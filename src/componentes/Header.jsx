import React from 'react';
import '../hojas-de-estilo/header.css';

const Header = () => {
	return (
		<nav className='teal'>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<p className='brand-logo'>Generador de Memes</p>
		</nav>
	);
};

export default Header;