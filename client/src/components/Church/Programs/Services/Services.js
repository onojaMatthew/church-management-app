import { useHistory } from "react-router-dom";
import { Card, CardBody, Spinner, Table, Row, Col, Input } from "reactstrap";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { AiOutlineFilter } from "react-icons/ai";
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
  const { services, get_loading, docs, error, search_success, create_success, create_loading, delete_loading } = useSelector(state => state.service);

  const [ search_term, setSearchTerm ] = useState("");
  const [ modal, setModal ] = useState(false);
  const [ filter_data, setFilterData ] = useState("");
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

  const filterData = [
    { name: "All", value: "all"},
    { name: "24 hours", value: "1 days" },
    { name: "Last 1 week", value: "1 weeks" },
    { name: "Last 2 week", value: "2 weeks" },
    { name: "Last 3 week", value: "3 weeks" },
    { name: "1 month ago", value: "1 months" },
    { name: "3 months ago", value: "3 months" },
    { name: "6 months ago", value: "6 months" },
    { name: "1 year ago", value: "12 months" }
  ]

  const handleFilterChange = (e) => {
    const { value } = e.target;

    setFilterData(value)
  }

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

  useEffect(() => {
    if (create_success) {
      setServiceData({
        name: "", 
        preacher: "", 
        topic: "", 
        bible_quote: "", 
        men: "", 
        women: "", 
        children: "", 
        youth: "", 
        start_time: "", 
        end_time: ""
      });
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
          <FaArrowLeft onClick={() => history.goBack()} size={30} color="#1890ff" />
        <div>
          <Button onClick={toggle} className="new-event-button">Create New Program</Button>
        </div>
        <CardBody>
          <Row>
            <Col xs="12" sm="12" md="12" lg="3" xl="3">
            <p className="table-title">Service Table</p>
            </Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6">
              <div className="search-container">
                <Search onChange={onHandleChange} search_term={search_term} />
              </div>
            </Col>
            <Col xs="12" sm="12" md="12" lg="3" xl="3">
              <div className="filter-container">
                <Input type="select" id="filter-select" name="filterDate" onChange={(e) => handleFilterChange(e)}>
                  <option disabled={true}>Filter expenditure</option>
                  {filterData.map((t, i) => (
                    <option value={t.value} key={i}>{t.name}</option>
                  ))}
                </Input>
                <AiOutlineFilter style={{ color: "#fff", fontSize: 45 }} />
              </div>
            </Col>
          </Row>
          
          {search_success ? (
            <Table responsive>
              <tr>
                <th className="group-header">S/N</th>
                <th className="group-header">Service</th>
                <th className="group-header">Preacher</th>
                <th className="group-header">Message title</th>
                <th className="group-header">Bible Quote</th>
                <th className="group-header">Men</th>
                <th className="group-header">Women</th>
                <th className="group-header">Children</th>
                <th className="group-header">Youth</th>
                <th className="group-header">Start Time</th>
                <th className="group-header">End Time</th>
                <th className="group-header">Delete</th>
              </tr>
              <tbody>
                {services && services.length > 0 ? services.map((b, i) => {
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
                    <td onClick={() => onDelete(b?._id)}>{delete_loading ?  (
                      <Spinner>
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : <FaTrash color="#ff0000" />}</td>
                  </tr>
                  )}) : <h2 className="text-center mt-5">No results found</h2>}
              </tbody>
            </Table>
          ) : (
            <Table responsive>
              <thead>
                <th className="group-header">S/N</th>
                <th className="group-header">Service</th>
                <th className="group-header">Preacher</th>
                <th className="group-header">Message title</th>
                <th className="group-header">Bible Quote</th>
                <th className="group-header">Men</th>
                <th className="group-header">Women</th>
                <th className="group-header">Children</th>
                <th className="group-header">Youth</th>
                <th className="group-header">Start Time</th>
                <th className="group-header">End Time</th>
                <th className="group-header">Delete</th>
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
                    <td onClick={() => onDelete(b._id)}>{delete_loading ?  (
                      <Spinner>
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : <FaTrash color="#ff0000" />}</td>
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