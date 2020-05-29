import React, { useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./styles.css";

const LOCATION_QUERY = gql`
    query location($locationID: ID!) {
        location( id: $locationID ) {
            name
            dimension
        }
    }
`;

const PlanetInfo = () => {
    const context = useContext(AppContext);

    const { loading, error, data, networkStatus } = useQuery(LOCATION_QUERY, {
        variables: { locationID: context.locationID.get },
        notifyOnNetworkStatusChange: true,
    });

    if (networkStatus === 4) return <div>Refetching...</div>
    if (loading) return <div>Loading...</div>

    return (
        <div className="PlanetInfo">
            <div className="X" onClick={() => context.planetMode.set(false)}>X</div>
            <div><strong>Planet Info</strong></div>
            <div><strong>Name: </strong>{!error ? data.location.name : "Unknown"}</div>
            <div><strong>Dimension: </strong>{!error ? data.location.dimension : "Unknown"}</div>
        </div>
    )
}

export default PlanetInfo;