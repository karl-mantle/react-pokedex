import React, { useEffect, useState } from 'react';
import PokedexCard from '../components/PokedexCard';
import '../css/pokedex.css';

const Pokedex = ({ setCurrentPokemon, globalLoading, setGlobalLoading, showEntry, setShowEntry, pokemonList }) => {
  const [pokemonDisplayed, setPokemonDisplayed] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pokedexError, setPokedexError] = useState(false);

  /* Make the amount of cards configurable */
  const limit = 12;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage => currentPage + 1);
    scrollToTop();
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage => currentPage - 1);
    }
    scrollToTop();
  };

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    }
    catch (error) {
      console.error('Error fetching Pokémon details.', error)
    }
  };

  useEffect(() => {
    const fetchPokedexCards = async () => {
      setPokedexError(false);
      setGlobalLoading(true);

      try {
        if (pokemonList && pokemonList.length > 0) {
          const start = currentPage * limit;
          const end = start + limit;
          const currentPokemonList = pokemonList.slice(start, end);
          
          const fetchPromises = currentPokemonList.map(pokemon => fetchPokemonDetails(pokemon.url));
          const pokemonDetails = await Promise.all(fetchPromises);
          setPokemonDisplayed(pokemonDetails);
        }
        else {
          console.error('Empty Pokémon list.');
          setPokedexError(true);
        }
      }
      catch (error) {
        console.error('Error fetching Pokémon list.', error);
        setPokedexError(true);
      }
      finally {
        setGlobalLoading(false);
      }
    };

    if (pokemonList.length > 0) {
      fetchPokedexCards();
    }
  }, [currentPage, pokemonList, setGlobalLoading]);

  return (
    <div>

      { pokedexError ?  (
        <div className="message-box">
          <p>An error occurred fetching Pokédex data.</p>
        </div>
      ) : null }

      <div className={`pokedex ${ pokedexError ? 'hidden' : '' }`}>
        {pokemonDisplayed.map((pokemon, index) => (
          <PokedexCard
            key={index}
            pokemon={pokemon}
            setCurrentPokemon={setCurrentPokemon}
            setShowEntry={setShowEntry}
          />
        ))}
      </div>

      <div className={`pagination${ globalLoading || pokedexError ? ' hidden' : '' }`}>
        <button className={`prev${ currentPage === 0 ? ' hidden' : '' }`} onClick={handlePreviousPage} >Prev</button>
        <button className={`next${ currentPage === 0 ? ' end' : '' }`} onClick={handleNextPage}>Next</button>
      </div>

    </div>
  )
}

export default Pokedex;