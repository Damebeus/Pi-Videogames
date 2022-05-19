import React from "react";
import { useState} from "react";
import { useDispatch} from "react-redux";
import { getNameVideogames } from "../actions";
import "../styles/SearchBar.css";

export default function SearchBar() {
    const dispatch = useDispatch();
	const [name, setName] = useState('');

	function handleName(e) {
		dispatch(getNameVideogames(name));
		e.preventDefault();
		setName(e.target.value);
        setName('');
        
	}
	
    return (
        <div className="searchbar">
            <form onSubmit={(ev)=>handleName(ev)}>
                <input
                    type="text"
                    onChange={(ev) =>setName(ev.target.value)}
                    placeholder="Buscar videojuego"
                    value={name}
                />
                <button type="submit" >Buscar
                </button>   
            </form>
        </div>
    );
}