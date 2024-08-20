import React, { useEffect, useState } from 'react'
import PokedexEntry from './PokedexEntry';


const PokedexCard = ( {pokemon} ) => {
  const [showEntry, setShowEntry] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);

  function capitalise(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  useEffect ( () => {
    /* I should put this in an async function or whatever and use await, then display the loading pokeball? */
    if (showEntry) {
      Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
      ])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
          setPokemonData(data[0]);
          setSpeciesData(data[1]);
      })
      .catch(error => console.error('Card fetched invalid Pokémon data or nothing', error));
    }
  }, [showEntry, pokemon.id]);

  return (
    <>
      <div className='pokedex-card' onClick={()=>{setShowEntry(true)}}>
        <div><img className='pokedex-card-img' src={pokemon.sprites.front_default}  alt={pokemon.name} /></div>
        <div className='pokedex-card-title'><strong>#{pokemon.id}</strong> {capitalise(pokemon.name)}</div>
      </div>

      <PokedexEntry showEntry={showEntry} onClose={()=>setShowEntry(false)} pokemonData={pokemonData} speciesData={speciesData}/>
    </>
  )
}

export default PokedexCard