import React, { useEffect, useState } from 'react';
import PokedexEntry from './PokedexEntry';

const Search = () => {
  const [showEntry, setShowEntry] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchError, setSearchError] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);

  useEffect ( () => {
    if (showEntry && searchTerm) {
      setStateLoading(true);
      setSearchError(false);
      const sanitisedInput = searchTerm.toLowerCase().replace(/^0+/, '');
      Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${sanitisedInput}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${sanitisedInput}`)
      ])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        setPokemonData(data[0]);
        setSpeciesData(data[1]);
        setStateLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Pokémon by requested name or ID.', error);
        setSearchError(true);
        setStateLoading(false);
        }
      );
    }
  }, [showEntry, searchTerm]);

  const handleSearch = (event) => {
      event.preventDefault();
      const searchInput = event.target.elements.searchInput.value.trim();
      if (searchInput) {
        setSearchTerm(searchInput);
        setShowEntry(true);
      }
  };

  return (
    <>
      <div className="search-container">
        <form onSubmit={handleSearch} >
          <input type="text" name="searchInput"/>
          <button type="submit">Search</button>
        </form>
      </div>

      { searchError ?  (<h2>Please enter a valid Pokémon name or number.</h2>) : null }
      { stateLoading ?  (<h2>Loading... </h2>) : null }

      <PokedexEntry showEntry={showEntry} onClose={()=>setShowEntry(false)} pokemonData={pokemonData} speciesData={speciesData} searchError={searchError}/>
    </>
  );
};

export default Search;