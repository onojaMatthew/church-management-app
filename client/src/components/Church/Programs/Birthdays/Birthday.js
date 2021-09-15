import BirthdayTable from "./BirthdayTable";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { localAuth } from "../../../../helper/authenticate";
import Search from "../../../SearchComponent/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Birthday.css";
import { birthdayList, createBirthday, deleteBirthday } from "../../../../store/actions/actions_birthday";
import { Button } from "antd";
import { NewBirthday } from "./NewBirthday";

const Birthday = () => {
  const dispatch = useDispatch();
  const { birthdays, get_loading, error, create_loading, delete_loading } = useSelector(state => state.birthday);
  const [ search_term, setSearchTerm ] = useState("");
  const [ modal, setModal ] = useState(false);
  const [ birthdayData, setBirthdayData ] = useState([{ first_name: "", last_name: "", email: "", phone: "", birth_date: "", sex: "" }]);
  const history = useHistory();
  const church = localAuth().church && localAuth().church._id;

  const onDataChange = (event, index) => {
    const newUserData = [ ...birthdayData ];
    newUserData[ index ][ event.target.name ] = event.target.value;
    setBirthdayData(newUserData);
  }

  const { nextPage, page, prevPage, totalPages } = birthdays && birthdays;

  const onHandleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  }

  const handleSearch = () => {
    
  }

  const toggle = () => {
    setModal(!modal);
  }

  useEffect(() => {
    if (error && error === "Invalid token") {
      history.push("/church-login")
    }
  }, [ error ]);

  useEffect(() => {
    if (search_term.length > 0) {
      handleSearch();
    }
  }, [ search_term ]);

  useEffect(() => {
    const offset=1;
    const limit=10;
    dispatch(birthdayList(offset, limit))
  }, [ dispatch]);

  let paginateArr = [];
  for (let i = 1; i <= totalPages; i++) {
    paginateArr.push(i);
  }

  const handleNextPage = (next_page) => {
    const offset=next_page;
    const limit=10;
    console.log(next_page, " the next page")
    dispatch(birthdayList(offset, limit));
  }

  const handleSubmit = () => {
    const data = {
      celebrants: birthdayData,
      church
    };

    dispatch(createBirthday(data));
  }

  const addNewData = () => {
    const newData = [ ...birthdayData ];
    newData.push( { first_name: "", last_name: "", email: "", phone: "", birth_date: "", sex: "" });
    setBirthdayData(newData);
  }

  const onDelete = (id) => {
    dispatch(deleteBirthday(id));
  }

  return (
    <Card id="birthday-card">
      <div>
        <Button onClick={toggle} className="new-event-button">Create New Birthday</Button>
      </div>
      <CardBody>
        <div className="search-wrapper">
          <h1>Birthday Table</h1>
          <Search 
            search_term={search_term}
            onChange={onHandleChange}
          />
        </div>
        <BirthdayTable onDelete={onDelete} delete_loading={delete_loading} birthdays={birthdays} get_loading={get_loading} />
        <div className="justify-content-center">
          {birthdays && birthdays.totalPages && birthdays.totalPages > 1 ? (
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center mt-5">
                <li className="page-item">
                  <span className="page-link" onClick={() => handleNextPage(prevPage)} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </span>
                </li>
                {paginateArr && paginateArr.map((p, i) => (
                  <li key={i} onClick={() => handleNextPage(p && p)} className={p === page ? `page-item active` : "page-item"}><span className="page-link">{p}</span></li>
                ))}
                
                <li className="page-item">
                  <span className="page-link" onClick={() => handleNextPage(nextPage && nextPage)} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </span>
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
      </CardBody>
      <NewBirthday 
        create_loading={create_loading}
        toggle={toggle}
        modal={modal}
        onHandleChange={onDataChange}
        handleSubmit={handleSubmit}
        // onFieldChange={onDataChange}
        addNewData={addNewData}
        birthdayData={birthdayData}
      />
    </Card>
  )
}

export default Birthday;