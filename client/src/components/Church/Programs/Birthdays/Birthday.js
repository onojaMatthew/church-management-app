import BirthdayTable from "./BirthdayTable";
import { Card, CardBody, Row, Col } from "reactstrap";
import Search from "../../../SearchComponent/Search";
import { useEffect, useState } from "react";

import "./Birthday.css";

const Birthday = () => {
  const [ search_term, setSearchTerm ] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  }

  const handleSearch = () => {
  }

  useEffect(() => {
    if (search_term.length > 0) {
      handleSearch();
    }
  }, [ search_term ]);

  return (
    <Card id="birthday-card">
      <CardBody>
        <div className="search-wrapper">
          <h1>Birthday Table</h1>
          <Search 
            search_term={search_term}
            onChange={onChange}
          />
        </div>
        <BirthdayTable />
      </CardBody>
    </Card>
  )
}

export default Birthday;