import React, { useContext } from "react";
import AppContext from "../AppContext";

import "./styles.css";

const Character = props => {
    const {image, name, status, species, type, gender, location, locationID} = props;
    const context = useContext(AppContext);

    return (
        <div className="Character">
            <img className="CharacterImg" src={image} alt={name}/>
            <div><strong>Name: </strong>{name}</div>
            <div><strong>Status: </strong>{status}</div>
            <div><strong>Specie: </strong>{species}</div>
            <div><strong>Type: </strong>{type ? type : "~"}</div>
            <div><strong>Gender: </strong>{gender}</div>
            <div className="Location" onClick={() => {context.locationID.set(locationID);
                context.planetMode.set(true);}}><strong>Location: </strong>{location}</div>
        </div>
    )
}

export default Character;