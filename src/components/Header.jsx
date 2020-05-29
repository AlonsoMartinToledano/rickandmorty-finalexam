import React, { useState, useContext } from "react";
import AppContext from "../AppContext";
import { useQuery, gql } from "@apollo/client";

import "./styles.css";

const ALL_CHARACTERS_QUERY = gql`
    query characters($page: Int!) {
        characters( page: $page ) {
            info {
                pages
            }

            results {
                id
                image
                name
                status
                species
                type
                gender
                location {
                    id
                    name
                }
            }
        }
    }
`;

const STATUS_QUERY = gql`
    query characters($page: Int!, $status: String!) {
        characters( page: $page, filter: {status: $status} ) {
            info {
                pages
            }
            
            results {
                id
                image
                name
                status
                species
                type
                gender
                location {
                    id
                    name
                }
            }
        }
    }
`;

const SEARCH_QUERY = gql`
    query characters($page: Int!, $name: String!) {
        characters( page: $page, filter: {name: $name} ) {
            info {
                pages
            }
            
            results {
                id
                image
                name
                status
                species
                type
                gender
                location {
                    id
                    name
                }
            }
        }
    }
`;

const Header = () => {
    const context = useContext(AppContext);

    const [search, setSearch] = useState(null);
    const [status, setStatus] = useState(2);
    const [queryMode, setQueryMode] = useState(0);

    let statusAux;
    let query;
    if (queryMode === 0) {
        if (status === 0) {
            statusAux = "alive";
            query = STATUS_QUERY;
        } else if (status === 1) {
            statusAux = "dead";
            query = STATUS_QUERY;
        } else {
            statusAux = "";
            query = ALL_CHARACTERS_QUERY;
        }
    } else {
        query = SEARCH_QUERY;
    }

    const { loading, data, networkStatus } = useQuery(query, {
        variables: { page: context.page.get, name: search, status: statusAux },
        notifyOnNetworkStatusChange: true,
    });

    if (networkStatus === 4) return <div>Refetching...</div>
    if (loading) return <div>Loading...</div>

    if (data) {
        context.charactersData.set(data.characters.results);
        context.maxPages.set(data.characters.info.pages);
    }

    return (
        <div className="Header">

            <div className="StatusButtons">
                <div className={status === 0 ? "ButtonSelected" : "Button"} onClick={() => {setStatus(0); setQueryMode(0);
                    context.page.set(1); context.planetMode.set(false);}}>Alive</div>
                <div className={status === 1 ? "ButtonSelected" : "Button"} onClick={() => {setStatus(1); setQueryMode(0);
                    context.page.set(1); context.planetMode.set(false);}}>Dead</div>
                <div className={status === 2 ? "ButtonSelected" : "Button"} onClick={() => {setStatus(2); setQueryMode(0);
                    context.page.set(1); context.planetMode.set(false);}}>All</div>
            </div>

            <div className="SearchBar">
                <input id="search" className="Search" placeholder="Search a character"/>
                <span role="img" aria-label="MagnifyingGlass" className="MagnifyingGlass" onClick={() => {setSearch(document.getElementById("search").value); setQueryMode(1);
                    context.page.set(1); context.planetMode.set(false);}}>🔍</span>
            </div>
        </div>
    )
}

export default Header;