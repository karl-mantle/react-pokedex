import React from 'react';

const Search = ({ setCurrentPokemon, setShowEntry }) => {

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

{/*       { searchError ?  (
        <div className="error">
          <p>Please enter a valid Pokémon name or ID number.</p>
        </div>
      ) : null } */}

    </>
  );
};

export default Search;