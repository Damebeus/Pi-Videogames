import React from "react";
import { Link } from "react-router-dom";
import "../styles/Card.css"
export default function Card({image, name, genres, id, rating}) {
    return(
        <div className="cards">
            
            <Link to={`/videogame/${id}`}>
                <div className="name">
                 <h3>{name}</h3>
                </div>
                    <div className="imagen">
                    <img src={image} alt="img not found" width="209px" height="210px"/>
                    </div>
                <div className='rating'>
					<h3><div className='rating'>{rating}</div></h3>
				</div>
                         <div className="genres">
                         <h5>{genres}</h5>
                         </div>
             
            </Link>
            
        </div>
    );
}

