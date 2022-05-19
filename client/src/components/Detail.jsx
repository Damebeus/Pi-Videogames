import React, {useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'
/* import { useParams } from 'react-router'; */
import { getGamesById } from '../actions'
import {Link} from 'react-router-dom'

export default function Detail(data){
    const {id} = data.match.params;
    const dispatch = useDispatch();
    const videogame = useSelector((state) => state.detailGame);

    useEffect(() => {
        dispatch(getGamesById(id))
    }, [])
  

    return(
        videogame.name ?

        <div className="container">
            <div className="detail">
                <div>
                    <img className='img'
                        src={videogame.img}
                        width="500px"
                        height="350px"
                        alt={"game"}
                    />
                </div>
                <div className="detail-info">
                <h3>{videogame.name}</h3>
                <p>Released: {videogame.released}</p>
                <p>Platform: {videogame.platform}</p>
                <p>Genre: {videogame.genres}</p> 
                <p>Description: {videogame.description}</p>
                <p>Rating: {videogame.rating}</p>
                </div>
            </div>
            <Link to="/home">
            <button>Volver</button>
            </Link>   
        </div>
        : <h1>Loading...</h1>
    )
            
}

        
    