import React, { useState } from "react";
import AppContext from "./AppContext";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

import Header from "./components/Header";
import Body from "./components/Body";
import PlanetInfo from "./components/PlanetInfo";
import Pages from "./components/Pages";
import "./components/styles.css"

const httpLink = new HttpLink ({
  uri: "https://rickandmortyapi.com/graphql/",
});

const client = new ApolloClient ({
  cache: new InMemoryCache(),
  link : httpLink,
});

function App() {
  const [locationID, setLocationID] = useState(null);
  const [charactersData, setCharactersData] = useState(null);
  const [planetMode, setPlanetMode] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(null);

  const contextData = {
    locationID: { get: locationID, set: setLocationID },
    charactersData: { get: charactersData, set: setCharactersData },
    planetMode: { get: planetMode, set: setPlanetMode },
    page: { get: page, set: setPage },
    maxPages: { get: maxPages, set: setMaxPages }
  }

  return (
    <AppContext.Provider value={contextData}>
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
          <Body />
          <Pages />
          {planetMode ? <PlanetInfo /> : null}
        </div>
      </ApolloProvider>
    </AppContext.Provider>
  );
}

export default App;
