import React from 'react'
import '../hojas-de-estilo/Header.css';

function Header() {
  return (
    <header>
      <img 
        className='img-header'
        src='http://www.pngall.com/wp-content/uploads/2016/05/Trollface.png'
        alt='troll face'
      />
      <p>Generador de Memes</p>
    </header>
  );
}

export default Header;