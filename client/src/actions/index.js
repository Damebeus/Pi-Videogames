import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}
export function getNameVideogames(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/videogame?name=${name}`
      );
      return dispatch({
        type: "GET_NAME_VIDEOGAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getGamesById(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/videogame/${id}`);
      console.log(json, "si quiere frontear");
      return dispatch({
        type: "GET_GAMES_BYID",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}
export function postVideogame(videogame) {
  return async function (dispatch) {
    const data = await axios.post("http://localhost:3001/videogame", videogame);

    return data;
  };
}
export function orderByGenre(payload) {
  return {
    type: "ORDER_BY_GENRE",
    payload: payload,
  };
}
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload: payload,
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload: payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload: payload,
  };
}
