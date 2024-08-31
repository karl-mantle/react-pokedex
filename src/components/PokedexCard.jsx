import { cleanName, addZeros } from '../utils/TextUtils';

const PokedexCard = ({ pokemon, setShowEntry, setCurrentPokemon }) => {

  const types = pokemon.types.map(type => type.type.name);

  return (
    <>
      <div className="card" onClick={()=>{ setShowEntry(true); setCurrentPokemon(pokemon.id);}}>

        <div className="card-details">

          <div className="pkmn-id"><span>{addZeros(pokemon.id)}</span></div>
          <div className="pkmn-sprite"><img src={pokemon.sprites.front_default}  alt={pokemon.name}/></div>
          <div className="pkmn-details">
            <div className="pkmn-name"><h3>{cleanName(pokemon.name)}</h3></div>
            <div className="types">{types.map((type, index) => (
              <span key={index} className={`type ${type}`}>{type.toUpperCase()} </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default PokedexCard;