import { cleanName, cleanNumber, cleanDescription } from '../../utils/Cleaners.js';
import Accordion from '../Accordion/Accordion';
import Stats from '../Accordion/Stats';
import EvolutionChain from '../Accordion/EvolutionChain';
import Moves from '../Accordion/Moves';
import './entries.css';
import '../types.css';

const Pokemon = ({ pokemonData, speciesData, setModalTarget, setGlobalLoading, setModalShow, onClose }) => {
  
  if (!speciesData || !pokemonData) {
    return null
  }

  const flavorTextEntries = speciesData.flavor_text_entries ? speciesData.flavor_text_entries.filter(entry => entry.language.name === 'en') : [];
  let description = flavorTextEntries.length > 0 ? flavorTextEntries[0].flavor_text : 'No description available for this Pokémon.';

  const pokemonGenera = speciesData.genera ? speciesData.genera.filter(genus => genus.language.name === 'en') : [];
  let pokemonGenus = pokemonGenera.length > 0 ? pokemonGenera[0].genus : 'Unknown Pokémon.';

  const types = pokemonData.types ? pokemonData.types.map(type => type.type.name) : [];
  
  const accordionDrawers = [
    { title: 'Stats', component: <Stats pokemonData={pokemonData}/> },
    { title: 'Evolution Chain', component: <EvolutionChain speciesData={speciesData} setGlobalLoading={setGlobalLoading} setModalTarget={setModalTarget} setModalShow={setModalShow}/>  },
    { title: 'Moves', component: <Moves /> }
  ];

  return (
    <div className="details">

      <div className="top-row">
        <div className="id"><span>{cleanNumber(pokemonData.id)}</span></div>
        <div className="name"><h2>{cleanName(pokemonData.name)}</h2></div>
        <div className="close" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      
      <div className="fact-file">
        <div className="sprite"><img src={pokemonData.sprites.front_default} alt={pokemonData.name}/></div>
        <ul>
          <li><strong>Species:</strong></li>
          <li>{pokemonGenus}</li>
          <li><strong>HT:</strong> {pokemonData.height}' <strong>WT:</strong> {pokemonData.weight} lbs</li>
          <li><strong>Type(s):</strong></li>
          <li className="types">{types.map((type, index) => (
              <span key={index} className={`type ${type}`}>{type.toUpperCase()}</span>
              ))}
          </li>
        </ul>
      </div>

      <div className="message-box">
        <p>{cleanDescription(description)}</p>
      </div>

      <Accordion drawers={accordionDrawers} />

    </div>
  );
};

export default Pokemon;