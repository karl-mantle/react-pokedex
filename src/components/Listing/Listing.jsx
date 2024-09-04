import React, { useEffect, useState } from 'react';
import Card from './Card';
import './listing.css';

const Listing = ({ globalLoading, setGlobalLoading, setModalShow, setModalTarget, currentList, currentView }) => {
  const [listingError, setListingError] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [cardsDisplayed, setCardsDisplayed] = useState([]);

  /* Make the amount of cards configurable */
  const limit = 12;

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
      setGlobalLoading(true);

      try {
        let targetList = currentList;

        if (targetList && targetList.length > 0) {
          const start = pageNumber * limit;
          const end = start + limit;
          const currentPage = targetList.slice(start, end);

          const fetchPromises = currentPage.map(item => fetchCardDetails(item.url));
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
      }
    };

    if (currentList && currentList.length > 0) {
      fetchListings();
    }
  }, [setGlobalLoading, currentList, pageNumber]);

  return (
    <div>

      { listingError ?  (
        <div className="message-box">
          <p>An error occurred fetching listing data.</p>
        </div>
      ) : null }

      <div className={`listing ${ listingError ? 'hidden' : '' }`}>
        {cardsDisplayed.map((subject, index) => (
          <Card
            key={index}
            subject={subject}
            url={subject.url}
            setModalTarget={setModalTarget}
            setModalShow={setModalShow}
            currentView={currentView}
          />
        ))}
      </div>

      <div className={`pagination${ globalLoading || listingError ? ' hidden' : '' }`}>
        <button className={`prev${ pageNumber === 0 ? ' hidden' : '' }`} onClick={handlePreviousPage} >Prev</button>
        <button className={`next${ pageNumber === 0 ? ' end' : '' }`} onClick={handleNextPage}>Next</button>
      </div>

    </div>
  )
}

export default Listing;