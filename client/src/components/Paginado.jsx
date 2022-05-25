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
            <li>
              <button
                className={style.numeritos}
                style={
                  currentPage === number
                    ? { backgroundColor: "#fbff1aa9", color: "#000" }
                    : null
                }
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
