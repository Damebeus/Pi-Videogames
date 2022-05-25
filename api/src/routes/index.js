const { Router, response } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const router = Router();
const { Videogame, Genre } = require("../db");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getInfoApi = async () => {
  {
    var infoApi = [];
    for (let i = 1; i < 6; i++) {
      var linkeado = await axios.get(
        `https://api.rawg.io/api/games?key=3b46b9239f7c420a95298d320f0d693f&page=${[
          i,
        ]}`
      );
      infoApi = infoApi.concat(linkeado.data.results);
    }
  }

  infoApi = infoApi.map((elm) => {
    return {
      id: elm.id,
      name: elm.name,
      description: elm.description, //
      released: elm.released,
      rating: elm.rating,
      platform: elm.platforms,
      genre: elm.genres.map((elm) => (elm = elm.name)),
      image: elm.background_image,
    };
  });
  return infoApi;
};

const getInfoDb = async () => {
  return await Videogame.findAll({
    include: Genre,
  });
};

const getAllInfo = async () => {
  const infoApi = await getInfoApi();

  /*   const infoDb = await getInfoDb(); */
  let infoDb = await Videogame.findAll({ include: Genre });
  infoDb = infoDb.map((elm) => {
    return {
      id: elm.id,
      name: elm.name,
      description: elm.description, //
      released: elm.released,
      rating: elm.rating,
      platform: elm.platforms,
      genre: elm.Genres.map((elm) => (elm = elm.name)),
      image: elm.image,
      createdInDb: elm.createdInDb,
    };
  });
  const infototal = infoApi.concat(infoDb);
  return infototal;
};

router.get("/", async (req, res) => {
  try {
    return res.status(200).send(await getAllInfo());
  } catch (error) {
    console.log(error);
  }
});

router.get("/videogame", async (req, res) => {
  const { name } = req.query;
  let videogamesTotal = await getAllInfo();
  if (name) {
    let videogamesName = await videogamesTotal.filter((elm) =>
      elm.name.toLowerCase().includes(name.toLowerCase())
    );
    videogamesName.length
      ? res.status(200).send(videogamesName)
      : res.status(404).send("No hay videojuegos con ese nombre");
  } else {
    res.status(200).send(videogamesTotal);
  }
});

router.get("/genres", async (req, res) => {
  const genresApi = await axios.get(
    "https://api.rawg.io/api/genres?key=3b46b9239f7c420a95298d320f0d693f"
  );
  const genres = genresApi.data.results.map((elm) => elm.name);

  const genEach = genres.map((elm) => {
    /* for (let i = 0; i < elm.length; i++) return elm[i]; */
    return { name: elm };
  });

  genEach.forEach((elm) => {
    Genre.findOrCreate({
      where: {
        name: elm.name,
      },
    });
  });
  const allGenres = await Genre.findAll();
  res.send(allGenres);
});

router.post("/videogame", async (req, res) => {
  const { name, description, released, rating, platform, genre, image } =
    req.body;

  let videogameCreated = await Videogame.create({
    name,
    description,
    released,
    rating,
    platform,
    image,
    createdInDb: true,
  });
  let genredb = await Genre.findAll({
    where: { name: genre },
  });

  videogameCreated.addGenres(genredb);

  res.send(videogameCreated);
});

router.get("/videogame/:id", async (req, res) => {
  const id = req.params.id;
  const videogamesTotal = await getAllInfo();
  let videogamesId;

  if (id.length > 20) {
    videogamesId = await Videogame.findByPk(id, {
      include: Genre,
    });

    let infoApi = {
      id: videogamesId.id,
      name: videogamesId.name,
      description: videogamesId.description, //
      released: videogamesId.released,
      rating: videogamesId.rating,
      platform: videogamesId.platform.map((elm) => elm),
      genre: videogamesId.Genres.map((e) => e.dataValues.name),
      image: videogamesId.image,
    };

    res.send(infoApi);
  } else {
    let idDescr = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=3b46b9239f7c420a95298d320f0d693f`
    );
    videogamesId = idDescr.data;

    let datita = (ev) => {
      return {
        id: ev.id,
        name: ev.name,
        description: ev.description_raw,
        released: ev.released,
        rating: ev.rating,
        platform: ev.platforms.map((elm) => elm.platform.name),
        genre: ev.genres.map((e) => e.name),
        image: ev.background_image,
      };
    };
    res.send(datita(videogamesId));
  }
});

module.exports = router;
