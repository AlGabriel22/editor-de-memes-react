import React, { useState, useEffect } from 'react';
import '../hojas-de-estilo/meme.css';
import html2canvas from 'html2canvas';
import axios from 'axios';



const Meme = () => {
  const [memes, setMemes] = useState([]); //Para almacenar la respuesta de la API.
  const [selectedMeme, setSelectedMeme] = useState({}); //Para almacenar el meme seleccionado al azar.
  const [changeMeme, setChangeMeme] = useState(true) //Para elegir otro meme.
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedColor, setSelectedColor] = useState('white');

  // busca imágenes de memes al cargar la página y hasta que se llene el array de estados de memes
  useEffect(() => {
    if(!memes.length) {
      axios.get('https://api.imgflip.com/get_memes').then((result) => {
        if(result.data.success) {
          setMemes(result.data.data.memes);
        }
      });
    }
  },[memes]);

  //seleccione aleatoriamente uno de los memes del array
  useEffect(() => {
    if (memes.length) {
      const ramdomMeme = getRandomInt(memes.length);
      setSelectedMeme(memes[ramdomMeme]);
    }
  }, [memes, changeMeme]);

  // función para obtener un número entero aleatorio entre 0 y máximo
  const getRandomInt = (max) => {
    const value = Math.floor(Math.random() * max);
    return value;
  };

  // actualiza el estado para activar el renderizado con una nueva imagen de meme
  const handleMemeChange = (e) => {
    setChangeMeme(!changeMeme);
  };

  // manejar las entradas del formulario
  const handleChange = (e) => {
    if (e.target.name === 'top_text') setTopText(e.target.value);
    else setBottomText(e.target.value);
  };

  // cambiar el color del texto según el selector de color
  const handleColor = (e) => {
    const color = e.target.className.split(' ')[2];
    setSelectedColor(color);
  };

  // Descargar meme
  const descargar = (e) => {
    html2canvas(document.querySelector('#exportar'), {useCORS: true}).then(canvas => {
      // document.body.appendChild(canvas)
      let img = canvas.toDataURL('image/png');
      let link = document.createElement('a');
      link.download = `${selectedMeme.name}.png`;
      link.href = img;
      link.click();
    });
  }

  return (
    <div className='container'>
      <div
        className='meme-container' 
        id='exportar'
        style={{
          backgroundImage: `url(${selectedMeme?.url})`,
          height: `${selectedMeme?.height}px`,
          width: `${selectedMeme?.width}px`,
        }}
      >
        <h4 
          style={{ color: selectedColor }}
          className='meme-top-text'>
          {topText}
        </h4>
        <h4 
          style={{ color: selectedColor }}
          className='meme-bottom-text'>
          {bottomText}
        </h4>
      </div>
        {/* muestra un selector de color con 5 opciones */}
        <div className='color-picker'>
          <button 
            onClick={handleColor}
            style={
              selectedColor === 'orange' ? { height: '1.5em', width: '1.5em'} : {}
            }
            className='color waves-effect orange hoverable'>  
          </button>

          <button
            onClick={handleColor}
            style={selectedColor === 'white' ? {height: '1.5em', width: '1.5em'} : {}
            }
            className='color waves-effect white hoverable'>  
          </button>

          <button
            onClick={handleColor}
            style={selectedColor === 'black' ? {height: '1.5em', width: '1.5em'} : {}
            }
            className='color waves-effect black hoverable'>  
          </button>

          <button
            onClick={handleColor}
            style={selectedColor === 'pink' ? {height: '1.5em', width: '1.5em'} : {}
            }
            className='color waves-effect pink hoverable'>  
          </button>

          <button
            onClick={handleColor}
            style={selectedColor === 'yellow' ? {height: '1.5em', width: '1.5em'} : {}
            }
            className='color waves-effect yellow hoverable'>  
          </button>
        </div>

        {/* Muestra dos campos de input */}
        <form>
          <div className="row">
            <div className="input-field">
              <i class="material-icons prefix">mode_edit</i>
              <input 
                className='validate'
                type='text'
                id='top_text'
                name='top_text'
                value={topText}
                onChange={handleChange}
              />
              <label for='top_text'>Texto superior</label>
            </div>
            <div className="input-field">
              <i class="material-icons prefix">mode_edit</i>
              <input 
                className='validate'
                type="text"
                name='bottom_text'
                id='bottom_text'
                value={bottomText}
                onChange={handleChange} 
              />
              <label for='bottom_text'>Texto inferior</label>
              
            </div>
          </div>
        </form>

        {/* Botones para cambiar el meme y descargar el archivo */}
        <div className='button-container'>
          <button
            onClick={handleMemeChange}
            className='waves-effect waves-light btn blue hoverable truncate flow-text'>
            Otro meme
              <i className="material-icons">autorenew</i>
              
          </button>
          <button
            onClick={descargar}
            className='waves-effect waves-light btn hoverable flow-text'>Descargar
            <i className="material-icons">file_download</i>
          </button>
        </div>
    </div>
  );
};

export default Meme;
