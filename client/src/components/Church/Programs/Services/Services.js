// import BirthdayTable from "./BirthdayTable";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Spinner, Table } from "reactstrap";
import { FaTrash } from "react-icons/fa"
import { localAuth } from "../../../../helper/authenticate";
import Search from "../../../SearchComponent/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Service.css";
import { serviceList, createService, deleteService, searchService } from "../../../../store/actions/actions_service";
import { Button } from "antd";
import { NewBirthday } from "./NewService";

const Services = () => {
  const dispatch = useDispatch();
  const { services, get_loading, docs, error, search_success, create_loading, delete_loading } = useSelector(state => state.service);

  const [ search_term, setSearchTerm ] = useState("");
  const [ modal, setModal ] = useState(false);
  const [ serviceData, setServiceData ] = useState({
    name: "", preacher: "", topic: "", bible_quote: "", men: "", women: "", children: "", youth: "", start_time: "", end_time: ""
  });

  const history = useHistory();
  const church = localAuth().church && localAuth().church._id;

  const {
    name, preacher, topic, bible_quote, men, women, children, youth, start_time, end_time
  } = serviceData

  const onDataChange = (e) => {
    const { name, value } = e.target;
    const newServiceData = {...serviceData, [name]: value };
    
    setServiceData(newServiceData);
  }

  const { nextPage, page, prevPage, totalPages } = services && services;

  const onHandleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  }

  const handleSearch = () => {
    dispatch(searchService(search_term))
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
    dispatch(serviceList(offset, limit))
  }, [ dispatch]);

  let paginateArr = [];
  for (let i = 1; i <= totalPages; i++) {
    paginateArr.push(i);
  }

  const handleNextPage = (next_page) => {
    const offset=next_page;
    const limit=10;
    dispatch(serviceList(offset, limit));
  }

  const handleSubmit = () => {
    const data = {
      name, 
      preacher, 
      topic, 
      bible_quote, 
      men, 
      women, 
      children, 
      youth, 
      start_time, 
      end_time,
      church
    };

    dispatch(createService(data));
  }

  const onDelete = (id) => {
    dispatch(deleteService(id));
  }

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
          {/* <BirthdayTable onDelete={onDelete} delete_loading={delete_loading} birthdays={birthdays} get_loading={get_loading} /> */}
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
                <th>Delete</th>
              </thead>
              <tbody>
                {services && services.length > 0 ? services.map((b, i) => {
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
                    <td onClick={() => onDelete(b?._id)}>{delete_loading ? "Please wait..." : <FaTrash />}</td>
                  </tr>
                  )}) : <h2 className="text-center mt-5">No results found</h2>}
              </tbody>
            </Table>
          ) : (
            <Table responsive>
              <thead>
                <th>S/N</th>
                <th>Service</th>
                <th>Preacher</th>
                <th>Message title</th>
                <th>Bible Quote</th>
                <th>Men</th>
                <th>Women</th>
                <th>Children</th>
                <th>Youth</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Delete</th>
              </thead>
              <tbody>
                {docs && docs.length > 0 ? docs.map((b, i) => {
                  return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{b?.name}</td>
                    <td>{b?.preacher}</td>
                    <td>{b?.topic}</td>
                    <td>{b?.bible_quote}</td>
                    <td>{b?.attendance && b.attendance?.men}</td>
                    <td>{b?.attendance && b.attendance?.women}</td>
                    <td>{b?.attendance && b.attendance?.children}</td>
                    <td>{b?.attendance && b.attendance?.youth}</td>
                    <td>{b?.start_time}</td>
                    <td>{b?.end_time}</td>
                    <td onClick={() => onDelete(b?._id)}>{delete_loading ? "Please wait..." : <FaTrash />}</td>
                  </tr>
                  )}) : <h2 className="text-center">No records found</h2>}
              </tbody>
            </Table>
          )}
          <div className="justify-content-center">
            {services && services.totalPages && services.totalPages > 1 ? (
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
          name={name}
          preacher={preacher}
          topic={topic}
          bible_quote={bible_quote}
          men={men}
          women={women}
          children={children}
          youth={youth}
          start_time={start_time}
          end_time={end_time}
          create_loading={create_loading}
          toggle={toggle}
          modal={modal}
          onHandleChange={onDataChange}
          handleSubmit={handleSubmit}
          serviceData={serviceData}
        />
      </Card>
      )}
      
    </div>
  )
}

export default Services;