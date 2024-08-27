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

  /* The PokeAPI has multiple languages, so I could add a language option? */
  const flavorTextEntries = speciesData.flavor_text_entries.filter(entry => entry.language.name === 'en');
  let description = flavorTextEntries.length > 0 ? flavorTextEntries[0].flavor_text : 'No description available for this Pokémon.';

  const stats = pokemonData.stats.map(stat => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  return (
    <div className={`entry-container ${ !showEntry ? 'hidden' : '' }`}>
      <div className="entry">

        <div className="entry-top-row">
          <h2>#{pokemonData.id} - {capitalise(pokemonData.name)}</h2>
          <span className="close" onClick={onClose}>&times; Close</span>
        </div>

        <div className="entry-factfile">
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="pokedex-entry-img"/>
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