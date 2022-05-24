import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/LandingPage.module.css";
import videito from "../img/Landing.mp4";
import titul from "../img/tituloLanding.png";
import ingresar from "../img/ingresa.png";
import logo from "../img/logoHenry.png";
export default function LandingPage() {
  return (
    <div className={style.background}>
      <video
        className={style.videin}
        autoPlay
        loop
        muted
        src={videito}
        type='video/mp4'
      />
      <div>
        <img className={style.logo} src={logo} alt='logo' />
      </div>
      <div>
        <img className={style.titulo} src={titul} alt='titulo' />
      </div>
      <div className={style.button}>
        <Link to='/Home'>
          <button className={style.botoncito}>
            <img className={style.boton} src={ingresar} alt='ingresar' />
          </button>
        </Link>
      </div>
    </div>
  );
}
