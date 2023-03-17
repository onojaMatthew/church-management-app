export const pagination = (query) => {
  const page = query.offset && query.offset > 0 ? parseInt(query.offset) : 1;

  const PAGE_SIZE = query.limit ? parseInt(query.limit) : 10;

  const offset = (page - 1) * PAGE_SIZE;

  const limit = PAGE_SIZE;

  return {
    offset,
    limit
  }
}


export const paginated_data = (items, current_page, per_page_items) => {
  const page = +current_page > 0 ? +current_page : 1;
  const per_page = +per_page_items || 20;
  const offset = (page - 1) * per_page;
  const paginatedItems = items.slice(offset).slice(0, per_page_items);
  const total_pages = Math.ceil(items.length / per_page);

  return {
    docs: paginatedItems,
    totalDocs: items.length,
    page: parseInt(page),
    limit: parseInt(per_page),
    prevPage: page > 1 ? parseInt(page - 1) : null,
    nextPage: (total_pages > page) ? parseInt(page) + 1 : null,
    totalPages: total_pages,
    hasPrevPage: !!(page - 1),
    hasNextPage: (total_pages > page),
  };
};