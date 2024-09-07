import { useState } from 'react';
import { cleanName } from '../../utils/Cleaners';
import ListingPage from './ListingPage';
import ListingFilter from './ListingFilter';
import Pagination from './Pagination';
import './listing.css';

const Listing = ({setModalShow, setModalTarget, pokemonList, typesList, pokedexList }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [listingError, setListingError] = useState(false);
  const [filterSource, setFilterSource] = useState('pokedex');
  const [currentFilter, setCurrentFilter] = useState('national');
  const [currentList, setCurrentList] = useState([]);

  return (
    <div>

      <ListingFilter
        filterSource={filterSource}
        setFilterSource={setFilterSource}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        setCurrentList={setCurrentList}
        setPageNumber={setPageNumber}

        pokemonList={pokemonList}
        typesList={typesList}
        pokedexList={pokedexList}
      />

      { listingError ?  (
        <div className="message-box">
          <p>An error occurred fetching listing data.</p>
        </div>
      ) : null }

      { !listingError && currentList && filterSource === 'pokedex' ?  (
        <div className="message-box">
          <p>Now displaying {cleanName(currentFilter)} Pokédex.</p>
        </div>
      ) : null }

      { !listingError && currentList && filterSource === 'type' ?  (
        <div className="message-box">
          <p>Now displaying all {currentFilter} type Pokémon.</p>
        </div>
      ) : null }

      { !listingError && currentList ? (
        <ListingPage
          currentList={currentList}
          filterSource={filterSource}

          setModalShow={setModalShow}
          setModalTarget={setModalTarget}

          listingError={listingError}
          setListingError={setListingError}

          pageNumber={pageNumber}
        />
      ) : null }

      { !listingError && currentList ? (
        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      ) : null }

    </div>
  );
};

export default Listing;
