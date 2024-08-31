import { useEffect, useState } from 'react';

let debounceTimeout;

const Search = ({ setCurrentPokemon, setShowEntry, entryError }) => {
  const [searchInput, setSearchInput] = useState('');
  const [pokemonList, setPokemonList ] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const storedPokemonList = localStorage.getItem('pokemonList');
        if (storedPokemonList) {
          setPokemonList(JSON.parse(storedPokemonList));
        }
        else {
          const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000');
          const data = await response.json();
          setPokemonList(data.results);
          localStorage.setItem('pokemonList', JSON.stringify(data.results));
        }
      }
      catch (error) {
        console.error('Error fetching Pokémon list', error);
      }
    };
  
    fetchPokemonList();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const sanitisedInput = searchInput.toLowerCase().replace(/^0+/, '');
    if (sanitisedInput) {
      setCurrentPokemon(sanitisedInput);
      setShowEntry(true);
    }
  };

  const setSuggestion = (suggestion) => {
    setSearchInput(suggestion);
    setFilteredList([]);
  };

  const debounceSearch = (searchTerm) => {
    clearTimeout(debounceTimeout);
    if (!searchTerm) return setFilteredList([]);

    debounceTimeout = setTimeout(() => {
      /* console.log(searchTerm); */
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
      handleSearch(event);
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
        <form onSubmit={handleSearch}>
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
          ) : null }
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