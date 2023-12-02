// Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`cursor-pointer font-bold px-3 py-1 border mr-2 ${
            i === currentPage ? 'bg-green-300' : 'bg-white-100'
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center mt-2 mb-6 justify-end">
      <div className="flex items-center">
        <p className="font-bold text-sm mr-4">
          Page {currentPage} of {totalPages}
        </p>
        <span
          className={`cursor-pointer px-3 py-1 border mr-2 ${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed pointer-events-none' : 'bg-white-100'
          }`}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </span>
        <span
          className={`cursor-pointer px-3 py-1 border mr-2 ${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed pointer-events-none' : 'bg-white-100'
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </span>
        {renderPageNumbers()}
        <span
          className={`cursor-pointer px-3 py-1 border mr-2 ${
            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed pointer-events-none' : 'bg-white-100'
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </span>
        <span
          className={`cursor-pointer px-3 py-1 border ${
            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed pointer-events-none' : 'bg-white-100'
          }`}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </span>
      </div>
    </div>
  );
};

export default Pagination;
