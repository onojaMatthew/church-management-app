import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Input, Spinner } from "reactstrap";
import { AiOutlineFilter } from "react-icons/ai";
import { FaEye, FaTrash } from "react-icons/fa";
import Search from "../../../SearchComponent/Search";
import { Button, message } from "antd";
import { NewResidentPastor } from "./NewResidentPastor";
import { useDispatch, useSelector } from "react-redux";
import { ResidentPastorDetails } from "./ResidentPastorDetails";
import { fetch_all_church } from "../../../../store/actions/actions_church";

import "./Residence.css";

import { roleList } from "../../../../store/actions/actions_role";
import { add_resident_pastor, delete_resident_pastor, filter_resident_pastors, resident_pastor_list, search_resident_pastor } from "../../../../store/actions/actions_resident_pastor";
import { upload } from "../../../../store/actions/actions_uploader";

export const ResidentPastorList = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector(state => state.role);
  const { churches } = useSelector(state => state.church); 
  const [ validationError, setValidationError ] = useState([]);
  const { files, upload_loading, upload_success } = useSelector(state => state.upload);
  const { 
    resident_pastors, 
    pastor_docs, 
    assign_loading, 
    assign_church, 
    add_loading, 
    add_success, 
    delete_loading, 
    list_loading 
  } = useSelector(state => state.residentPastorReducer);
  const [ values, setValues ] = useState({ first_name: "", last_name: "", phone: "", email: "", password: "", role: "" });
  const [ church, setChurch ] = useState("");
  const [ uploadedFile, setUploadedPhoto ] = useState("");
  const [ filterData, setFilterData ] = useState("");
  const [ search_term, setSearchTerm ] = useState("");
  const [ pastorDetail, setPastorDetail ] = useState({});
  const [ isView, setIsView ] = useState(false);
  const [ modal, setModal ] = useState(false);

  const prevPage = resident_pastors && resident_pastors.prevPage,
    nextPage = resident_pastors && resident_pastors.nextPage,
    page = resident_pastors && resident_pastors.page,
    totalPages = resident_pastors && resident_pastors.totalPages;

  const toggle = () => {
    setModal(!modal);
  }

  const { first_name, last_name, phone, email, role } = values;

  const handleFilterChange = (e) => {
    const { value } = e.target;

    setFilterData(value);
  }

  const filters = [
    { name: "All", value: "all"},
    { name: "24 hours", value: "1 days" },
    { name: "Last 1 week", value: "1 weeks" },
    { name: "Last 2 week", value: "2 weeks" },
    { name: "Last 3 week", value: "3 weeks" },
    { name: "1 month ago", value: "1 months" },
    { name: "3 months ago", value: "3 months" },
    { name: "6 months ago", value: "6 months" },
    { name: "1 year ago", value: "12 months" }
  ];

  const handleChange = (e) => {
    setValidationError([]);
    const { value, name } = e.target;
    const newValues = { ...values, [name]: value }
    setValues(newValues);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      first_name, last_name, phone, email, role
    }
    dispatch(add_resident_pastor(data));
  }

  useEffect(() => {
    const limit = 10,
      offset = 1
    dispatch(fetch_all_church());
    dispatch(resident_pastor_list(offset, limit));
    dispatch(roleList());
  }, [ dispatch ]);

  const handleNextPage = (page) => {
    const offset = page;
    const limit = 10;
    dispatch(resident_pastor_list(offset, limit));
  }
  
  let coord_pagination = [];
  
  for (let i = 1; i <= totalPages; i++) {
    coord_pagination.push(i);
  }

  const toggleView = (id) => {
    const detail = pastor_docs.find(f => f._id === id);
    setPastorDetail(detail);
    setIsView(!isView);
  }

  const viewToggle = () => {
    setIsView(!isView);
  }

  const handleDelete = (e,id) => {
    e.preventDefault();
    dispatch(delete_resident_pastor(id));
  }

  const handleChurchChange =  (e) => {
    setChurch(e.target.value);
  }

  const handleChurchSubmit = () => {
    const data = { church, coordinatorId: pastorDetail && pastorDetail._id }
    if (church.length > 0) {
      dispatch(assign_church(data));
    } else {
      message.error("You must select a church to continue")
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    if (add_success) {
      setValues({ 
        first_name: "", 
        last_name: "", 
        phone: "", 
        email: "", 
        password: "", 
        role: "",
        uploadedFile: "",
      });
      setModal(false);
    }
  }, [ add_success ]);

  useEffect(() => {
    if (search_term.length > 0) {
      dispatch(search_resident_pastor(search_term))
    }
  }, [ dispatch, search_term ]);

  useEffect(() => {
    if (filterData.length > 0) {
      dispatch(filter_resident_pastors(filterData));
    }
  }, [ dispatch, filterData ]);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file && file.name) {
      dispatch(upload(file));
    }
  }

  useEffect(() => {
    if (upload_success) {
      setUploadedPhoto(files.secure_url);
    }
  }, [ upload_success ]);

  return (
    <>
      {modal ? (
        <NewResidentPastor
          first_name={first_name}
          last_name={last_name}
          email={email}
          roles={roles}
          phone={phone}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          modal={modal}
          toggle={toggle}
          add_loading={add_loading}
          handlePhoto={handlePhoto}
          uploadedFile={uploadedFile}
          validation_error={validationError}
          upload_loading={upload_loading}
          toggle={toggle}
        />
      ) : (
        <div>
          {isView ? 
            <ResidentPastorDetails
              viewToggle={viewToggle}
              isView={isView}
              pastorDetail={pastorDetail}
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
                    <Button onClick={() => toggle()} className="coord-action-btn">Create Resident Pastor</Button>
                  </Col>
                </Row>
                <Card id="income-card">
                  <CardBody>
                    <Row>
                      <Col xs="12" sm="12" md="12" lg="3" xl="3">
                      <p className="coord-header">Resident Pastors</p>
                      </Col>
                      <Col xs="12" sm="12" md="12" lg="6" xl="6">
                        <div className="search-container">
                          <Search search_term={search_term} onChange={handleSearch} />
                        </div>
                      </Col>
                      <Col xs="12" sm="12" md="12" lg="3" xl="3">
                        <div className="filter-container">
                          <Input type="select" id="filter-select" name="filterDate" onChange={(e) => handleFilterChange(e)}>
                            <option disabled={true}>Filter expenditure</option>
                            {filters.map((t, i) => (
                              <option value={t.value} key={i}>{t.name}</option>
                            ))}
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
                          {pastor_docs && pastor_docs.length > 0 ? pastor_docs.map((c, i) => (
                            <Col key={i} xs="12" sm="12" md="12" lg="3" xl="3" className="mb-4 card-col">
                              <div className="coord-list-card" key>
                                <p className="coord-name">{c?.first_name}{" "}{c?.last_name}</p>
                                <p className='coord-email'>{c?.email}</p>
                                <p className='coord-phone'>{c?.phone}</p>
                                <div className='icon-cont'>
                                  <p onClick={() => toggleView(c._id)} className="eye-btn"><FaEye /></p>
                                  <p onClick={(e) => handleDelete(e, c._id)} className="trash-btn">
                                    {delete_loading ? (
                                      <Spinner color="#fff">
                                        <span className="visually-hidden">Deleting...</span>
                                      </Spinner>
                                    ) : <FaTrash />}
                                  </p>
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
                    {totalPages && totalPages > 1 ? (
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
        </div>
      )}
    </>
  );
}