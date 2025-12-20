import { useState, useEffect } from 'react';
import { cleanName } from '../../utils/Cleaners';
import slugify from 'slugify';
import './search.css';

let debounceTimeout;

const Search = ({ setModalTarget, setModalShow, modalError, setModalKind, pokemonList, moveList, itemList }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [currentSearchFilter, setCurrentSearchFilter] = useState('pokemon');

  useEffect(() => {
    setCurrentList(pokemonList);
  }, [pokemonList]);

  const handleSearch = (name) => {
    const selectedEntry = currentList.find(entry => entry.name === name);
    if (selectedEntry) {
      setModalTarget(selectedEntry.url);
      setModalShow(true);
      setModalKind(currentSearchFilter);
    }
  };

  const handleSearchFilter = (filter) => {
    switch (filter) {
      case 'pokemon':
        setCurrentList(pokemonList);
        setCurrentSearchFilter(filter);
        break;
      case 'move':
        setCurrentList(moveList);
        setCurrentSearchFilter(filter);
        break;
      case 'item':
        setCurrentList(itemList);
        setCurrentSearchFilter(filter);
        break;
      default:
        setCurrentList([]);
    }
  }  

  const setSuggestion = (suggestion) => {
    const selectedEntry = currentList.find(entry => entry.name === suggestion);
    if (selectedEntry) {
      setSearchInput(suggestion);
      setFilteredList([]);
      handleSearch(suggestion);
    }
  };

  const debounceSearch = (searchTerm) => {
    clearTimeout(debounceTimeout);
    if (!searchTerm || searchTerm.length < 3) return setFilteredList([]);

    debounceTimeout = setTimeout(() => {
      setFilteredList(currentList.filter(
        entry => entry.name.includes(slugify(searchTerm))
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
          <div>
            <select onChange={(e) => handleSearchFilter(e.target.value)}>
              <option value="pokemon">Pokémon</option>
              <option value="move">Move</option>
              <option value="item">Item</option>
            </select>
            <input
              type="text"
              name="searchInput"
              value={searchInput}
              onChange={changeSearchInput}
              onKeyDown={handleKeyDown}
              placeholder="Enter a name..."
            />
          </div>
          <button type="submit">Search</button>
        </form>

        {filteredList.length > 0 ? (
          <ul className="suggestions">
            {filteredList.map((entry, index) => (
              <li className="suggestion" key={index} onClick={() => setSuggestion(entry.name)}>
                {cleanName(entry.name)}
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
