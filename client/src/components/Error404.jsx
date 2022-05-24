import React from "react";
import style from "../styles/Error404.module.css";
import { Link } from "react-router-dom";
import pagina from "../img/pagina.png";
import encontrada from "../img/encontrada.png";
import volver from "../img/volver.png";
export default function Error404() {
  return (
    <div className={style.body}>
      <div className={style.titulo}>
        <div className={style.pagina}>
          <img src={pagina} alt='' />
        </div>
        <div className={style.encontrada}>
          <img src={encontrada} alt='' />
        </div>
      </div>
      <Link to='/home'>
        <button className={style.boton}>
          <img src={volver} alt='' />
        </button>
      </Link>
      <input className={style.input} type='checkbox' name='' id='cuatro' />
      <input className={style.input} type='checkbox' name='' id='cero' />
      <input className={style.input} type='checkbox' name='' id='cuatrofinal' />
      <div className={style.container}>
        <div className={`${style.item} ${style.card1}`}>
          <label className={style.label} for='cuatro'></label>
        </div>

        <div className={`${style.item} ${style.card2}`}>
          <label className={style.label} for='cero'></label>
        </div>
        <div className={`${style.item} ${style.card3}`}>
          <label className={style.label} for='cuatrofinal'></label>
        </div>
      </div>
    </div>
  );
}
