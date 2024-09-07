const Pagination = ({ pageNumber, setPageNumber, totalPages }) => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleNextPage = () => {
    setPageNumber(pageNumber => Math.min(pageNumber + 1, totalPages - 1));
    scrollToTop();
  };
  const handlePreviousPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber => pageNumber - 1);
    }
    scrollToTop();
  };

  const handlePageClick = (page) => {
    setPageNumber(page);
    scrollToTop();
  };

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, pageNumber - 1);
    const endPage = Math.min(totalPages, pageNumber + 1);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button className={`prev${ pageNumber === 0 ? ' inactive' : '' }`} onClick={handlePreviousPage}>Prev</button>
      {getPageNumbers().map((page, index) => (
        <span key={index} className={`${ page === pageNumber + 1 ? ' active' : '' }`} onClick={() => typeof page === 'number' && handlePageClick(page - 1)}>
          {page}
        </span>
      ))}
      <button className={`next${ pageNumber === totalPages - 1 ? ' inactive' : '' }`} onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default Pagination;