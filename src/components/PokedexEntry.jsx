import React, { useState, useEffect } from "react";
import Pokeball from '../svg/pokeball.svg';

const PokedexEntry = ({ currentPokemon, setGlobalLoading, showEntry, onClose }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [entryError, setEntryError] = useState(false);
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

  }, [showEntry, currentPokemon, setGlobalLoading, setPokemonData, setSpeciesData]);

  if (!showEntry || !currentPokemon || !pokemonData || !speciesData ) return null;

  function capitalise(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  function cleanParagraph(string) {
    return string.replace(/\f/g, ' ');
  }
  function addZeros(num) {
    return num.toString().padStart(3, '0');
  }

  const flavorTextEntries = speciesData.flavor_text_entries.filter(entry => entry.language.name === 'en');
  let description = flavorTextEntries.length > 0 ? flavorTextEntries[0].flavor_text : 'No description available for this Pokémon.';

  const pokemonGenera = speciesData.genera.filter(genus => genus.language.name === 'en');
  let pokemonGenus = pokemonGenera.length > 0 ? pokemonGenera[0].genus : 'Unknown Pokémon.';
  
  const stats = pokemonData.stats.map(stat => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  return (
    <div className={`entry-container${ !showEntry ? ' hidden' : '' }`}>
      <div className="entry">

        { entryError ?  (
          <div className="error">
            <p>There was a problem fetching the Pokémon entry.</p>
          </div>
        ) : null }

        { entryLoading ?  (
          <div className="entry-loading">
              <div>
                <img src={Pokeball} alt="" className="pokeball"/>
              </div>
          </div>
        ) : null }

        <div className={`${ entryError || entryLoading ? ' hidden' : '' }`}>
          <div className="entry-top-row">
            <div className="pkmn-id"><span>{addZeros(pokemonData.id)}</span></div>
            <h2>{capitalise(pokemonData.name)}</h2>
            <span className="close" onClick={onClose}>&times; Close</span>
          </div>
          <div className="entry-factfile">
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="pokedex-entry-img"/>
            <ul>
              <li><strong>Species:</strong></li>
              <li>{pokemonGenus}</li>
              <li><strong>HT:</strong> {pokemonData.height}' <strong>WT:</strong> {pokemonData.weight} lbs</li>
              <li><strong>Type(s):</strong></li>
              <li>types placeholder</li>
            </ul>
          </div>
          <div className="entry-description">
            <p>{cleanParagraph(description)}</p>
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