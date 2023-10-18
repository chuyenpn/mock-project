import React from 'react';

type ListProps = {
  page: number;
  perPage: number;
  totalPages: number;
  total: number;
  handlePageChange: (page: number) => void;
};

const Pagination: React.FC<ListProps> = ({
  total,
  page,
  perPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="flex justify-between items-center flex-col md:flex-row mock-pagination">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{(page - 1) * perPage + 1}</span> to{' '}
          <span className="font-medium">{page * perPage + 1}</span> of{' '}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex pagination">
        {page > 1 && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            type="button"
          >
            Previous
          </button>
        )}

        {page < totalPages && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            type="button"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
