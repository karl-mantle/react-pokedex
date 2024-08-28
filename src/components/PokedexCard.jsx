import React from 'react';

const PokedexCard = ({ pokemon, setShowEntry, setCurrentPokemon }) => {

  function capitalise(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  function addZeros(num) {
    return num.toString().padStart(3, '0');
  }

  return (
    <>
      <div className="card" onClick={()=>{ setShowEntry(true); setCurrentPokemon(pokemon.id);}}>

        <div className="card-details">

          <div className="pkmn-id"><span>{addZeros(pokemon.id)}</span></div>
          <div className="pkmn-sprite"><img src={pokemon.sprites.front_default}  alt={pokemon.name}/></div>
          <div className="pkmn-details">
            <div className="pkmn-name"><h3>{capitalise(pokemon.name)}</h3></div>
            <div className="pkmn-types"><p>type placeholder</p></div>
          </div>

        </div>

      </div>
    </>
  )
}

export default PokedexCard;