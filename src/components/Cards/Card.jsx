import { cleanName, cleanNumber } from '../../utils/Cleaners.js';
import './card.css';

const Card = ({ subject, number, filterSource, setModalShow, setModalTarget, setModalKind }) => {

  if (!subject.pokemonData) {
    return null;
  }

  const handleCardClick = () => {
    setModalTarget(`https://pokeapi.co/api/v2/pokemon/${subject.pokemonData.id}`);
    setModalKind('pokemon');
    setModalShow(true);
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
              <div className="name">
                <h3>
                  { filterSource === 'pokedex' ?  cleanName(subject.speciesData.name) : cleanName(subject.pokemonData.name) }
                </h3>
              </div>
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