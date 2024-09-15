import { useState } from 'react';
import ListingPage from './ListingPage';
import ListingFilter from './ListingFilter';
import './listing.css';

const Listing = ({setModalShow, setModalTarget, setModalKind, pokemonList, typesList, pokedexList }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [listingError, setListingError] = useState(false);
  const [filterSource, setFilterSource] = useState('pokedex');
  const [pokedexFilter, setPokedexFilter] = useState('national');
  const [typesFilter, setTypesFilter] = useState([]);
  const [currentList, setCurrentList] = useState([]);

  return (
    <div>

      <ListingFilter
        filterSource={filterSource}
        setFilterSource={setFilterSource}
        pokedexFilter={pokedexFilter}
        setPokedexFilter={setPokedexFilter}
        typesFilter={typesFilter}
        setTypesFilter={setTypesFilter}
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

      { !listingError && currentList ? (
        <ListingPage
          currentList={currentList}
          filterSource={filterSource}
          pokedexFilter={pokedexFilter}
          typesFilter={typesFilter}

          setModalShow={setModalShow}
          setModalTarget={setModalTarget}
          setModalKind={setModalKind}

          listingError={listingError}
          setListingError={setListingError}

          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      ) : null }

    </div>
  );
};

export default Listing;
