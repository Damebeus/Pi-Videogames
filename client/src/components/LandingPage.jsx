import React from "react";
import { Link } from "react-router-dom";
import '../styles/LandingPage.css';

export default function LandingPage() {
    return(
        <div className='background'>
           
            <h1 className="titulo">Welcome to the Migueland</h1>
            <Link to='/Home'>
            <button  className="boton">Ingresar</button>
            </Link>
        </div>
    )
} 