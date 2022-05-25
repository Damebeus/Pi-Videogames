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

  return videogame.name ? (
    <div className={`${style.container}`}>
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
            src={videogame?.image}
            width='500px'
            height='350px'
            alt={"game"}
          />
        </div>
        <div className={style.detailInfo}>
          <h3>{videogame?.name}</h3>
          <p>Released: {videogame?.released}</p>
          <div className={style.platform}>
            Platform:
            {videogame?.platform?.map((e) => (
              <p className={style.platformItem}>{e}</p>
            ))}
          </div>
          <div>
            Genre:{" "}
            {videogame?.genre?.map((e) => (
              <p>{e}</p>
            ))}
          </div>
          <p className={style.description}>
            Description: {videogame?.description}
          </p>
          <p className={style.rating}>Rating: {videogame?.rating}</p>
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
