import React from 'react';
import '../hojas-de-estilo/header.css';

const Header = () => {
	return (
		<nav>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			<div className='brand-logo'>
				<img
					className='img-header'
					src='http://www.pngall.com/wp-content/uploads/2016/05/Trollface.png'
					alt='troll face'
				/>
				<p className='logo'>Editor de Memes</p>
			</div>
		</nav>
	);
};

export default Header;