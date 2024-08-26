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

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    }
    catch (error) {
      console.error('Error fetching Pokémon details.', error)
    }
  };

  useEffect ( () => {
    const fetchPokedexCards = async () => {
      setOffset(currentPage * limit);
      setPokedexError(false);
      setStateLoading(true);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        const fetchPromises = data.results.map(pokemon => fetchPokemonDetails(pokemon.url));
        const pokemonDetails = await Promise.all(fetchPromises);
        setPokemonDisplayed(pokemonDetails);
      }
      catch (error) {
        console.error('Error fetching Pokédex data.', error);
        setPokedexError(true);
      }
      finally {
        setStateLoading(false);
      }
    }
    
    fetchPokedexCards();

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