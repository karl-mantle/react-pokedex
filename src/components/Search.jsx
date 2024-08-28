import React from 'react';

const Search = ({ setCurrentPokemon, setShowEntry, entryError }) => {

  const handleSearch = (event) => {
      event.preventDefault();
      const searchInput = event.target.elements.searchInput.value.trim();
      const sanitisedInput = searchInput.toLowerCase().replace(/^0+/, '');
      if (searchInput) {
        setCurrentPokemon(sanitisedInput);
        setShowEntry(true);
      }
  };

  return (
    <>
      <div className="search">
          <form onSubmit={handleSearch}>
            <input type="text" name="searchInput"/>
            <button type="submit">Search</button>
          </form>
      </div>

      { entryError ?  (
          <div className="error">
            <p>Please enter a valid Pokémon name or ID number.</p>
          </div>
        ) : null }

    </>
  );
};

export default Search;