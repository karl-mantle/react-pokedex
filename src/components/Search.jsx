import React, { useEffect, useState } from 'react';
import PokedexEntry from './PokedexEntry';

const Search = ({stateLoading, setStateLoading}) => {
  const [showEntry, setShowEntry] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchError, setSearchError] = useState(false);

  useEffect ( () => {
    const fetchSearchEntry = async () => {
      setStateLoading(true);
      setSearchError(false);

      try {
        const sanitisedInput = searchTerm.toLowerCase().replace(/^0+/, '');
        const [pokemonResponse, speciesResponse] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${sanitisedInput}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${sanitisedInput}`)
        ])
        const pokemonData = await pokemonResponse.json();
        const speciesData = await speciesResponse.json();
        setPokemonData(pokemonData);
        setSpeciesData(speciesData);
      }
      catch (error) {
        console.error('Error fetching Pokémon by requested name or ID.', error);
        setSearchError(true);
      }
      finally {
        setStateLoading(false);
      }
    }

    if (showEntry && searchTerm) {
      fetchSearchEntry();
    }

  }, [showEntry, searchTerm, setStateLoading]);

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
          <input type="text" name="searchInput" className="search-bar"/>
          <button type="submit" className="btn">Search</button>
        </form>
      </div>

      { searchError ?  (<h2>Please enter a valid Pokémon name or number.</h2>) : null }
{/*       { stateLoading ?  (<h2>Loading... </h2>) : null } */}

      <PokedexEntry showEntry={showEntry} onClose={()=>setShowEntry(false)} pokemonData={pokemonData} speciesData={speciesData} searchError={searchError}/>
    </>
  );
};

export default Search;