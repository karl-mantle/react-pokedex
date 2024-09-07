const Pagination = ({ pageNumber, setPageNumber }) => {

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

  return (
      <div className="pagination">
        <button className={`prev${ pageNumber === 0 ? ' hidden' : '' }`} onClick={handlePreviousPage} >Prev</button>
        <button className={`next${ pageNumber === 0 ? ' end' : '' }`} onClick={handleNextPage}>Next</button>
      </div>
  );
};

export default Pagination;