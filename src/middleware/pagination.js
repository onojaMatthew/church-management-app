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
