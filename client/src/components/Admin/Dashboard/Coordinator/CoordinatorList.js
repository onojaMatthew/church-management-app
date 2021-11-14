import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Input, Spinner } from "reactstrap";
import { AiOutlineFilter } from "react-icons/ai";
import { FaEye, FaTrash } from "react-icons/fa";
import Search from "../../../SearchComponent/Search";
import { Button, message } from "antd";
import { NewCoordinator } from "./NewCoordinator";
import { useDispatch, useSelector } from "react-redux";
import { CoordinatorDetails } from "./CoordinatorDetails";
import { fetch_all_church } from "../../../../store/actions/actions_church";
import { assign_church, coordinator_list, delete_coordinator } from "../../../../store/actions/actions_coordinator";

import "./Coordinator.css";
import { roleList } from "../../../../store/actions/actions_role";

export const CoordinatorList = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector(state => state.role);
  const { churches, error } = useSelector(state => state.church); 
  const { coordinators, coordinator_docs, assign_loading, list_loading } = useSelector(state => state.coordinatorReducer);
  const [ values, setValues ] = useState({ first_name: "", last_name: "", phone: "", email: "", password: "", role: "" });
  const [ church, setChurch ] = useState("");
  const [ search_term, setSearchTerm ] = useState("");
  const [ coordinatorDetail, setCoordinatorDetail ] = useState({});
  const [ isView, setIsView ] = useState(false);
  const [ modal, setModal ] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const { first_name, last_name, phone, email, password, role } = values;

  const handleFilterChange = (e) => {

  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newValues = { ...values, [name]: value }
    setValues(newValues);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      first_name, last_name, phone, email, password, role
    }
    console.log(data, " data in handle submit")
  }

  useEffect(() => {
    const limit = 10,
      offset = 1
    dispatch(fetch_all_church());
    dispatch(coordinator_list(offset, limit));
    dispatch(roleList());
  }, [ dispatch ]);

  const handleNextPage = (page) => {
    const offset = page;
    const limit = 10;
    dispatch(coordinator_list(offset, limit));
  }

  const { prevPage, nextPage, page, totalPages } = coordinators;
  let coord_pagination = [];
  
  for (let i = 1; i <= totalPages; i++) {
    coord_pagination.push(i);
  }

  const toggleView = (id) => {
    const detail = coordinator_docs.find(f => f._id === id);
    setCoordinatorDetail(detail);
    setIsView(!isView);
  }

  const viewToggle = () => {
    setIsView(!isView);
  }

  const handleDelete = (id) => {
    dispatch(delete_coordinator(id));
  }

  const handleChurchChange =  (e) => {
    setChurch(e.target.value);
  }

  const handleChurchSubmit = () => {
    const data = { church, coordinatorId: coordinatorDetail&& coordinatorDetail._id }
    console.log(data, " the data")
    if (church.length > 0) {
      dispatch(assign_church(data));
    } else {
      message.error("You must select a church to continue")
    }
  }

  console.log(roles, " the roles")
  return (
    <div>
      {isView ? 
        <CoordinatorDetails
          viewToggle={viewToggle}
          isView={isView}
          coordinatorDetail={coordinatorDetail}
          church={churches}
          assign_loading={assign_loading}
          handleChurchSubmit={handleChurchSubmit}
          handleChurchChange={handleChurchChange}
        /> : (
        <Row>
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Row>
              <Col xs="12" sm="12" md="12" lg="8"></Col>
              <Col xs="12" sm="12" md="12" lg="2"></Col>
              <Col xs="12" sm="12" md="12" lg="2">
                <Button onClick={() => toggle()} className="action-btn">Create Coordinator</Button>
              </Col>
            </Row>
            <Card id="income-card">
              <CardBody>
                <Row>
                  <Col xs="12" sm="12" md="12" lg="3" xl="3">
                  <h1>Reports</h1>
                  </Col>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6">
                    <div className="search-container">
                      <Search search_term={search_term} />
                    </div>
                  </Col>
                  <Col xs="12" sm="12" md="12" lg="3" xl="3">
                    <div className="filter-container">
                      <Input type="select" id="filter-select" name="filterDate" onChange={(e) => handleFilterChange(e)}>
                        <option disabled={true}>Filter expenditure</option>
                        {/* {filters.map((t, i) => (
                          <option value={t.value} key={i}>{t.name}</option>
                        ))} */}
                      </Input>
                      <AiOutlineFilter style={{ color: "#fff", fontSize: 45 }} />
                    </div>
                  </Col>
                </Row>

                <div>
                  {list_loading ? (
                    <div className="text-center spin">
                      <Spinner className="my-loader">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : (
                    <div>
                      <Row>
                      {coordinator_docs && coordinator_docs.length > 0 ? coordinator_docs.map((c, i) => (
                        <Col key={i} xs="12" sm="12" md="12" lg="3" xl="3" className="mb-4 card-col">
                          <div className="coord-list-card" key>
                            <p className="coord-name">{c?.first_name}{" "}{c?.last_name}</p>
                            <p className='coord-email'>{c?.email}</p>
                            <p className='coord-phone'>{c?.phone}</p>
                            <div className='icon-cont'>
                              <p onClick={() => toggleView(c._id)} className="eye-btn"><FaEye /></p>
                              <p onClick={() => handleDelete(c._id)} className="trash-btn"><FaTrash /></p>
                            </div>
                          </div>
                        </Col>
                      )) : <h2 className="text-center">No Records Found</h2>}
                      </Row>
                    </div>
                  )}
                </div>
              </CardBody>
              <div className="justify-content-center">
                {coordinators && coordinators.totalPages && coordinators.totalPages > 1 ? (
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center mt-5">
                      <li className="page-item">
                        <span className="page-link" onClick={() => handleNextPage(prevPage)} aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </span>
                      </li>
                      {coord_pagination && coord_pagination.map((p, i) => (
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
            </Card>
          </Col>
        </Row> 
      )}
      <NewCoordinator
        first_name={first_name}
        last_name={last_name}
        email={email}
        password={password}
        roles={roles}
        phone={phone}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        modal={modal}
        toggle={toggle}
      />
    </div>
  );
}