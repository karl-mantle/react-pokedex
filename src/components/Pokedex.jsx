import React, { useEffect, useState } from 'react';
import PokedexCard from '../components/PokedexCard';

const Pokedex = () => {
  const [pokemonDisplayed, setPokemonDisplayed] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [stateLoading, setStateLoading] = useState(false);
  const [pokedexError, setPokedexError] = useState(false);
  const [offset, setOffset] = useState(0);

  /* Make the amount of cards configurable  */
  const limit = 15;

  /* I don't think I need a user error message here. */
  function getPokemonDetails(url) {
    return fetch(url)
      .then((response) => response.json())
      .catch(error => console.error('Error fetching Pokémon details.', error));
  };

  useEffect ( () => {
    setOffset(currentPage * limit);
    setPokedexError(false);
    setStateLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      const fetchPromises = data.results.map(pokemon => getPokemonDetails(pokemon.url));
      return Promise.all(fetchPromises);
    })
    .then(pokemonDetails => {
      setPokemonDisplayed(pokemonDetails);
      setStateLoading(false);
    })
    .catch(error => {
      console.error('Error fetching Pokédex data.', error);
      setPokedexError(true);
      setStateLoading(false);
    });
  }, [offset, currentPage])
    
  const handleNextPage = () => {
    setCurrentPage(currentPage => currentPage + 1)
  }
  const handlePreviousPage = () => {
    if (currentPage > 0) {setCurrentPage(currentPage => currentPage - 1)}
  }

  return (
    <div className="pokedex-container">
      
      { stateLoading ?  (<h2>Loading... </h2>) : null }
      { pokedexError ?  (<h2>Error fetching Pokédex data.</h2>) : null }

      <div className={`pokedex-buttons ${ stateLoading || pokedexError ? 'hidden' : '' }`}>
        <button className={`page-button ${ offset === 0 ? 'hidden' : '' }`} onClick={handlePreviousPage} >Prev</button>
        <button className="page-button" onClick={handleNextPage}>Next</button>
      </div>

      <div className={`pokedex-card-container ${ pokedexError ? 'hidden' : '' }`}>
        {pokemonDisplayed.map((pokemon, index) => (
          <PokedexCard key={index} pokemon={pokemon}/>
        ))}
      </div>

    </div>
  )
}

export default Pokedex;