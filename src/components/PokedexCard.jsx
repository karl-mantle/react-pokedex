import React, { useEffect, useState } from 'react';
import PokedexEntry from './PokedexEntry';

const PokedexCard = ( { pokemon, stateLoading, setStateLoading } ) => {
  const [showEntry, setShowEntry] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [cardError, setCardError] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);

  function capitalise(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  function addZeros(num) {
    return num.toString().padStart(3, '0');
  }

  useEffect ( () => {
    const fetchPokedexEntry = async () => {
      setCardLoading(true);
      setCardError(false);

      try {
        const [pokemonResponse, speciesResponse] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
        ])
        const pokemonData = await pokemonResponse.json();
        const speciesData = await speciesResponse.json();
        setPokemonData(pokemonData);
        setSpeciesData(speciesData);
      }
      catch (error) {
        console.error('Error fetching Pokédex entry.', error);
        setCardError(true);
      }
      finally {
        setCardLoading(false);
      }
    }

    if (showEntry) {
      setStateLoading(true);
      fetchPokedexEntry().finally(() => setStateLoading(false));
    }

  }, [showEntry, pokemon.id, setStateLoading]);

  return (
    <>
      <div className="card" onClick={()=>{setShowEntry(true)}}>

        { cardLoading ? (<p>Loading... </p>) : null }
        
        { cardError ? (<p>Error fetching Pokédex entry.</p>) : null }

        <div className={`card-details${ cardLoading || cardError ? ' hidden' : '' }`}>
          
          <div className="pkmn-id"><span>{addZeros(pokemon.id)}</span></div>
          <div className="pkmn-sprite"><img src={pokemon.sprites.front_default}  alt={pokemon.name}/></div>
          <div className="pkmn-details">
            <div className="pkmn-name"><h3>{capitalise(pokemon.name)}</h3></div>
            <div className="pkmn-types"><p>type placeholder</p></div>
          </div>

        </div>

      </div>

      <PokedexEntry showEntry={showEntry} onClose={()=>setShowEntry(false)} pokemonData={pokemonData} speciesData={speciesData} cardError={cardError}/>
    </>
  )
}

export default PokedexCard