import { cleanName, cleanNumber } from '../../utils/Cleaners.js';
import './card.css';
import '../types.css';

const Card = ({ subject, number, filterSource, setModalShow, setModalTarget }) => {

  if (!subject.pokemonData) {
    return null;
  }

  const handleCardClick = () => {
    setModalShow(true);
    setModalTarget(`https://pokeapi.co/api/v2/pokemon/${subject.pokemonData.id}`);
  };

  const types = subject.pokemonData.types ? subject.pokemonData.types.map(type => type.type.name) : [];

  return (
    <>
      <div className="frame" onClick={handleCardClick}>
        <div className="card">
          <div className="details">
            <div className="id">
              <span>
                { filterSource === 'pokedex' ?  cleanNumber(number) : cleanNumber(subject.pokemonData.id) }
              </span>
            </div>
            <div>
              <div className="name"><h3>{cleanName(subject.speciesData.name)}</h3></div>
              <div className="types">{types.map((type, index) => (
                <span key={index} className={`type ${type}`}>{type.toUpperCase()}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="sprite"><img src={subject.pokemonData.sprites.front_default}  alt={subject.pokemonData.name}/></div>
        </div>
      </div>
    </>
  )
}

export default Card;