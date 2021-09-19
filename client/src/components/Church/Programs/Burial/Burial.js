import { useHistory } from "react-router-dom";
import { Card, CardBody, Spinner, Table } from "reactstrap";
import { FaArrowLeft, FaTrash } from "react-icons/fa"
import { localAuth } from "../../../../helper/authenticate";
import Search from "../../../SearchComponent/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Burial.css";
import { serviceList, createService, deleteService, searchService } from "../../../../store/actions/actions_service";
import { Button } from "antd";
import { NewBurial } from "./NewBurial";

const Burial = () => {
  const dispatch = useDispatch();
  const { services, get_loading, docs, error, search_success, create_success, create_loading, delete_loading } = useSelector(state => state.service);

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
          <Button onClick={toggle} className="new-event-button">Create New Birthday</Button>
        </div>
        <CardBody>
          <div className="search-wrapper">
            <h1>Service Table</h1>
            <Search 
              search_term={search_term}
              onChange={onHandleChange}
            />
          </div>
          {search_success ? (
            <Table responsive>
              <thead>
                <th className="head">S/N</th>
                <th className="head">Service</th>
                <th className="head">Preacher</th>
                <th className="head">Message title</th>
                <th className="head">Bible Quote</th>
                <th className="head">Men</th>
                <th className="head">Women</th>
                <th className="head">Children</th>
                <th className="head">Youth</th>
                <th className="head">Start Time</th>
                <th className="head">End Time</th>
                <th className="head">Delete</th>
              </thead>
              <tbody>
                {services && services.length > 0 ? services.map((b, i) => {
                  console.log(b._id, "the id")
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
                <th className="head">S/N</th>
                <th className="head">Service</th>
                <th className="head">Preacher</th>
                <th className="head">Message title</th>
                <th className="head">Bible Quote</th>
                <th className="head">Men</th>
                <th className="head">Women</th>
                <th className="head">Children</th>
                <th className="head">Youth</th>
                <th className="head">Start Time</th>
                <th className="head">End Time</th>
                <th className="head">Delete</th>
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
        <NewBurial 
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

export default Burial;