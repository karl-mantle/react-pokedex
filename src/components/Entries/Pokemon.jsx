import { useState } from 'react';
import { cleanName, cleanNumber, cleanDescription } from '../../utils/Cleaners.js';
import Accordion from '../Accordion/Accordion';
import Stats from '../Accordion/Stats';
import EvolutionChain from '../Accordion/EvolutionChain';
import OtherForms from '../Accordion/OtherForms';
import PossibleMoves from '../Accordion/PossibleMoves';
import Sparkles from '../../assets/svg/sparkles.svg';
import './entries.css';

const Pokemon = ({ primaryData, speciesData, modalTarget, setModalTarget, setGlobalLoading, setModalShow, setModalKind, onClose }) => {
  // primaryData = pokemonData for the purposes of this entry.
  const [showShiny, setShowShiny] = useState(false);
  
  if (!speciesData || !primaryData) {
    return null
  }

  const flavorTextEntries = speciesData.flavor_text_entries ? speciesData.flavor_text_entries.filter(entry => entry.language.name === 'en') : [];
  let description = flavorTextEntries.length > 0 ? flavorTextEntries[0].flavor_text : 'No description available for this Pokémon.';

  const pokemonGenera = speciesData.genera ? speciesData.genera.filter(genus => genus.language.name === 'en') : [];
  let pokemonGenus = pokemonGenera.length > 0 ? pokemonGenera[0].genus : 'Unknown Pokémon.';

  const types = primaryData.types ? primaryData.types.map(type => type.type.name) : [];
  
  const accordionDrawers = [
    { title: 'Base Stats', component: <Stats pokemonData={primaryData}/> },
    { title: 'Evolution Chain', component: <EvolutionChain speciesData={speciesData} setGlobalLoading={setGlobalLoading} setModalTarget={setModalTarget} setModalShow={setModalShow} setModalKind={setModalKind}/>  },
    { title: 'Other Forms', component: <OtherForms speciesData={speciesData} setGlobalLoading={setGlobalLoading} modalTarget={modalTarget} setModalTarget={setModalTarget} setModalShow={setModalShow} setModalKind={setModalKind}/>  },
    { title: 'Possible Moves', component: <PossibleMoves pokemonData={primaryData} setGlobalLoading={setGlobalLoading} setModalTarget={setModalTarget} setModalShow={setModalShow} setModalKind={setModalKind}/> }
  ];

  const handleShiny = (event) => {
    event.preventDefault();
    console.log('Switch to shiny sprite');
    if (showShiny === true) {
      setShowShiny(false);
    }
    else {
      setShowShiny(true);
    }
  };

  return (
    <div className="details">

      <div className="top-row">
        <div className="id"><span>{cleanNumber(primaryData.id)}</span></div>
        <div className="name"><h2>{cleanName(primaryData.name)}</h2></div>
        <div className="close" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      
      <div className="fact-file pokemon">
        <div className="sprites">
          <div className="sprite"><img src={ showShiny === true ? primaryData.sprites.front_shiny : primaryData.sprites.front_default } alt={primaryData.name}/></div>
          <div className={`shiny${showShiny === true ? ' active' : ''}`} onClick={(e) => handleShiny(e)}><img src={Sparkles} alt=""/>View shiny</div>
        </div>
        <ul>
          <li><strong>Species:</strong></li>
          <li>{pokemonGenus}</li>
          <li><strong>HT:</strong> {primaryData.height}' <strong>WT:</strong> {primaryData.weight} lbs</li>
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