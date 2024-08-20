import React, { useEffect, useState } from 'react';
import PokedexCard from '../components/PokedexCard';

const Pokedex = () => {
  const [pokemonDisplayed, setPokemonDisplayed] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [stateLoading, setStateLoading] = useState(true);
  /* Make the amount of cards configurable  */
  const limit = 15;

  function getPokemonDetails(url) {
    return fetch(url)
      .then((response) => response.json())
      .catch(error => console.error('Error fetching Pokémon details', error));
  };

  useEffect ( () => {
    let offset = currentPage * limit;

    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
      const fetchPromises = data.results.map(pokemon => getPokemonDetails(pokemon.url));
      return Promise.all(fetchPromises);
    })
    .then(pokemonDetails => {
      setPokemonDisplayed(pokemonDetails);
      setStateLoading(false)
    })
    .catch(error => {
      console.error("Error fetching Pokédex page", error);
    });
  }, [currentPage])
    
  const handleNextPage = () => {
    setCurrentPage(currentPage => currentPage + 1)
  }
  const handlePreviousPage = () => {
    if (currentPage > 0) {setCurrentPage(currentPage => currentPage - 1)}
  }

  return (
    <div className='pokedex-container'>

      <div className='pokedex-buttons'>
        <button className='page-button' onClick={handlePreviousPage} >Prev</button>
        <button className='page-button' onClick={handleNextPage}>Next</button>
      </div>

      { stateLoading ?  (<h2>Loading... </h2>) : null}

      <div className='pokedex-card-container'>
        {pokemonDisplayed.map((pokemon, index) => (
          <PokedexCard key={index} pokemon={pokemon}/>
        ))}
      </div>

    </div>
  )
}

export default Pokedex;