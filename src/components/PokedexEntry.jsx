import { useState, useEffect } from "react";
import { cleanName, addZeros, cleanDescription } from '../utils/TextUtils';
import Pokeball from '../svg/pokeball.svg';
import '../css/pokedex-entry.css';
import '../css/types.css';

const PokedexEntry = ({ currentPokemon, setGlobalLoading, showEntry, entryError, setEntryError, onClose }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [entryLoading, setEntryLoading] = useState(false);
  const [active, setActive] = useState('first');
  
  const selectTab = (tab, setActive) => {
    setActive(tab);
  };

  useEffect ( () => {
    const fetchPokedexEntry = async () => {
      setGlobalLoading(true);
      setEntryLoading(true);
      setEntryError(false);

      try {
        const [pokemonResponse, speciesResponse] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${currentPokemon}`)
        ])
        const pokemonData = await pokemonResponse.json();
        const speciesData = await speciesResponse.json();
        setPokemonData(pokemonData);
        setSpeciesData(speciesData);
      }
      catch (error) {
        console.error('Error fetching Pokédex entry.', error);
        setEntryError(true);
      }
      finally {
        setEntryLoading(false);
        setGlobalLoading(false);
      }
    }

    if (showEntry) {
      fetchPokedexEntry().finally(() => setGlobalLoading(false));
      selectTab('first', setActive);
    }

  }, [showEntry, currentPokemon, setGlobalLoading, setPokemonData, setSpeciesData, setEntryError]);

  if (!showEntry || !currentPokemon || !pokemonData || !speciesData || entryError ) return null;

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
    <div className={`modal${ !showEntry ? ' hidden' : ''}`}>
      <div className="background"></div>
      <div className="frame entry">

        { entryLoading ?  (
          <div className="loading">
            <img src={Pokeball} alt="" className="pokeball"/>
          </div>
        ) : null }

        <div className={`${ entryLoading ? ' hidden' : ''}`}>
          <div className="top-row">
            <div className="id"><span>{addZeros(pokemonData.id)}</span></div>
            <div className="name"><h2>{cleanName(pokemonData.name)}</h2></div>
            <div className="close" onClick={onClose}>&times; Close</div>
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
            <button className={`${active === 'first' ? 'active' : ''}`} onClick={() => selectTab('first', setActive)}>Stats</button>
            <button className={`${active === 'second' ? 'active' : ''}`} onClick={() => selectTab('second', setActive)}>Evolution</button>
            <button className={`${active === 'third' ? 'active' : ''}`} onClick={() => selectTab('third', setActive)}>Moves</button>
          </div>

          <div className="frame tab">
            <div id="first" className={`stats ${active === 'first' ? '' : 'hidden'}`}>
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
            <div id="second" className={`${active === 'second' ? '' : 'hidden'}`}>
              Evolution chain placeholder.
            </div>
            <div id="third" className={`${active === 'third' ? '' : 'hidden'}`}>
              Moves placeholder.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokedexEntry;