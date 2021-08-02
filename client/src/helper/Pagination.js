import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Paginations = ({ pager, handlePagination }) => {
  console.log(pager, " the pager");
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem className="m-1">
        <PaginationLink onClick={() => handlePagination(pager.startPage && pager.startPage)} first className={`${pager.currentPage === 1 ? 'disabled' : ''}`} />
      </PaginationItem>
      <PaginationItem className="m-1 paginat">
        <PaginationLink className={`${pager.currentPage === 1 ? 'disabled' : ''}`} previous onClick={() => handlePagination(pager.currentPage && pager.currentPage - 1)} />
      </PaginationItem>
      {pager && pager.pages && pager.pages.map((page, i) => (
        <PaginationItem key={i} className="m-1 paginat">
          <PaginationLink onClick={() => handlePagination(page)} className={pager.currentPage === page ? 'active' : ''} >
            {page}
          </PaginationLink>
      </PaginationItem>
      ))}
      
      <PaginationItem className="m-1 paginat">
        <PaginationLink onClick={() => handlePagination(pager.currentPage && pager.currentPage + 1)} className={`${pager.currentPage === pager.totalPages ? 'disabled' : ''}`} next />
      </PaginationItem>
      <PaginationItem className="m-1 paginat">
        <PaginationLink onClick={() => handlePagination(pager.endPage && pager.endPage)} className={`${pager.currentPage === pager.totalPages ? 'disabled' : ''}`} last />
      </PaginationItem>
    </Pagination>
  );
}

export default Paginations


