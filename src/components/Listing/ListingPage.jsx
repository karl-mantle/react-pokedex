import { useEffect, useState } from 'react';
import { cleanName } from '../../utils/Cleaners';
import Card from '../Cards/Card';
import Pagination from './Pagination';
import pokeball from '../../assets/svg/pokeball.svg';


const ListingPage = ({ currentList, pokedexFilter, typesFilter, filterSource, setModalShow, setModalTarget, setModalKind, listingError, setListingError, pageNumber, setPageNumber }) => {
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
        const hisuiFilters = ['hisui'];
        const paldeaFilters = ['paldea', 'kitakami', 'blueberry'];
  
        const fetchVariety = async (varietyName) => {
          const variety = speciesData.varieties.find(variety => variety.pokemon.name.includes(varietyName) && !variety.pokemon.name.includes('cap')); // needed because of all the hat wearing pikachus...
          if (variety) {
            const pokemonResponse = await fetch(variety.pokemon.url);
            return await pokemonResponse.json();
          } else {
            const pokemonResponse = await fetch(speciesData.varieties[0].pokemon.url);
            return await pokemonResponse.json();
          }
        };
  
        switch (true) {
          case alolaFilters.includes(pokedexFilter):
            pokemonData = await fetchVariety('alola');
            break;
          case galarFilters.includes(pokedexFilter):
            pokemonData = await fetchVariety('galar');
            break;
          case hisuiFilters.includes(pokedexFilter):
            pokemonData = await fetchVariety('hisui');
            break;
          case paldeaFilters.includes(pokedexFilter):
            pokemonData = await fetchVariety('paldea');
            break;
          default:
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
          <p>Now displaying {cleanName(pokedexFilter)} Pokédex entries {pageNumber * cardLimit + 1} to {Math.min((pageNumber + 1) * cardLimit, currentList.length)} of a total {currentList.length} entries.</p>
        </div>
      ) : null }

      { !listingLoading && filterSource === 'type' ?  (
        <div className="message-box display">
          { filterSource === 'type' && typesFilter.length === 0 ?  (
          <p>Please select at least one Pokémon type.</p>
          ) : null }
          { filterSource === 'type' && typesFilter.length === 1 ?  (
          <p>Now displaying {pageNumber * cardLimit + 1} to {Math.min((pageNumber + 1) * cardLimit, currentList.length)} of {currentList.length} {cleanName(typesFilter[0])}-type Pokémon.</p>
          ) : null }
          { filterSource === 'type' && typesFilter.length > 1 ?  (
          <p>Now displaying {pageNumber * cardLimit + 1} to {Math.min((pageNumber + 1) * cardLimit, currentList.length)} of {currentList.length} {cleanName(typesFilter[0])} and {cleanName(typesFilter[1])}-type Pokémon.</p>
          ) : null }
        </div>
      ) : null }

      { listingLoading ?  (
          <div className="loading">
            <img src={pokeball} alt="" className="pokeball"/>
          </div>
      ) : null }

      { !listingLoading && !(filterSource === 'type' && typesFilter.length === 0) ? (
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

      { !listingLoading && !(filterSource === 'type' && typesFilter.length === 0) ? (
      <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={totalPages}
        />
      ) : null }
    </div>
  );
};

export default ListingPage;