import { useEffect, useState } from 'react';
import { cleanName } from '../../utils/Cleaners';
import Card from '../Cards/Card';
import Pagination from './Pagination';
import pokeball from '../../assets/svg/pokeball.svg';


const ListingPage = ({ currentList, currentFilter, filterSource, setModalShow, setModalTarget, listingError, setListingError, pageNumber, setPageNumber }) => {
  const [listingLoading, setListingLoading] = useState(false);
  const [cardsDisplayed, setCardsDisplayed] = useState([]);
  
  const cardLimit = 12;
  const totalPages = Math.ceil(currentList.length / cardLimit);

  const fetchCardDetails = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      return await response.json();
    }
    catch (error) {
      console.error('Error fetching card details.', error)
    }
  };

  useEffect(() => {
    const fetchListingCards = async () => {
      setListingError(false);
      setListingLoading(true);

      try {
        let cardSourceList = currentList;
        const start = pageNumber * cardLimit;
        const end = start + cardLimit;
        const currentPage = cardSourceList.slice(start, end);

        const fetchPromises = currentPage.map(card => fetchCardDetails(card.name));
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

      { filterSource === 'pokedex' ?  (
        <div className="message-box display">
          <p>Now displaying {cleanName(currentFilter)} Pokédex entries {pageNumber * cardLimit + 1} to {Math.min((pageNumber + 1) * cardLimit, currentList.length)} of a total {currentList.length} entries.</p>
        </div>
      ) : null }

      { filterSource === 'type' ?  (
        <div className="message-box display">
          <p>Now displaying {pageNumber * cardLimit + 1} to {Math.min((pageNumber + 1) * cardLimit, currentList.length)} of {currentList.length} {cleanName(currentFilter)}-type Pokémon.</p>
        </div>
      ) : null }

      { listingLoading ?  (
          <div className="loading">
            <img src={pokeball} alt="" className="pokeball"/>
          </div>
        ) : null }
      
      <div className={`listing ${ listingError ? 'hidden' : '' }`}>
        {cardsDisplayed.map((subject, index) => (
          <Card
            key={index}
            subject={subject}
            number={subject.originalIndex}
            filterSource={filterSource}
            setModalTarget={setModalTarget}
            setModalShow={setModalShow}
          />
        ))}
      </div>

      <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={totalPages}
        />
    </div>
  );
};

export default ListingPage;