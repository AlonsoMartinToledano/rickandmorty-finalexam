import React, { useContext } from "react";
import AppContext from "../AppContext";

import Character from "./Character";
import "./styles.css";

const Body = () => {
    const context = useContext(AppContext);

    let characters;
    if (context.charactersData.get) {
        characters = context.charactersData.get.map(obj => {
            return <Character image={obj.image} name={obj.name} status={obj.status} species={obj.species}
                type={obj.type} gender={obj.gender} location={obj.location.name} locationID={obj.location.id} key={obj.id}/>
        })
    }

    return (
        <div className="Body">
            {characters}
        </div>
    )
}

export default Body;