import React from 'react';

/**
 * PaginationController component for paginating search results.
 * @param {Object} props - The component props.
 * @param {number} props.currentPage - The current page number.
 * @param {number} props.totalPages - The total number of pages.
 * @param {Function} props.handlePageChange - The function to handle page change.
 * @param {Function} props.handlePreviousPageChange - The function to handle previous page change.
 * @param {Function} props.handleNextPageChange - The function to handle next page change.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * return (
 *  <PaginationController
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   handlePageChange={handlePageChange}
 *   handlePreviousPageChange={handlePreviousPageChange}
 *   handleNextPageChange={handleNextPageChange}
 *  />
 * );
 *
 */
const PaginationController = (props) => {
  const {
    currentPage,
    totalPages,
    handlePageChange,
    handlePreviousPageChange,
    handleNextPageChange,
  } = props;

  const isNextDisabled = currentPage >= totalPages ? true : false;

  const isPreviousDisabled = currentPage <= 1 ? true : false;

  return (
    <div className="pagination flex justify-center border-t">
      <nav className="mt-2">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button
              disabled={isPreviousDisabled ? true : false}
              onClick={handlePreviousPageChange}
              className={`${
                isPreviousDisabled && 'cursor-not-allowed'
              } flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700`}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i}>
              <button
                onClick={() => handlePageChange(i + 1)}
                className={`${
                  parseInt(currentPage) === i + 1
                    ? 'bg-brand text-white'
                    : 'bg-white text-gray-500'
                }  flex items-center justify-center px-3 h-8 leading-tight  border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              disabled={isNextDisabled ? true : false}
              onClick={handleNextPageChange}
              className={`${
                isNextDisabled && 'cursor-not-allowed'
              } flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700`}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationController;
