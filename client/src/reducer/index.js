const initialState = {
  videogames: [],
  allGames: [],
  genres: [],
  detailGame: [],
  genData: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc-alf"
          ? state.videogames.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: sortedArr,
      };
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload ? action.payload : { error: "No data" },
        allGames: action.payload ? action.payload : { error: "No data" },
      };
    case "GET_NAME_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_GAMES_BYID":
      return {
        ...state,
        detailGame: action.payload,
      };

    case "FILTER_CREATED":
      state.videogames = state.allGames;
      let createGames = state.videogames;
      createGames.forEach((elm) => console.log(elm));

      if (action.payload === "null") {
        createGames = state.videogames;
      }
      if (action.payload === "new-games") {
        createGames = state.videogames.filter(
          (elm) => elm.createdInDb === true
        );
      }
      if (action.payload === "old-games") {
        createGames = state.videogames.filter((elm) => !elm.createdInDb);
      }
      return {
        ...state,
        videogames: createGames,
      };
    case "POST_VIDEOGAMES":
      return {
        ...state,
      };

    case "ORDER_BY_GENRE":
      state.videogames = state.allGames;
      let videogamesByGenre = state.videogames;
      if (action.payload === "null") {
        videogamesByGenre = state.allGames;
      } else {
        videogamesByGenre = state.allGames.filter((elm) =>
          elm.genre.includes(action.payload)
        );
      }
      return {
        ...state,
        videogames: videogamesByGenre,
      };

    case "ORDER_BY_RATING":
      let sortedArr2 =
        action.payload === "mayorRating"
          ? state.videogames.sort((a, b) => {
              if (a.rating < b.rating) {
                return -1;
              }
              if (a.rating > b.rating) {
                return 1;
              }
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.rating > b.rating) {
                return -1;
              }
              if (a.rating < b.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogames: [...sortedArr2],
      };
    default:
      return state;
  }
}

export default rootReducer;
