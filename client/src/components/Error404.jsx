import React from 'react'
import "../styles/Error404.css"
import { Link } from "react-router-dom";
const Error404 = () => {
  return (

    <div className='body'>
      <Link to = "/home">
      <button className='button'>Volver al menu</button>
      </Link>
      
      

    </div>
  )
}

export default Error404