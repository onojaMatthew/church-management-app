// import BirthdayTable from "./BirthdayTable";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Spinner, Table } from "reactstrap";
import { FaArrowLeft, FaTrash } from "react-icons/fa"
import { localAuth } from "../../../../helper/authenticate";
import Search from "../../../SearchComponent/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Birthday.css";
import { birthdayList, createBirthday, deleteBirthday, searchBirthday } from "../../../../store/actions/actions_birthday";
import { Button } from "antd";
import { NewBirthday } from "./NewBirthday";

const Birthday = () => {
  const dispatch = useDispatch();
  const { birthdays, get_loading, error, b_docs, create_success, search_success, create_loading, delete_loading } = useSelector(state => state.birthday);

  const [ search_term, setSearchTerm ] = useState("");
  const [ modal, setModal ] = useState(false);
  const [ birthdayData, setBirthdayData ] = useState([{ first_name: "", last_name: "", email: "", phone: "", birth_date: "", sex: "", venue: "" }]);
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

  // const handleSearch = () => {
    
  // }

  const toggle = () => {
    setModal(!modal);
  }

  useEffect(() => {
    if (error && error === "Invalid token") {
      history.push("/church-login")
    }
  }, [ error, history ]);

  useEffect(() => {
    if (search_term.length > 0) {
      dispatch(searchBirthday(search_term))
    }
  }, [ dispatch, search_term ]);

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
    newData.push( { first_name: "", last_name: "", email: "", phone: "", birth_date: "", sex: "", venue: "" });
    setBirthdayData(newData);
  }

  const onDelete = (id) => {
    dispatch(deleteBirthday(id));
  }

  useEffect(() => {
    if (create_success) {
      toggle()
    }
  }, [ create_success ]);

  return (
    <div>
      {get_loading ? (
        <div className="text-center spin">
          <Spinner className="my-loader">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Card id="birthday-card">
          <FaArrowLeft size={30} onClick={() => history.goBack()} size={30} color="#1890ff" />
        <div>
          <Button onClick={toggle} className="new-event-button">Create New Service</Button>
        </div>
        <CardBody>
          <div className="search-wrapper">
            <h1>Birthday Table</h1>
            <Search 
              search_term={search_term}
              onChange={onHandleChange}
            />
          </div>
          {search_success ? (
            <Table responsive>
              <thead>
                <th>S/N</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Phone Number</th>
                <th>Venue</th>
                <th>Delete</th>
              </thead>
              <tbody>
                {birthdays && birthdays.length > 0 ? birthdays.map((b, i) => {
                  let date = new Date(b?.birth_date)
                  return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{b?.first_name}</td>
                    <td>{b?.last_name}</td>
                    <td>{date && date.toLocaleDateString()}</td>
                    <td>{b?.email}</td>
                    <td>{b?.sex}</td>
                    <td>{b?.phone}</td>
                    <td>{b?.venue}</td>
                    <td onClick={() => onDelete(b?._id)}>{delete_loading ? (
                      <Spinner>
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    )
                     : <FaTrash color={"#ff0000"} />}</td>
                  </tr>
                  )}) : <h2 className="text-center mt-5">No results found</h2>}
              </tbody>
            </Table>
          ) : (
            <Table responsive>
              <thead>
                <th>S/N</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Phone Number</th>
                <th>Venue</th>
                <th>Delete</th>
              </thead>
              <tbody>
                {b_docs && b_docs.length > 0 ? b_docs.map((b, i) => {
                  let date = new Date(b?.birth_date)
                  return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{b?.first_name}</td>
                    <td>{b?.last_name}</td>
                    <td>{date && date.toLocaleDateString()}</td>
                    <td>{b?.email}</td>
                    <td>{b?.sex}</td>
                    <td>{b?.phone}</td>
                    <td>{b?.venue}</td>
                    <td onClick={() => onDelete(b?._id)}>{delete_loading ? (
                      <Spinner>
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : <FaTrash color={"#ff0000"} />}</td>
                  </tr>
                  )}) : <h2 className="text-center">No records found</h2>}
              </tbody>
            </Table>
          )}
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
          addNewData={addNewData}
          birthdayData={birthdayData}
        />
      </Card>
      )}
      
    </div>
  )
}

export default Birthday;