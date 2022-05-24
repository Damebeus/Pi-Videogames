import React from "react";
import style from "../styles/Paginado.module.css";

export default function Paginado({
  videogamesPerPage,
  allVideogames,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={style.paginado}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li
              className={`${style.number}  ${
                currentPage === number && style.paginateActive
              }`}
            >
              <a className={style.numeritos} onClick={() => paginado(number)}>
                {number}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
