import React from 'react'
import videito from "../img/y2mate.com - ankara messi chiquito_1080p.mp4"
const Ankaramessi = () => {
  return (
    <div>
       <video autoPlay loop muted
       
         src={videito} type="video/mp4"
         
         style={{
              width: "100vw",
              height: "99.5vh",
         }}/>
        
        
    </div>

  )
}

export default Ankaramessi