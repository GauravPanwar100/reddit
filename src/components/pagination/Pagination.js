import React from "react";

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
      {pageNumbers.map(number => (
        <li className={currentPage === number ? "page-item active" : "page-item"} key={number}>
          <a onClick={() => paginate(number)} className="page-link" href="#" tabIndex="-1">
            {number}
          </a>
        </li>
      ))}
      </ul>
    </nav>
  );
}

export default Pagination;
