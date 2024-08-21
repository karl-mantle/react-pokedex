import React, { useEffect, useState } from 'react';
import PokedexEntry from './PokedexEntry';

const PokedexCard = ( { pokemon } ) => {
  const [showEntry, setShowEntry] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [cardError, setCardError] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);

  function capitalise(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  useEffect ( () => {
    if (showEntry) {
      setStateLoading(true);
      setCardError(false);
      Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
      ])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
          setPokemonData(data[0]);
          setSpeciesData(data[1]);
          setStateLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Pokédex entry.', error);
        setCardError(true);
        setStateLoading(false);
        }
      );
    }
  }, [showEntry, pokemon.id]);

  return (
    <>
      <div className="pokedex-card" onClick={()=>{setShowEntry(true)}}>

        { stateLoading ? (<p>Loading... </p>) : null }
        { cardError ? (<p>Error fetching Pokédex entry.</p>) : null }

        <div className={`pokedex-card-details ${ stateLoading || cardError ? 'hidden' : '' }`}>
            <span className="pokedex-card-title"><strong>#{pokemon.id}</strong> {capitalise(pokemon.name)}</span>
            <div><img src={pokemon.sprites.front_default}  alt={pokemon.name}/></div>
        </div>

      </div>

      <PokedexEntry showEntry={showEntry} onClose={()=>setShowEntry(false)} pokemonData={pokemonData} speciesData={speciesData} cardError={cardError}/>
    </>
  )
}

export default PokedexCard