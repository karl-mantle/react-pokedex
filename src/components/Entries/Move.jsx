import { useState } from 'react';
import { cleanName, cleanNumber, cleanDescription } from '../../utils/Cleaners.js';
import EvolutionChain from '../Tabber/EvolutionChain';
import './entries.css';
import '../types.css';

const Pokemon = ({ primaryData, speciesData, setModalTarget, setGlobalLoading, setModalShow, entryLoading, onClose }) => {
  const [active, setActive] = useState('firstTab');
  
  const selectTab = (tab, setActive) => {
    setActive(tab);
  };

  const flavorTextEntries = speciesData.flavor_text_entries.filter(entry => entry.language.name === 'en');
  let description = flavorTextEntries.length > 0 ? flavorTextEntries[0].flavor_text : 'No description available for this Pokémon.';

  const pokemonGenera = speciesData.genera.filter(genus => genus.language.name === 'en');
  let pokemonGenus = pokemonGenera.length > 0 ? pokemonGenera[0].genus : 'Unknown Pokémon.';
  
  const stats = primaryData.stats.map(stat => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  const types = primaryData.types.map(type => type.type.name);

  return (
    <div className={`details${ entryLoading ? ' hidden' : ''}`}>
      <div className="top-row">
        <div className="id"><span>{cleanNumber(primaryData.id)}</span></div>
        <div className="name"><h2>{cleanName(primaryData.name)}</h2></div>
        <div className="close" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      
      <div className="fact-file">
        <div className="sprite"><img src={primaryData.sprites.front_default} alt={primaryData.name}/></div>
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

      <div className="tabber">
        <button className={`${active === 'firstTab' ? 'active' : ''}`} onClick={() => selectTab('firstTab', setActive)}>Stats</button>
        <button className={`${active === 'secondTab' ? 'active' : ''}`} onClick={() => selectTab('secondTab', setActive)}>Evolution</button>
        <button className={`${active === 'thirdTab' ? 'active' : ''}`} onClick={() => selectTab('thirdTab', setActive)}>Moves</button>
      </div>

      <div className="frame tab">
        <div id="firstTab" className={`stats ${active === 'firstTab' ? '' : 'hidden'}`}>
          <table>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat, index) => (
                <tr key={index}>
                  <td>{cleanName(stat.name)}</td>
                  <td>{stat.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="secondTab" className={`${active === 'secondTab' ? '' : 'hidden'}`}>
          <EvolutionChain active={active} speciesData={speciesData} setGlobalLoading={setGlobalLoading} setModalTarget={setModalTarget} setModalShow={setModalShow}/>
        </div>
        <div id="thirdTab" className={`${active === 'thirdTab' ? '' : 'hidden'}`}>
          Moves placeholder.
        </div>
      </div>
    </div>
  );
};

export default Pokemon;