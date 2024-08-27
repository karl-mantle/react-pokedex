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
      <div className="search">
          <form onSubmit={handleSearch}>
            <input type="text" name="searchInput"/>
            <button type="submit">Search</button>
          </form>
      </div>

      { searchError ?  (
        <div className="search-error">
          <p>Sorry, but that Pokémon name or number was not recognised.</p>
        </div>
      ) : null }

      <PokedexEntry showEntry={showEntry} onClose={()=>setShowEntry(false)} pokemonData={pokemonData} speciesData={speciesData} searchError={searchError}/>
    </>
  );
};

export default Search;