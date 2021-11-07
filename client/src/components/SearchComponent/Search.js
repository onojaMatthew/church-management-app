import { Input } from "reactstrap";

import "./Search.css";

const Search = ({ onChange, search_term }) => {
  return (
    <Input type="search" placeholder="Search..." name="search_term" value={search_term} onChange={(e) => onChange(e)} className="search" />
  )
}

export default Search;