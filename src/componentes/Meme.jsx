// import html2canvas from "html2canvas";
// import React, { useState, useEffect } from "react";

import React, { useEffect, useState } from 'react'
import '../hojas-de-estilo/Meme.css';

const Meme = () => {

  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(resp => {
        resp.json().then(resp =>{
          const memes = resp.data.memes;
          setMemes(memes);
        });    
      });
  }, []);

  return (
    memes.length ? 
    <div className={Meme.container}>
      <button className={Meme.skip}>Skipe</button>
      <img src={memes[0].url} /> 
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