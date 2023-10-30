import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";
import "../hojas-de-estilo/Imgmeme.css";

async function Imgmemes() {
  // variable de estado para imagenes
  const [imgmeme, setImgmeme] = useState();

  // variable de estado para el input
  const [textmeme, setTextmeme] = useState();

  // funcion textomeme, toma el valor ingresado en el input a partir de un evento y se lo asigna a la variable de estado setTexmeme.
  const textomeme = (e) => {
    setTextmeme(e.target.value);
  }

  const seleccionarImg = (e) => {
    setImgmeme(e.target.value);
  }

  const descargar = (e) => {
    html2canvas(document.querySelector("#exportar")).then(canvas => {
      // document.body.appendChild(canvas)
      let img = canvas.toDataURL("memes/jpg");
      let link = document.createElement("a");
      link.download = "memepropio.jpg";
      link.href = img;
      link.click();
    });
  }

  // Api
  const axios = require('axios');

  const options = {
    method: 'GET',
    url: 'https://ronreiter-meme-generator.p.rapidapi.com/meme',
    params: {
      top: 'Top Text',
      bottom: 'Bottom Text',
      meme: 'Condescending-Wonka',
      font_size: '50',
      font: 'Impact'
    },
    headers: {
      'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
      'X-RapidAPI-Host': 'ronreiter-meme-generator.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="contenedor">
      <h1 className="titulo">Editor de memes</h1>
      <h3>Ingresa el texto del meme:</h3>
      <input
        className="input-texto"
        type="text"
        placeholder="Escribi tu frase"
        name="meme"
        aria-label="default input example"
        onChange={textomeme} />

      <h3>Eligí tu imagen</h3>
      {/* {memes.map(meme => ( */}
      <div>
        <select
          onChange={seleccionarImg}>
          <option value={1}>bob esponja</option>
          {/* <option value={2}>Bob esponja</option>
            <option value={3}>Calamardo</option> */}
        </select>
        <figure className="" id="exportar">
          <p>{textmeme}</p>
          <img src={`../imgmemes/${imgmeme}.jpg`}
            alt="meme"
            className="imagen" />
        </figure>
      </div>
      {/* ))} */}


      <button
        type="button"
        className="boton-descargar"
        onClick={descargar}>Descargar meme</button>
    </div>
  );
}

export default Imgmemes;