import { useState } from 'react';
import './search.css';

let debounceTimeout;

const Search = ({ setModalTarget, setModalShow, modalError, pokemonList }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const handleSearch = (name) => {
    const selectedPokemon = pokemonList.find(pokemon => pokemon.name === name);
    if (selectedPokemon) {
      setModalTarget(selectedPokemon.name);
      setModalShow(true);
    }
  };  

  const setSuggestion = (suggestion) => {
    const selectedPokemon = pokemonList.find(pokemon => pokemon.name === suggestion);
    if (selectedPokemon) {
      setSearchInput(suggestion);
      setFilteredList([]);
      handleSearch(suggestion);
    }
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
      <div className="frame search">
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

      { modalError ?  (
          <div className="message-box">
            <p>Please enter a valid Pokémon name or ID number.</p>
          </div>
        ) : null }
    </>
  );
};

export default Search;