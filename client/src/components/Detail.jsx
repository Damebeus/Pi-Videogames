import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getGamesById } from "../actions";
import { Link } from "react-router-dom";
import style from "../styles/Detail.module.css";
import cargando from "../img/enoquiano.png";
import fondo from "../img/jeroglificos.jpg";
import momia from "../img/momia.gif";

export default function Detail(data) {
  const { id } = data.match.params;
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.detailGame);

  useEffect(() => {
    dispatch(getGamesById(id));
  }, []);

  return videogame[0] ? (
    <div className={`${style.container}`}>
      <button onClick={console.log(videogame[0])}>x</button>
      <div className={`${style.detail}`}>
        <Link to='/home'>
          <div className={style.buttonContainer1}>
            <span className={style.mas}>Volver!</span>
            <button id='work' type='button' name='Hover'>
              Volver!
            </button>
          </div>
        </Link>
        <div>
          <img
            className={style.img}
            src={videogame.img}
            width='500px'
            height='350px'
            alt={"game"}
          />
        </div>
        <div className={style.detailInfo}>
          <h3>{videogame[0].name}</h3>
          <p>Released: {videogame[0].released}</p>
          <p>
            Platform:{" "}
            {videogame[0].platform.map((e) => (
              <p>{e}</p>
            ))}
          </p>
          <p>
            Genre:{" "}
            {videogame[0].Genres.map((e) => (
              <p>{e}</p>
            ))}
          </p>
          <p className={style.description}>
            Description: {videogame[0].description}
          </p>
          <p className={style.rating}>Rating: {videogame[0].rating}</p>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <img className={style.fondito} src={fondo} alt='' />
      <img className={style.gifito} src={cargando} alt='' />
      <img className={style.momia} src={momia} alt='' />
      <img className={style.momia2} src={momia} alt='' />
    </div>
  );
}
