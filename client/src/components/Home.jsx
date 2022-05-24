import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreated,
  getVideogames,
  orderByGenre,
  orderByName,
  getGenres,
  orderByRating,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import style from "../styles/Home.module.css";
import SearchBar from "./SearchBar";
import gif from "../img/enoquiano.png";
import fondo from "../img/jeroglificos.jpg";
import momia from "../img/momia.gif";

export default function Home() {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const [order, setOrder] = useState("null");
  const [existanceOrder, setExistanceOrder] = useState("null");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  function sourceRating(ev) {
    dispatch(orderByRating(ev));
    setOrder("Rating");
  }
  function selectByGenre(ev) {
    setOrder(ev);
    dispatch(orderByGenre(ev));
    setCurrentPage(1);
  }
  function filterExistance(ev) {
    setExistanceOrder(ev);
    dispatch(filterCreated(ev));
    setCurrentPage(1);
  }

  function handleSort(ev) {
    ev.preventDefault();
    dispatch(orderByName(ev.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${ev.target.value}`);
  }
  return (
    <div className={style.back}>
      <div className={style.container}>
        <div className={style.SearchBar}>
          <SearchBar />
        </div>
        <Link to='/createGame' className={style.create}>
          Crear videojuego
        </Link>
        <div className={style.barra}>
          <select
            onChange={(ev) => handleSort(ev)}
            className={style.buttonSelect}
          >
            <option value='null'>Orden alfabetico</option>
            <option value='asc-alf'>A-Z</option>
            <option value='desc-alf'>Z-A</option>
          </select>
          <select
            onChange={(ev) => filterExistance(ev.target.value)}
            className={style.buttonSelect}
          >
            <option value='null'>Todos</option>
            <option value='new-games'>Creados</option>
            <option value='old-games'>Existentes</option>
          </select>
          <select
            onChange={(ev) => sourceRating(ev.target.value)}
            className={style.buttonSelect}
          >
            <option value='null'>Orden Rating</option>
            <option value='mayorRating'>Menor Rating</option>
            <option value='menorRating'>Mayor Rating</option>
          </select>
          <select
            onChange={(ev) => selectByGenre(ev.target.value)}
            className={style.buttonSelect}
          >
            <option value='null'>Orden por Genero</option>
            {genres
              ? genres
                  .sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                  })
                  .map((ev) => {
                    return (
                      <option key={ev.id} value={ev.name}>
                        {ev.name}
                      </option>
                    );
                  })
              : []}
          </select>
        </div>
      </div>
      <Paginado
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        currentPage={currentPage}
        paginado={paginado}
      />

      <div className={style.cardContainer}>
        {currentVideogames ? (
          currentVideogames.map((elm) => {
            return (
              <Card
                Key={elm.id}
                id={elm.id}
                image={elm.image}
                name={elm.name}
                genres={elm.genres}
              />
            );
          })
        ) : (
          <div>
            <img className={style.fondito} src={fondo} alt='' />
            <img className={style.gifito} src={gif} alt='' />
            <img className={style.momia} src={momia} alt='' />
            <img className={style.momia2} src={momia} alt='' />
          </div>
        )}
      </div>
    </div>
  );
}
