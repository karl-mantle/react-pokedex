import { useEffect, useState } from 'react';
import ItemCard from '../Cards/ItemCard';
import PokeCard from '../Cards/PokeCard';
import pokeball from '../../assets/svg/pokeball.svg';
import './listing.css';

const cardTypes = {
  item: ItemCard,
  pokemon: PokeCard
};

const ListingPage = ({ globalLoading, setGlobalLoading, currentList, currentKind, setModalShow, setModalTarget }) => {
  const [listingLoading, setListingLoading] = useState(false);
  const [listingError, setListingError] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [cardsDisplayed, setCardsDisplayed] = useState([]);
  
  const cardLimit = 12;
  const CardType = cardTypes[currentKind];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleNextPage = () => {
    setPageNumber(pageNumber => pageNumber + 1);
    scrollToTop();
  };
  const handlePreviousPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber => pageNumber - 1);
    }
    scrollToTop();
  };

  const fetchCardDetails = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    }
    catch (error) {
      console.error('Error fetching card details.', error)
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      setListingError(false);
      setListingLoading(true);
      setGlobalLoading(true);

      try {
        let targetList = currentList;
        console.log(currentKind);

        if (targetList && targetList.length > 0) {
          const start = pageNumber * cardLimit;
          const end = start + cardLimit;
          const currentPage = targetList.slice(start, end);

          const fetchPromises = currentPage.map(card => fetchCardDetails(card.url));
          const cardDetails = await Promise.all(fetchPromises);
          setCardsDisplayed(cardDetails.map((details, index) => ({
            ...details,
            url: currentPage[index].url
          })));
        }
        else {
          console.error('List returned nothing.');
          setListingError(true);
        }
      }
      catch (error) {
        console.error('Failed to fetch list', error);
        setListingError(true);
      }
      finally {
        setGlobalLoading(false);
        setListingLoading(false);
      }
    };

    if (currentList && currentList.length > 0) {
      fetchListings();
    }
  }, [setGlobalLoading, currentList, currentKind, pageNumber]);

  return (
    <div>
      { listingError ?  (
        <div className="message-box">
          <p>An error occurred fetching listing data.</p>
        </div>
      ) : null }

      { listingLoading ?  (
          <div className="loading">
            <img src={pokeball} alt="" className="pokeball"/>
          </div>
        ) : null }

      { !listingLoading ? (
      <div className={`listing ${ listingError ? 'hidden' : '' }`}>
        {cardsDisplayed.map((subject, index) => (
          <CardType
            key={index}
            subject={subject}
            url={subject.url}
            setModalTarget={setModalTarget}
            setModalShow={setModalShow}
          />
        ))}
      </div>
      ) : null }

      <div className={`pagination${ globalLoading || listingError ? ' hidden' : '' }`}>
        <button className={`prev${ pageNumber === 0 ? ' hidden' : '' }`} onClick={handlePreviousPage} >Prev</button>
        <button className={`next${ pageNumber === 0 ? ' end' : '' }`} onClick={handleNextPage}>Next</button>
      </div>

    </div>
  );
};

export default ListingPage;