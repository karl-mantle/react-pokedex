import React from "react";

const PokedexEntry = ( { showEntry, onClose, pokemonData, speciesData, searchError, cardError } ) => {

  if (!showEntry || !pokemonData || !speciesData || searchError || cardError ) return null;

  /* I could store these functions in their own file for use elsewhere? */
  function capitalise(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  function cleanParagraph(string) {
    return string.replace(/\f/g, ' ');
  }
  function addZeros(num) {
    return num.toString().padStart(3, '0');
  }

  /* The PokeAPI has multiple languages, so I could add a language option? */
  const flavorTextEntries = speciesData.flavor_text_entries.filter(entry => entry.language.name === 'en');
  let description = flavorTextEntries.length > 0 ? flavorTextEntries[0].flavor_text : 'No description available for this Pokémon.';

  const pokemonGenera = speciesData.genera.filter(genus => genus.language.name === 'en');
  let pokemonGenus = pokemonGenera.length > 0 ? pokemonGenera[0].genus : 'Unknown Pokémon.';
  
  const stats = pokemonData.stats.map(stat => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  return (
    <div className={`entry-container ${ !showEntry ? 'hidden' : '' }`}>
      <div className="entry">

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
  );
};

export default PokedexEntry;