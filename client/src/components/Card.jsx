import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/Card.module.css";
export default function Card({ image, name, genre, id, rating }) {
  return name ? (
    <div className={style.cards}>
      <Link to={`/videogame/${id}`}>
        <div className={style.name}>
          <h3>{name}</h3>
        </div>
        <div className={style.imagen}>
          <img src={image} alt='img not found' width='209px' height='210px' />
        </div>
        <div className={style.rating}>
          <h3>
            {" "}
            <div className={style.rating}>{rating}</div>
          </h3>
        </div>
        <div className={style.genres}>
          {genre?.map((elm) => (
            <h5>{elm}ㅤ</h5>
          ))}
        </div>
      </Link>
    </div>
  ) : null;
}
