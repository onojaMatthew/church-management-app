import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Input, Spinner } from "reactstrap";
import { AiOutlineFilter } from "react-icons/ai";
import { FaEye, FaTrash } from "react-icons/fa";
import Search from "../../../SearchComponent/Search";
import { Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetch_all_church } from "../../../../store/actions/actions_church";
import { 
  add_regional_pastor, 
  assign_church, 
  regional_pastor_list, 
  delete_regional_pastor, 
  search_regional_pastors, 
  filter_regional_pastors 
} from "../../../../store/actions/actions_regional_pastor";

import "./RegionalPastor.css";
import { roleList } from "../../../../store/actions/actions_role";
import { RegionalPastorDetails } from "./RegionalPastorDetail";
import { NewRegionalPastor } from "./NewRegionalPastor";
import { upload } from "../../../../store/actions/actions_uploader";

export const RegionalPastorList = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector(state => state.role);
  const { churches } = useSelector(state => state.church);
  const { files, upload_loading, upload_success } = useSelector(state => state.upload);
  const { regional_pastors, regional_pastor_docs, assign_loading, add_loading, add_success, delete_loading, list_loading } = useSelector(state => state.regionalPastorReducer);
  const [ values, setValues ] = useState({ first_name: "", last_name: "", phone: "", email: "", password: "", region: "", role: "" });
  const [ church, setChurch ] = useState("");
  const [ uploadedFile, setUploadedPhoto ] = useState("");
  const [ filterData, setFilterData ] = useState("")
  const [ search_term, setSearchTerm ] = useState("");
  const [ regionalPastorDetail, setRegionalPastorDetail ] = useState({});
  const [ isView, setIsView ] = useState(false);
  const [ modal, setModal ] = useState(false);

  const prevPage = regional_pastors && regional_pastors.prevPage,
    nextPage = regional_pastors && regional_pastors.nextPage,
    page = regional_pastors && regional_pastors.page,
    totalPages = regional_pastors && regional_pastors.totalPages;

  const toggle = () => {
    setModal(!modal);
  }

  const { first_name, last_name, phone, email, password, role, region } = values;

  const handleFilterChange = (e) => {
    const { value } = e.target;

    setFilterData(value)
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
    const { value, name } = e.target;
    const newValues = { ...values, [name]: value }
    setValues(newValues);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      first_name, 
      last_name, 
      phone, 
      email, 
      password, 
      role, 
      region,
      image_url: uploadedFile
    }
    dispatch(add_regional_pastor(data));
  }

  useEffect(() => {
    const limit = 10,
      offset = 1
    dispatch(fetch_all_church());
    dispatch(regional_pastor_list(offset, limit));
    dispatch(roleList());
  }, [ dispatch ]);

  const handleNextPage = (page) => {
    const offset = page;
    const limit = 10;
    dispatch(regional_pastor_list(offset, limit));
  }
  
  let coord_pagination = [];
  
  for (let i = 1; i <= totalPages; i++) {
    coord_pagination.push(i);
  }

  const toggleView = (id) => {
    const detail = regional_pastor_docs.find(f => f._id === id);
    setRegionalPastorDetail(detail);
    setIsView(!isView);
  }

  const viewToggle = () => {
    setIsView(!isView);
  }

  const handleDelete = (e,id) => {
    e.preventDefault();
    dispatch(delete_regional_pastor(id));
  }

  const handleChurchChange =  (e) => {
    setChurch(e.target.value);
  }

  const handleChurchSubmit = () => {
    const data = { church, regional_pastor_id: regionalPastorDetail && regionalPastorDetail._id }
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
        region: "" 
      });

      setModal(false);
    }
  }, [ add_success ]);

  useEffect(() => {
    if (search_term.length > 0) {
      dispatch(search_regional_pastors(search_term))
    }
  }, [ dispatch, search_term ]);

  useEffect(() => {
    if (filterData.length > 0) {
      dispatch(filter_regional_pastors(filterData));
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
      console.log(files, " the response");
      setUploadedPhoto(files.secure_url);
    }
  });

  return (
    <>
      {modal ? (
        <NewRegionalPastor
          first_name={first_name}
          last_name={last_name}
          email={email}
          password={password}
          roles={roles}
          phone={phone}
          region={region}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          modal={modal}
          toggle={toggle}
          add_loading={add_loading}
          handlePhoto={handlePhoto}
          uploadedFile={uploadedFile}
        />
      ) : (
        <div>
          {isView ? 
            <RegionalPastorDetails
              viewToggle={viewToggle}
              isView={isView}
              regionalPastorDetail={regionalPastorDetail}
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
                    <Button onClick={() => toggle()} className="coord-action-btn">Create Regional Pastor</Button>
                  </Col>
                </Row>
                <Card id="income-card">
                  <CardBody>
                    <Row>
                      <Col xs="12" sm="12" md="12" lg="3" xl="3">
                      <p className="coord-header">Regional Pastors</p>
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
                          {regional_pastor_docs && regional_pastor_docs.length > 0 ? regional_pastor_docs.map((c, i) => (
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