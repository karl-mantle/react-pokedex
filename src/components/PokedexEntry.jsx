import { useState, useEffect } from "react";
import { capitalise, addZeros, cleanDescription } from '../utils/TextUtils';
import Pokeball from '../svg/pokeball.svg';

const PokedexEntry = ({ currentPokemon, setGlobalLoading, showEntry, entryError, setEntryError, onClose }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [entryLoading, setEntryLoading] = useState(false);

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
    <div className={`entry-container${ !showEntry ? ' hidden' : '' }`}>
      <div className="entry">

        { entryLoading ?  (
          <div className="entry-loading">
              <div>
                <img src={Pokeball} alt="" className="pokeball"/>
              </div>
          </div>
        ) : null }

        <div className={`entry-main${ entryLoading ? ' hidden' : '' }`}>
          <div className="entry-top-row">
            <div className="pkmn-id"><span>{addZeros(pokemonData.id)}</span></div>
            <h2>{capitalise(pokemonData.name)}</h2>
            <span className="close" onClick={onClose}>&times; Close</span>
          </div>
          <div className="entry-factfile">
            <div className="pkmn-sprite"><img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="pokedex-entry-img"/></div>
            <ul>
              <li><strong>Species:</strong></li>
              <li>{pokemonGenus}</li>
              <li><strong>HT:</strong> {pokemonData.height}' <strong>WT:</strong> {pokemonData.weight} lbs</li>
              <li><strong>Type(s):</strong></li>
              <li className="types">{types.map((type, index) => (
                  <span key={index} className={`type ${type}`}>{type.toUpperCase()} </span>
                  ))}
              </li>
            </ul>
          </div>
          <div className="entry-description">
            <p>{cleanDescription(description)}</p>
          </div>
          
          <div className="entry-table">
            <table className="table-stats">
              <thead>
                <tr>
                  <th>Stat</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat, index) => (
                  <tr key={index}>
                    <td>{stat.name}</td>
                    <td>{stat.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PokedexEntry;