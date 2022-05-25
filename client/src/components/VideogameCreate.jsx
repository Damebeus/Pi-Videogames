import React from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "../styles/VideogameCreate.module.css";
import axios from "axios";

const platforms = [
  { name: "PC" },
  { name: "PlayStation 5" },
  { name: "PlayStation 4" },
  { name: "Xbox One" },
  { name: "Xbox Series S/X" },
  { name: "Nintendo Switch" },
  { name: "iOS" },
  { name: "Android" },
  { name: "Nintendo 3DS" },
  { name: "Nintendo DS" },
  { name: "Nintendo DSi" },
  { name: "macOS" },
  { name: "Linux" },
  { name: "Xbox 360" },
  { name: "Xbox" },
  { name: "PlayStation 3" },
  { name: "PlayStation 2" },
  { name: "PlayStation" },
  { name: "PS Vita" },
  { name: "PSP" },
  { name: "Wii U" },
  { name: "Wii" },
  { name: "GameCube" },
  { name: "Nintendo 64" },
  { name: "Game Boy Advance" },
  { name: "Game Boy Color" },
  { name: "Game Boy" },
  { name: "SNES" },
  { name: "NES" },
  { name: "Classic Macintosh" },
  { name: "Apple II" },
  { name: "Commodore / Amiga" },
  { name: "Atari 7800" },
  { name: "Atari 5200" },
  { name: "Atari 2600" },
  { name: "Atari Flashback" },
  { name: "Atari 8-bit" },
  { name: "Atari ST" },
  { name: "Atari Lynx" },
  { name: "Atari XEGS" },
  { name: "Genesis" },
  { name: "SEGA Saturn" },
  { name: "SEGA CD" },
  { name: "SEGA 32X" },
  { name: "SEGA Master System" },
  { name: "Dreamcast" },
  { name: "3DO" },
  { name: "Jaguar" },
  { name: "Game Gear" },
  { name: "Neo Geo" },
  { name: "Web" },
];

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "El nombre es obligatorio";
  } else if (input.description.length < 30 || input.description.length > 200) {
    errors.description = "La descripción debe tener entre 30 y 200 caracteres";
  } else if (!input.description) {
    errors.description = "La descripción es obligatoria";
  } else if (!input.image) {
    errors.image = "La imagen es obligatoria";
  } else if (
    !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)
  ) {
    errors.image = "La imagen debe ser una URL valida";
  } else if (!input.genre) {
    errors.genre = "El género es obligatorio";
  } else if (!input.rating) {
    errors.rating = "El rating es obligatorio";
  } else if (
    (Number(input.rating) > 5 || Number(input.rating) < 0) &&
    input.rating
  ) {
    errors.rating = "El rating debe estar entre 0 y 5";
  } else if (!input.platform) {
    errors.platform = "La plataforma es obligatoria";
  }
  return errors;
}

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    image: "",
    platform: [],
    genre: [],
    rating: "",
  });
  function handleChange(ev) {
    ev.preventDefault();
    setInput({
      ...input,
      [ev.target.name]: ev.target.value,
    });
    setErrors(
      validate({
        ...input,
        [ev.target.name]: ev.target.value,
      })
    );
  }
  function handleSelect(ev) {
    if (platforms.find((p) => p.name === ev.target.value)) {
      if (input.platform.includes(ev.target.value)) {
        alert("la plataforma ya esta seleccionada");
      } else {
        setInput({
          ...input,
          platform: [...input.platform, ev.target.value],
        });
      }
    } else {
      if (input.genre.includes(ev.target.value)) {
        alert("El género ya está seleccionado");
      } else {
        setInput({
          ...input,
          genre: [...input.genre, ev.target.value],
        });
      }
    }
  }
  useEffect(() => {
    setErrors(
      validate({
        ...input,
      })
    );
  }, [input]);
  function handleSubmit(ev) {
    ev.preventDefault();
    if (
      input.name.length === 0 ||
      input.description.length === 0 ||
      input.rating.length === 0 ||
      input.image.length === 0 ||
      input.platform.length === 0 ||
      input.genre.length === 0
    ) {
      alert("Todos los campos son obligatorios");
    } else if (
      !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)
    ) {
      alert("La imagen debe ser una url valida");
    } else if (
      input.description.length < 30 ||
      input.description.length > 200
    ) {
      alert("La descripción debe tener al menos 30 caracteres");
    } else if (Object.keys(errors).length === 0) {
      /* dispatch(postVideogame(input)); */

      axios.post("http://localhost:3001/videogame", input);

      alert("Videojuego creado!");
      setInput({
        name: "",
        description: "",
        released: "",
        image: "",
        platform: [],
        genre: [],
        rating: "",
      });
      history.push("/home");
    }
  }

  function handleDelete(elm) {
    if (platforms.find((p) => p.name === elm)) {
      setInput({
        ...input,
        platform: input.platform.filter((e) => e !== elm),
      });
    } else {
      setInput({
        ...input,
        genre: input.genre.filter((e) => e !== elm),
      });
    }
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  //-------------return-----------------//
  return (
    <div className={style.todo}>
      <div className={style.todoContainer}>
        <Link to='/home'>
          <div className={style.buttonContainer2}>
            <span className={style.mas1}>Volver!</span>
            <button id='work' type='button' name='Hover'>
              Volver!
            </button>
          </div>
        </Link>
        <div className={style.paginado}>
          <h1 className={style.titulo}>Crea tu videojuego!</h1>
          <div className={style.paginadito}>
            <form className={style.formulario} onSubmit={handleSubmit}>
              <div>
                <label>Nombre:</label>
                <input
                  type='text'
                  value={input.name}
                  name='name'
                  onChange={(ev) => handleChange(ev)}
                />
                {errors.name && <p className={style.error}>{errors.name}</p>}
              </div>
              <div>
                <label>Descripcion:</label>
                <input
                  type='text'
                  value={input.description}
                  name='description'
                  onChange={(ev) => handleChange(ev)}
                />
                {errors.description && (
                  <p className={style.error}>{errors.description}</p>
                )}
              </div>
              <div>
                <label>Fecha de lanzamiento:</label>
                <input
                  type='date'
                  value={input.released}
                  name='released'
                  onChange={(ev) => handleChange(ev)}
                />
                {errors.released && (
                  <p className={style.error}>{errors.released}</p>
                )}
              </div>
              <div>
                <label>Imagen:</label>
                <input
                  type='text'
                  value={input.image}
                  name='image'
                  onChange={(ev) => handleChange(ev)}
                />
                {errors.image && <p className={style.error}>{errors.image}</p>}
              </div>
              <div>
                <label>Rating:</label>
                <input
                  type='number'
                  value={input.rating}
                  name='rating'
                  onChange={(ev) => handleChange(ev)}
                />
                {errors.rating && (
                  <p className={style.error}>{errors.rating}</p>
                )}
              </div>
              <div className={style.containerGenres}>
                <div>
                  <label>Genero:</label>
                  <select onChange={(ev) => handleSelect(ev)}>
                    {genres &&
                      genres.map((genre) => (
                        <option key={genre.id} name='genre' value={genre.name}>
                          {genre.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className={style.containerPlatforms}>
                <div>
                  <label>Plataformas:</label>
                  <select onChange={(ev) => handleSelect(ev)}>
                    {platforms &&
                      platforms.map((platform, id) => (
                        <option key={id} value={platform.name}>
                          {platform.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className={style.buttonContainer1}>
                <span className={style.mas}>Crear</span>
                <button
                  /*  onClick={(ev) => handleSubmit(ev)} */
                  id='work'
                  type='submit'
                  name='Hover'
                >
                  Crear
                </button>
              </div>
            </form>
            <div className={style.contActive}>
              <div className={style.activeGen}>
                {input.genre &&
                  input.genre.map((elm) => (
                    <ul onClick={() => handleDelete(elm)} name={"genres"}>
                      <li className={style.generitos}>{elm}</li>
                    </ul>
                  ))}
              </div>
              <div className={style.activePlat}>
                {input.platform &&
                  input.platform.map((elm) => (
                    <ul onClick={() => handleDelete(elm)} name={"platform"}>
                      <div>
                        <li className={style.plataformitas}>{elm}</li>
                      </div>
                    </ul>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
