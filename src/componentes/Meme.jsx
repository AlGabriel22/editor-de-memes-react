// import html2canvas from "html2canvas";
// import React, { useState, useEffect } from "react";

import React, { useEffect, useState } from 'react';
import styles from '../hojas-de-estilo/Meme.css';

const Meme = () => {

  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);


  const agregarTexto = (e, index) => {
    const texto = e.target.value || '';
    setCaptions(
      captions.map((c, i) => {
        if(index === i) {
          return texto;
        } else {
          return c;
        }
      })
    );
  };

  // Funcion para traer una imagen ramdom de la API
  const ramdomMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const generarMeme = () => {
    const actualMeme = memes[memeIndex];
    const formData = new FormData();

    formData.append('username', 'portexe');
    formData.append('password', 'abc123');
    formData.append('template_id', actualMeme.id);
    captions.forEach((c, index) => formData.append(`boxes[${index}][texto], c`));


    fetch('https://api.imgflip.com/caption_image', {
      method: 'POST',
      body: formData
    }).then(response => {
      response.json().then(response => {
        console.log(response);
      });
    });
  };

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => {
        response.json().then(response =>{
          const _memes = response.data.memes;
          ramdomMemes(_memes);
          setMemes(_memes);
        });    
      });
  }, []);

  useEffect(() => {
    if(memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(''));
    }
  }, [memeIndex, memes]);


  return (
    memes.length ? 
    <div className={'container'}>
      <button onClick={() => setMemeIndex(memeIndex + 1)} className={'skip'}>Skipe</button>
      {
        captions.map((c, index) => (
          <input onChange={(e) => agregarTexto(e, index)} key={index} />
        ))
      }
      <button onClick={generarMeme} className={'generate'}>Generar meme</button>
      <img src={memes[memeIndex].url} /> 
    </div> : <></>
    
  );
};

export default Meme


// async function Imgmemes() {
//   // variable de estado para imagenes
//   const [imgmeme, setImgmeme] = useState();

//   // variable de estado para el input
//   const [textmeme, setTextmeme] = useState();

//   // funcion textomeme, toma el valor ingresado en el input a partir de un evento y se lo asigna a la variable de estado setTexmeme.
//   const textomeme = (e) => {
//     setTextmeme(e.target.value);
//   }

//   const seleccionarImg = (e) => {
//     setImgmeme(e.target.value);
//   }

//   const descargar = (e) => {
//     html2canvas(document.querySelector("#exportar")).then(canvas => {
//       // document.body.appendChild(canvas)
//       let img = canvas.toDataURL("memes/jpg");
//       let link = document.createElement("a");
//       link.download = "memepropio.jpg";
//       link.href = img;
//       link.click();
//     });
//   }

//   return (
//     <div className="contenedor">
//       <h1 className="titulo">Editor de memes</h1>
//       <h3>Ingresa el texto del meme:</h3>
//       <input
//         className="input-texto"
//         type="text"
//         placeholder="Escribi tu frase"
//         name="meme"
//         aria-label="default input example"
//         onChange={textomeme} />

//       <h3>Eligí tu imagen</h3>
//       {/* {memes.map(meme => ( */}
//         <div>
//           <select
//             onChange={seleccionarImg}>
//             <option value={1}>bob esponja</option>
//             {/* <option value={2}>Bob esponja</option>
//             <option value={3}>Calamardo</option> */}
//           </select>
//           <figure className="" id="exportar">
//             <p>{textmeme}</p>
//             <img src={`../imgmemes/${imgmeme}.jpg`}
//               alt="meme"
//               className="imagen" />
//           </figure>
//         </div>
//       {/* ))} */}


//       <button
//         type="button"
//         className="boton-descargar"
//         onClick={descargar}>Descargar meme</button>
//     </div>
//   );
// }

// export default Imgmemes;