import React, { useEffect, useState } from 'react'
import PokedexEntry from './PokedexEntry';

const Search = () => {
  const [showEntry, setShowEntry] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect ( () => {
    /* I should put this in an async function or whatever and use await, then display the loading pokeball */
    if (showEntry && searchTerm) {
        const sanitisedInput = searchTerm.toLowerCase().replace(/^0+/, '');
        Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${sanitisedInput}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${sanitisedInput}`)
        ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
          setPokemonData(data[0]);
          setSpeciesData(data[1]);
        })
        .catch(error => console.error('Invalid Pokémon name or id', error));
        }
  }, [showEntry && searchTerm]);

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

      <PokedexEntry showEntry={showEntry} onClose={()=>setShowEntry(false)} pokemonData={pokemonData} speciesData={speciesData}/>
    </>
  );
};

export default Search;