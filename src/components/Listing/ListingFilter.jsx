import { useEffect, useState } from 'react';
import { cleanName } from '../../utils/Cleaners';

const ListingFilter = ({ filterSource, setFilterSource, setCurrentList, setPageNumber, typesList, pokedexList, pokedexFilter, setPokedexFilter, typesFilter, setTypesFilter }) => {
  const [filtersTargetList, setFiltersTargetList] = useState([]);

  const handleFilterCards = (value, event) => {
    event.preventDefault();
    console.log('Filter cards by:', value);
    switch (filterSource) {
      case 'pokedex':
        setPokedexFilter(value);
        setPageNumber(0);
        break;
      case 'type':
        if (typesFilter.includes(value)) {
          if (typesFilter.length === 1) {
            setTypesFilter([]);
          } else {
            setTypesFilter(typesFilter.filter(t => t !== value));
          }
        } else if (typesFilter.length < 2) {
          setTypesFilter([...typesFilter, value]);
        } else {
          console.log('You can only select up to 2 types.');
        }
        setPageNumber(0);
        break;
      default:
        setFiltersTargetList([]);
    }
  };

  const changeFilterSource = (value, event) => {
    event.preventDefault();
    console.log('Changed filter source tab.');
    setFilterSource(value);
    switch (value) {
      case 'pokedex':
        setPokedexFilter('national');
        break;
      case 'type':
        setTypesFilter([]);
        break;
      default:
        setFiltersTargetList([]);
    }
  };

  const clearFilters = (event) => {
    event.preventDefault();
    console.log('Filters cleared.');
    switch (filterSource) {
      case 'pokedex':
        setPokedexFilter('national');
        break;
      case 'type':
        setTypesFilter([]);
        break;
      default:
        setFiltersTargetList([]);
    }
  };

  useEffect(() => {
    const updateFilters = () => {
      switch (filterSource) {
        case 'type':
          setFiltersTargetList(typesList);
          break;
        case 'pokedex':
          setFiltersTargetList(pokedexList);
          break;
        default:
          setFiltersTargetList([]);
      }
    };
    updateFilters();
  }, [filterSource, typesList, pokedexList]);

  useEffect(() => {
    const fetchFilteredList = async (target) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/${filterSource}/${target}`);
        const data = await response.json();
        
        switch (filterSource) {
          case 'type':
            return data.pokemon.map(p => p.pokemon);
          case 'pokedex':
            return data.pokemon_entries.map(entry => entry.pokemon_species);
          default:
            return [];
        }
      } catch (error) {
        console.error('Error fetching filtered list.', error);
        return [];
      }
    };
  
    const filterCurrentList = async () => {
      if (pokedexFilter && filterSource === 'pokedex') {
        const filteredList = await fetchFilteredList(pokedexFilter);
        setCurrentList(filteredList);
      } else if (typesFilter.length > 0 && filterSource === 'type') {
        const responses = await Promise.all(
          typesFilter.map(type => fetch(`https://pokeapi.co/api/v2/type/${type}`))
        );
        const data = await Promise.all(responses.map(res => res.json()));
        const filteredPokemon = data.reduce((acc, curr) => {
          const pokemonList = curr.pokemon.map(p => p.pokemon);
          return acc.filter(p => pokemonList.some(p2 => p2.name === p.name));
        }, data[0].pokemon.map(p => p.pokemon));
        setCurrentList(filteredPokemon);
      } 
    };
  
    filterCurrentList();
  }, [pokedexFilter, typesFilter, filterSource, setCurrentList]);

  return (
    <div className="frame">
      <div className="filter">
        <div className="title">Filter by:</div>
        <div className="tabber">
          <button className={`${filterSource === 'pokedex' ? 'active' : ''}`} onClick={(e) => changeFilterSource('pokedex', e)}>Region</button>
          <button className={`${filterSource === 'type' ? 'active' : ''}`} onClick={(e) => changeFilterSource('type', e)}>Type</button>
        </div>
      </div>

      { filterSource === 'type' ? (
        <div className="filters">
          <ul>
            {filtersTargetList.map((filter, index) => (
              <li key={index} className={`${filterSource}${typesFilter.includes(filter.name) ? ' active' : ''} ${filter.name}`} onClick={(e) => handleFilterCards(filter.name, e)}>{filter.name.toUpperCase()}</li>
            ))}
          </ul>
          <button onClick={(e) => clearFilters(e)}>Clear filters</button>
        </div>
      ) : null }

      { filterSource === 'pokedex' ? (
        <div className="filters">
          <div className="hidden-mobile">
            <ul>
              {filtersTargetList.map((filter, index) => (
                <li key={index} className={`${filterSource} ${pokedexFilter === filter.name ? 'active' : ''}`} onClick={(e) => handleFilterCards(filter.name, e)}>{cleanName(filter.name)}</li>
              ))}
            </ul>
          </div>
          <div className="hidden-desktop">
            <select onChange={(e) => handleFilterCards(e.target.value, e)}>
              {filtersTargetList.map((filter, index) => (
                <option key={index} value={filter.name} className={`${filterSource}`}>
                  {cleanName(filter.name)} Pokédex
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null }
    </div>
  );
};

export default ListingFilter;
