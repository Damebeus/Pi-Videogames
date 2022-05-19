import React from "react";
import { useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { filterCreated,
         getVideogames,
        orderByGenre, 
        orderByName,
        getGenres,
        orderByRating,
            
    } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import "../styles/Home.css";
import SearchBar from "./SearchBar";

export default function Home() {
    const genres = useSelector((state) => state.genres);
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const [order, setOrder] = useState("null");
    const [existanceOrder, setExistanceOrder] = useState("null");
    const[currentPage, setCurrentPage] = useState(1);
    const[videogamesPerPage, setVideogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

    const paginado = (pageNumber) => setCurrentPage(pageNumber);


    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
},[dispatch])

    function sourceRating(ev){

        dispatch(orderByRating(ev));
        setOrder("Rating");
    }
    function selectByGenre(ev){
        setOrder(ev)
        dispatch(orderByGenre(ev));
        setCurrentPage(1);

    }
    function filterExistance(ev){
        setExistanceOrder(ev)
        dispatch(filterCreated(ev));
        setCurrentPage(1);
    }



function handleSort(ev){
    ev.preventDefault();
    dispatch(orderByName(ev.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${ev.target.value}`)
}
    return (
        <div >
             <SearchBar/>
            <h1 className="titulo">Videojuegos API</h1>
            <Link to="/createGame" className="create">Crear videojuego</Link>
        
            <div className="barra">
                <select onChange ={ev => handleSort(ev)}
                className='buttonSelect'>
                <option value='null'>Orden alfabetico</option>
                    <option value="asc-alf">A-Z</option>
                    <option value="desc-alf">Z-A</option>
                </select>
                <select onChange={(ev) =>filterExistance(ev.target.value) }
                className='buttonSelect' >
                    <option value="null">Todos</option>
                    <option value="new-games">Creados</option> 
                    <option value="old-games">Existentes</option>
                </select>
                <select
                onChange={(ev)=>sourceRating(ev.target.value) }
                className="buttonSelect">
                    <option value='null'>Orden Rating</option>
                    <option value="mayorRating">Mayor Rating</option>
                    <option value="menorRating">Menor Rating</option>
                </select>
                <select onChange={(ev)=>selectByGenre(ev.target.value)}
                className='buttonSelect'>
                    <option value="null">Orden por Genero</option>
                    {genres 
                    ?genres
                            .sort((a,b)=>{
                                if (a.name > b.name) return 1;
                                if (a.name < b.name) return -1;
                                return 0;
                            })
                            .map((ev)=>{
                                return(
                                    <option key={ev.id} value={ev.name}>{ev.name}</option>

                                )

                            })
                            :[]}
                </select>
                </div>
                <Paginado
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    paginado={paginado}
                />
               

                
           
              <div className="card-container">
                         {currentVideogames.map(elm => {
                                return <Card Key={elm.id}id={elm.id} image={elm.img ? elm.img : elm.image} name={elm.name} genres={elm.genres}/>

                         })}
                  
               </div>   
                
                  
                
    
        </div>
    )
}
