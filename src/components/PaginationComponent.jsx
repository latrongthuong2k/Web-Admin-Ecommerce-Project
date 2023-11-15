import React, { useState, useEffect } from "react";

const PaginationComponent = ({ totalPage, data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginationButtons = [];
  for (let i = 1; i <= totalPage; i++) {
    paginationButtons.push(
      <button key={i} onClick={() => goToPage(i)} disabled={currentPage === i}>
        {i}
      </button>,
    );
  }

  return (
    <div>
      {paginationButtons}
      {/* Nút Previous và Next */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
