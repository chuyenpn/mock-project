import React from 'react';

type ListProps = {
  currentPage: number;
  perPage: number;
  totalPages: number;
  total: number;
  handlePageChange: (page: number) => void;
};

const Pagination: React.FC<ListProps> = ({
  total,
  currentPage,
  perPage,
  totalPages,
  handlePageChange,
}) => {
  // const getPageNumbers = () => {
  //   const pageNumbers = [];
  //   const visiblePageCount = 3;

  //   let startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
  //   let endPage = startPage + visiblePageCount - 1;

  //   if (endPage > totalPages) {
  //     endPage = totalPages;
  //     startPage = Math.max(1, endPage - visiblePageCount + 1);
  //   }

  //   const showFirstDots = startPage > 1;
  //   const showLastDots = endPage < totalPages;

  //   if (showFirstDots) {
  //     pageNumbers.push(1);
  //     pageNumbers.push(2);
  //     pageNumbers.push('...');
  //   }

  //   for (let i = startPage; i <= endPage; i++) {
  //     pageNumbers.push(i);
  //   }

  //   if (showLastDots) {
  //     pageNumbers.push('...');
  //     pageNumbers.push(totalPages - 1);
  //     pageNumbers.push(totalPages);
  //   }

  //   return pageNumbers;
  // };

  if (total === 0) {
    return null;
  }

  return (
    <div className="flex justify-between items-center flex-col md:flex-row mock-pagination">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> to{' '}
          <span className="font-medium">{currentPage * perPage}</span> of{' '}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex pagination">
        <button
          disabled={currentPage === 1}
          className="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => handlePageChange(1)}
        >
          First
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          type="button"
        >
          Previous
        </button>
        {/* {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            disabled={currentPage === pageNumber}
            className="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => handlePageChange(pageNumber as number)}
          >
            {pageNumber}
          </button>
        ))} */}

        <button
          disabled
          className="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          type="button"
        >
          {currentPage}
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          type="button"
        >
          Next
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          type="button"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;
