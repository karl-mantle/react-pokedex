import { useState, useEffect } from 'react';
import { cleanName, cleanNumber, cleanDescription } from '../../utils/Cleaners.js';
import EvolutionChain from '../Tabber/EvolutionChain';
import './pokemon.css';
import '../types.css';

const Pokemon = ({ setEntryLoading, modalTarget, setModalTarget, setGlobalLoading, modalShow, setModalShow, modalError, setModalError, entryLoading, onClose }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [active, setActive] = useState('firstTab');
  
  const selectTab = (tab, setActive) => {
    setActive(tab);
  };

  useEffect ( () => {
    const fetchPokemonData = async () => {
      setGlobalLoading(true);
      setEntryLoading(true);
      setModalError(false);

      try {
        const pokemonResponse = await fetch(`${modalTarget}`);
        const pokemonData = await pokemonResponse.json();
        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();
        setPokemonData(pokemonData);
        setSpeciesData(speciesData);
      }
      catch (error) {
        console.error('Error fetching Pokémon entry.', error);
        setModalError(true);
      }
      finally {
        setEntryLoading(false);
        setGlobalLoading(false);
      }
    }

    if (modalShow) {
      fetchPokemonData();
      document.body.classList.add('lock');
      selectTab('firstTab', setActive);
    }
    else {
      document.body.classList.remove('lock');
    }

  }, [modalShow, modalTarget, setGlobalLoading, setModalError, setEntryLoading]);

  if (!modalShow || !modalTarget || !pokemonData || !speciesData || modalError ) return null;

  const flavorTextEntries = speciesData.flavor_text_entries.filter(entry => entry.language.name === 'en');
  let description = flavorTextEntries.length > 0 ? flavorTextEntries[0].flavor_text : 'No description available for this Pokémon.';

  const pokemonGenera = speciesData.genera.filter(genus => genus.language.name === 'en');
  let pokemonGenus = pokemonGenera.length > 0 ? pokemonGenera[0].genus : 'Unknown Pokémon.';
  
  const stats = pokemonData.stats.map(stat => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  const types = pokemonData.types.map(type => type.type.name);

  return (
    <div className={`details${ entryLoading ? ' hidden' : ''}`}>
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