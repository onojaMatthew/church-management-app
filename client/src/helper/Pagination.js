import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Paginations = (
    churches,
    onPaginate,
  ) => {
  const totalPages = churches?.churches?.totalPages;
  const page = churches?.churches?.page;
  const prevPage = churches?.churches?.prevPage;
  const nextPage = churches?.churches?.nextPage;
  const hasNextPage = churches?.churches?.hasNextPage;
  const hasPrevPage = churches?.churches?.hasPrevPage

   

  let paginateArr = [];
  for (let i = 1; i <= totalPages; i++) {
    paginateArr.push(i)
  }
  
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem className="m-1 paginat">
        <PaginationLink className={hasPrevPage ? '' : 'disabled'} onClick={onPaginate} previous  />
      </PaginationItem>
      {paginateArr && paginateArr.map((p, i) => (
        <PaginationItem key={i} className="m-1 paginat">
          <PaginationLink onClick={() => onPaginate(p && p)} className={p === page ? 'active' : ''} >
            {p}
          </PaginationLink>
        </PaginationItem>
      ))}
      
      <PaginationItem className="m-1 paginat">
        <PaginationLink onClick={() => onPaginate(nextPage)} next className={hasNextPage  ? '' : 'disabled'} />
      </PaginationItem>
    </Pagination>
  );
}

export default Paginations


