import { useState } from 'react';
import '../css/search.css';

let debounceTimeout;

const Search = ({ setCurrentPokemon, setShowEntry, showEntry, entryError, pokemonList }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const handleSearch = (query) => {
    const sanitisedInput = query.toLowerCase().replace(/^0+/, '');
    if (sanitisedInput) {
      setCurrentPokemon(sanitisedInput);
      setShowEntry(true);
    }
  };

  const setSuggestion = (suggestion) => {
    setSearchInput(suggestion);
    setFilteredList([]);
    handleSearch(suggestion);
  };

  const debounceSearch = (searchTerm) => {
    clearTimeout(debounceTimeout);
    if (!searchTerm || searchTerm.length < 3) return setFilteredList([]);

    debounceTimeout = setTimeout(() => {
      console.log(searchTerm);
      setFilteredList(pokemonList.filter(
        pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 3));
    }, 500);
  };

  const changeSearchInput = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    debounceSearch(input);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch(searchInput);
    }
    else if (event.key === 'Tab' && filteredList.length > 0) {
      event.preventDefault();
      setSearchInput(filteredList[0].name);
      setFilteredList([]);
    }
  };

  return (
    <>
      <div className="search">
      {/* <div className={`search${ showEntry ? ' hidden' : '' }`}> */}
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchInput); }}>
          <input
            type="text"
            name="searchInput"
            value={searchInput}
            onChange={changeSearchInput}
            onKeyDown={handleKeyDown}
            placeholder="Enter a Pokémon name"
          />
          <button type="submit">Search</button>
        </form>

        {filteredList.length > 0 ? (
          <ul className="suggestions">
            {filteredList.map((pokemon, index) => (
              <li className="suggestion" key={index} onClick={() => setSuggestion(pokemon.name)}>
                {pokemon.name}
              </li>
            ))}
          </ul>
        ) : null}
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