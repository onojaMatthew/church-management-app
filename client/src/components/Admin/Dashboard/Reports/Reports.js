import React, { useEffect, useState } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import { Card, CardBody, Col, Row, Input, Spinner } from "reactstrap";
import { Button } from "antd";
import { FaEye, FaTrash } from "react-icons/fa";
import Search from "../../../SearchComponent/Search"
import { useDispatch, useSelector } from "react-redux";
import { go_remark, reportList, searchReport } from "../../../../store/actions/actions_report";
import { ReportDetails } from "./ReportDetails";

export const Reports = () => {
  const dispatch = useDispatch();
  const { reports, report_docs, delete_loading, list_loading, remark_loading } = useSelector(state => state.reportReducers);
  const [ search_term, setSearchTerm ] = useState("");
  const [ values, setValue ] = useState({ remark: "", approval: false });
  const [ report, setReport ] = useState({});
  const [ view, setView ] = useState(false);

  const { remark, approval } = values;
  const page = reports && reports.page,
    totalPages = reports && reports.totalPages,
    nextPage = reports && reports.nextPage,
    prevPage = reports && reports.prevPage;
  
  let report_paginate = [];
  for (let i = 1; i <= totalPages; i++) {
    report_paginate.push(i);
  }

  const handleFilterChange = () => {};

  const handleChange = (e) => {
    const { name } = e.target;
    if (name === "remark") {
      setValue({ ...values, "remark": e.target.value });
    } else {
      setValue({ ...values, "approval": e.target.checked });
    }
  };

  const handleDelete = () => {};

  const handleNextPage = () => {};

  const toggle = () => {
    setView(!view);
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  }

  useEffect(() => {
    dispatch(reportList())
  }, [ dispatch ]);

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

  const toggleView = (id) => {
    const details = report_docs && report_docs.find(f => f._id === id);
    setReport(details);
    setView(!view);
  }

  const handleSubmit = () => {
    const data = {
      remark, approval,
      reportId: report && report?._id
    }

    console.log(data, " the data")

    dispatch(go_remark(data));
  }

  useEffect(() => {
    if (search_term.length > 0) {
      dispatch(searchReport(search_term));
    }
  }, [ dispatch, search_term ]);

  return (
    <div>
      {view ?
        <ReportDetails
          toggle={toggle}
          report={report}
          remark={remark}
          approval={approval}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          remark_loading={remark_loading}
        /> : (
        <Row>
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Card id="income-card">
              <CardBody>
                <Row>
                  <Col xs="12" sm="12" md="12" lg="3" xl="3">
                    <p className="coord-header">Reports</p>
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
                      {report_docs && report_docs.length > 0 ? report_docs.map((c, i) => (
                        <Col xs="12" sm="12" md="12" lg="3" xl="3" className="mb-4 card-col">
                          <div className="coord-list-card">
                            <p className="coord-name">{c?.subject.length > 20 ? c?.subject.slice(0,15) + "..." : c?.subject}</p>
                            <p className='coord-email'>{c?.message.slice(0, 20)}</p>
                            <p className='coord-phone'>{c?.church && c?.church.branch}</p>
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
                      {report_paginate && report_paginate.map((p, i) => (
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
  );
}