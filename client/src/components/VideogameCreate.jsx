import React from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogame,getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "../styles/VideogameCreate.css";

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "El nombre es obligatorio";
    }
    else if(!input.description){
        errors.description = "La descripción es obligatoria";
    }
    else if(!input.genre){
        errors.genre = "El género es obligatorio";
    }
    else if(!input.platform){
        errors.platform = "La plataforma es obligatoria";
    }
    else if(!input.image){
        errors.image = "La imagen es obligatoria";
    }
    return errors;

}



export default function VideogameCreate(){
    const dispatch = useDispatch();
    const genres= useSelector((state) => state.genres);
    const history = useHistory();
    const[errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        image: "",
        platform: "",
       
       
    });
    function handleChange(ev) {
        ev.preventDefault();
        setInput({
            ...input,
            [ev.target.name]: ev.target.value,
        });
        setErrors(validate({
             ...input,
            [ev.target.name]: ev.target.value,
        }));
    
    } 
    function handleSelect(ev) {
       setInput({
           ...input,
           genre: [...input.genre, ev.target.value],
           });
    }
    function handleSubmit(ev) {
        ev.preventDefault();
        console.log(input);
        dispatch(postVideogame(input));
        alert("Videojuego creado!");
        setInput({
            name: "",
            description: "",
            released: "",
            image: "",
            platform: "",
            genre: [],
        })
        history.push("/home");
    }
    function handleDelete(elm){
        setInput({
            ...input,
            genre: input.genre.filter((e) => e !== elm)
        })
    }

useEffect(() => {
    dispatch(getGenres());
}, [dispatch]);
return (
    <div>
        <Link to="/home"><button>Volver</button></Link>
        <h1 className="titulo">Crea tu videojuego!</h1>
       <form onSubmit={(ev)=> handleSubmit(ev)}>
           <div>
                <label>Nombre:</label>
                <input
                 type="text" 
                 value={input.name}
                 name="name"
                 onChange={(ev)=>handleChange(ev)}
                 />
                 {errors.name && (
                 <p className="error">{errors.name}</p>)}
           </div>
              <div>
                <label>Descripcion:</label>
                <input
                    type="text"
                    value={input.description}
                    name="description" 
                    onChange={(ev)=>handleChange(ev)}/>
                     {errors.description && (
                 <p className="error">{errors.description}</p>)}
            </div>
            <div>
                <label>Fecha de lanzamiento:</label>
                <input
                    type="date"
                    value={input.released}
                    name="released"
                    onChange={(ev)=>handleChange(ev)}/>
                     {errors.released && (
                 <p className="error">{errors.released}</p>)}
            </div>
            <div>
                <label>Imagen:</label>
                <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={(ev)=>handleChange(ev)}/>
                     {errors.image && (
                 <p className="error">{errors.image}</p>)}
            </div>
            <div>
                <label>Genero:</label>
                <select  onChange={(ev)=> handleSelect(ev)}>
                        {genres && genres.map((genre) => (
                        <option key={genre.id} value={genre.name}>
                            {genre.name}
                       
         
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Plataforma:</label>
                <input
                    type="text"
                    value={input.platform}
                    name="platform"
                    onChange={(ev)=>handleChange(ev)}/>
                     {errors.platform && (
                 <p className="error">{errors.platform}</p>)}
            </div>
            <button type="submit">Crear</button>

            </form>
            {input.genre && input.genre.map(elm =>
                <div className="genre">
                    <p>{elm}</p>
                    <button className="botonX" onClick={()=>handleDelete(elm)}>x</button>
                </div>
            )}
    </div>
);
}




    