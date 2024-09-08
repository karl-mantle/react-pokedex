import { useEffect, useState } from 'react';
import { cleanName } from '../../utils/Cleaners';
import Card from '../Cards/Card';
import Pagination from './Pagination';
import pokeball from '../../assets/svg/pokeball.svg';


const ListingPage = ({ currentList, currentFilter, filterSource, setModalShow, setModalTarget, setModalKind, listingError, setListingError, pageNumber, setPageNumber }) => {
  const [listingLoading, setListingLoading] = useState(false);
  const [cardsDisplayed, setCardsDisplayed] = useState([]);
  
  const cardLimit = 12;
  const totalPages = Math.ceil(currentList.length / cardLimit);

  const fetchSpeciesDetails = async (url) => {
    try {
      if (filterSource === 'pokedex') {
        const speciesResponse = await fetch(url);
        const speciesData = await speciesResponse.json();
  
        let pokemonData;
        const alolaFilters = ['original-alola', 'original-melemele', 'original-akala', 'original-ulaula', 'original-poni', 'updated-alola', 'updated-melemele', 'updated-akala', 'updated-ulaula', 'updated-poni'];
        const galarFilters = ['galar', 'isle-of-armor', 'crown-tundra'];
    
        if (alolaFilters.includes(currentFilter)) {
          const alolaVariety = speciesData.varieties.find(variety => variety.pokemon.name.includes('alola'));
          if (alolaVariety) {
            const pokemonResponse = await fetch(alolaVariety.pokemon.url);
            pokemonData = await pokemonResponse.json();
          }
          else {
            const pokemonResponse = await fetch(speciesData.varieties[0].pokemon.url);
            pokemonData = await pokemonResponse.json();
          }
        }
        else if (galarFilters.includes(currentFilter)) {
          const galarVariety = speciesData.varieties.find(variety => variety.pokemon.name.includes('galar'));
          if (galarVariety) {
            const pokemonResponse = await fetch(galarVariety.pokemon.url);
            pokemonData = await pokemonResponse.json();
          }
          else {
            const pokemonResponse = await fetch(speciesData.varieties[0].pokemon.url);
            pokemonData = await pokemonResponse.json();
          }
        }
        else {
          const pokemonResponse = await fetch(speciesData.varieties[0].pokemon.url);
          pokemonData = await pokemonResponse.json();
        }
        return { speciesData, pokemonData };
      }
      else {
        // this is effectively filterSource === 'type'
        const pokemonResponse = await fetch(url);
        const pokemonData = await pokemonResponse.json();
        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();
        return { speciesData, pokemonData };
      }
    }
    catch (error) {
      console.error('Error fetching card details.', error);
    }
  };

  useEffect(() => {
    const fetchListingCards = async () => {
      setListingError(false);
      setListingLoading(true);

      try {
        const start = pageNumber * cardLimit;
        const end = start + cardLimit;
        const currentPage = currentList.slice(start, end);

        const fetchPromises = currentPage.map(card => fetchSpeciesDetails(card.url));
        const cardDetails = await Promise.all(fetchPromises);
        setCardsDisplayed(cardDetails.map((details, index) => ({
          ...details,
          originalIndex: start + index + 1
        })));
      }
      catch (error) {
        console.error('Error displaying cards', error);
        setListingError(true);
      }
      finally {
        setListingLoading(false);
      }
    };

    if (currentList && currentList.length > 0) {
      fetchListingCards();
    }
  }, [currentList, pageNumber, setListingError, setListingLoading]);

  return (
    <div>

      { !listingLoading && filterSource === 'pokedex' ?  (
        <div className="message-box display">
          <p>Now displaying {cleanName(currentFilter)} Pokédex entries {pageNumber * cardLimit + 1} to {Math.min((pageNumber + 1) * cardLimit, currentList.length)} of a total {currentList.length} entries.</p>
        </div>
      ) : null }

      { !listingLoading && filterSource === 'type' ?  (
        <div className="message-box display">
          <p>Now displaying {pageNumber * cardLimit + 1} to {Math.min((pageNumber + 1) * cardLimit, currentList.length)} of {currentList.length} {cleanName(currentFilter)}-type Pokémon.</p>
        </div>
      ) : null }

      { listingLoading ?  (
          <div className="loading">
            <img src={pokeball} alt="" className="pokeball"/>
          </div>
      ) : null }

      { !listingLoading ?  (
          <div className={`listing ${ listingError ? 'hidden' : '' }`}>
          {cardsDisplayed.map((subject, index) => (
            <Card
              key={index}
              subject={subject}
              number={subject.originalIndex}
              filterSource={filterSource}
              setModalTarget={setModalTarget}
              setModalShow={setModalShow}
              setModalKind={setModalKind}
            />
          ))}
        </div>
      ) : null }

      <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={totalPages}
        />
    </div>
  );
};

export default ListingPage;