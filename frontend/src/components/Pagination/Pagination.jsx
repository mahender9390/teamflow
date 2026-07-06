import React from "react";

const Pagination = ({ pageData, onPageChange }) => {
  if (!pageData || pageData.totalPages <= 1) return null;

  const { number: currentPage, totalPages } = pageData;

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <nav className="d-flex justify-content-end mt-3">
      <ul className="pagination pagination-sm mb-0">
        <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </button>
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page + 1}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages - 1 ? "disabled" : ""
          }`}
        >
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;