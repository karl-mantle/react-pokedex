import { cleanName, addZeros } from '../utils/TextUtils';
import '../css/pokedex-card.css';
import '../css/types.css';

const PokedexCard = ({ pokemon, setShowEntry, setCurrentPokemon }) => {

  const types = pokemon.types.map(type => type.type.name);

  return (
    <>
      <div className="frame" onClick={()=>{ setShowEntry(true); setCurrentPokemon(pokemon.id);}}>
        <div className="card">
          <div className="details">
            <div className="id"><span>{addZeros(pokemon.id)}</span></div>
            <div>
              <div className="name"><h3>{cleanName(pokemon.name)}</h3></div>
              <div className="types">{types.map((type, index) => (
                <span key={index} className={`type ${type}`}>{type.toUpperCase()} </span>
                ))}
              </div>
            </div>
          </div>
          <div className="sprite"><img src={pokemon.sprites.front_default}  alt={pokemon.name}/></div>
        </div>
      </div>
    </>
  )
}

export default PokedexCard;