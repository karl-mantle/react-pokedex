import { useEffect, useState } from 'react';
import '../types.css';

const ListingFilter = ({ currentFilter, setCurrentFilter, filterSource, setFilterSource, setCurrentList, setPageNumber, typesList, pokedexList }) => {
  const [filtersTargetList, setFiltersTargetList] = useState([]);

  const handleFilterCards = (type, value, event) => {
    event.preventDefault();
    console.log('Filter cards by:', value);
  
    if (type === 'source') {
      setFilterSource(value);
      setPageNumber(0);
    } else if (type === 'filter') {
      setCurrentFilter(value);
      setPageNumber(0);
    }
  };

  const clearFilters = (event) => {
    event.preventDefault();
    console.log('Filters cleared.');
    switch (filterSource) {
      case 'pokedex':
        setCurrentFilter('national');
        break;
      case 'type':
        setCurrentFilter('normal');
        break;
      default:
        setFiltersTargetList([]);
    }
  };

  useEffect(() => {
    const updateFilters = () => {
      switch (filterSource) {
        case 'type':
          setFiltersTargetList(typesList)
          break;
        case 'pokedex':
          setFiltersTargetList(pokedexList)
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
      if (currentFilter) {
        const filteredList = await fetchFilteredList(currentFilter);
        setCurrentList(filteredList);
      }
    };
  
    filterCurrentList();
  }, [currentFilter, filterSource, setCurrentList]);

  return (
    <div className="frame">

      <div className="filter">
        <div className="title">Filter by:</div>
        <div className="tabber">
          <button className={`${filterSource === 'pokedex' ? 'active' : ''}`} onClick={(e) => handleFilterCards('source', 'pokedex', e)}>Region</button>
          <button className={`${filterSource === 'type' ? 'active' : ''}`} onClick={(e) => handleFilterCards('source', 'type', e)}>Type</button>
        </div>
      </div>

      { filterSource === 'none' ? null : (
        <div className="filters">
          <ul>
            {filtersTargetList.map((filter, index) => (
                <li key={index} className={`${filterSource} ${filter.name}`} onClick={(e) => handleFilterCards('filter', filter.name, e)}>{filter.name.toUpperCase()}</li>
                ))}
          </ul>
            <button onClick={(e) => clearFilters(e)}>Clear filters</button>
        </div>
        )}
    
    </div>
  );
};

export default ListingFilter;
