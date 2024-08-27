import React, { useEffect, useState } from 'react';
import PokedexCard from '../components/PokedexCard';

const Pokedex = ({ stateLoading, setStateLoading }) => {
  const [pokemonDisplayed, setPokemonDisplayed] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
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

  }, [offset, currentPage, setStateLoading])
    
  const handleNextPage = () => {
    setCurrentPage(currentPage => currentPage + 1)
  }
  const handlePreviousPage = () => {
    if (currentPage > 0) {setCurrentPage(currentPage => currentPage - 1)}
  }

  return (
    <div>

      { pokedexError ?  (
        <div className="pokedex-error">
          <p>Sorry, there was an issue fetching the Pokédex!</p>
        </div>
      ) : null }

      <div className={`pagination ${ stateLoading || pokedexError ? 'hidden' : '' }`}>
        <button className={`prev ${ offset === 0 ? 'hidden' : '' }`} onClick={handlePreviousPage} >Prev</button>
        <button className={`next ${ offset === 0 ? 'end' : '' }`} onClick={handleNextPage}>Next</button>
      </div>

      <div className={`pokedex ${ pokedexError ? 'hidden' : '' }`}>
        {pokemonDisplayed.map((pokemon, index) => (
          <PokedexCard key={index} pokemon={pokemon} setStateLoading={setStateLoading} stateLoading={stateLoading}/>
        ))}
      </div>

    </div>
  )
}

export default Pokedex;