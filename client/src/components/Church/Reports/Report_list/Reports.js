import React, { useEffect, useState } from "react";
import { localAuth } from "../../../../helper/authenticate";
import { Col, Row, Card, CardBody, Input, Spinner } from "reactstrap";
import { Button } from "antd";
import { AiOutlineFilter } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux";
import Search from "../../../SearchComponent/Search";
import { churchReports, createReport } from "../../../../store/actions/actions_report";

import "./Report.css";
import { churchDetails } from "../../../../store/actions/actions_church";
import { NewReport } from "../CreateReport/NewReport";

export const ReportList  = () => {
  const dispatch = useDispatch();
  const { reports, report_docs, create_loading, church_reports_loading } = useSelector(state => state.reportReducers);
  // const { church } = useSelector(state => state.church);
  const [ coordinator, setCoordinator ] = useState({ first_name: "", last_name: "", _id: "" });
  const [ filterData, setFilterData ] = useState("");
  const [ regionalPastor, setRegionalPastor ] = useState({ first_name: "", last_name: "", _id: "" });
  const [ values, setValues ] = useState({ message: "", subject: "" });
  const [ id, setId ] = useState("");
  const [ search_term, setSearchTerm ] = useState("");
  const [ modal, setModal ] = useState(false);

  const { totalPages, nextPage, page, prevPage } = reports;

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

  const { message, subject } = values;

  const handleFilterChange = (e) => {
    const { value } = e.target;

    setFilterData(value)
  }

  const toggle = () => {
    setModal(!modal);
  }

  useEffect(() => {
    // dispatch(churchReports());
    if (localAuth().church && localAuth().church._id) {
      setId(localAuth().church && localAuth().church._id);
      setCoordinator({ 
        first_name: localAuth().church && localAuth().church.zonal_pastor?.first_name, 
        last_name: localAuth().church && localAuth().church.zonal_pastor?.last_name, 
        _id: localAuth().church && localAuth().church.zonal_pastor?._id
      });
      setRegionalPastor({ 
        first_name: localAuth().church && localAuth().church.regional_pastor?.first_name, 
        last_name: localAuth().church && localAuth().church.regional_pastor?.last_name, 
        _id: localAuth().church && localAuth().church.regional_pastor?._id
      });
    }
  }, []);

  useEffect(() => {
    const offset = 1;
    const limit = 10;
    if (id.length > 0) {
      dispatch(churchReports(id, offset, limit));
    }
  }, [ id, dispatch ]);


  const handleNextPage = (page) => {
    const offset = page;
    const limit = 10;
    dispatch(churchReports(id, offset, limit));
  }

  let report_pagination = [];
  for (let i = 1; i <= totalPages; i++) {
    report_pagination.push(i);
  }

  const handleChange = (e) => {
    const { value, name } = e.target;

    const newValues = {...values, [name]: value };
    setValues(newValues);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      regional_pastor: "",
      zonal_pastor: coordinator && coordinator._id,
      subject,
      message,
      church: id
    }

    console.log(data, " coordinator id")
    dispatch(createReport(data))
  }

 
  return (
    <div>
      <Row>
        <Col xs="12" sm="12" md="12" lg="12" xl="12">
          <Row>
            <Col xs="12" sm="12" md="12" lg="8"></Col>
            <Col xs="12" sm="12" md="12" lg="2"></Col>
            <Col xs="12" sm="12" md="12" lg="2">
              <Button onClick={() => toggle()} className="action-btn">Create Report</Button>
            </Col>
          </Row>
          <Card id="income-card">
            <CardBody>
              <Row>
                <Col xs="12" sm="12" md="12" lg="3" xl="3">
                <h3>Reports</h3>
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
                      {filters.map((t, i) => (
                        <option value={t.value} key={i}>{t.name}</option>
                      ))}
                    </Input>
                    <AiOutlineFilter style={{ color: "#fff", fontSize: 45 }} />
                  </div>
                </Col>
              </Row>

              <div>
                {church_reports_loading ? (
                  <div className="text-center spin">
                    <Spinner className="my-loader">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <div>
                    <Row>
                    {report_docs && report_docs.length > 0 ? report_docs.map((d, i) => (
                      <Col xs="12" sm="12" md="12" lg="3" xl="3" className="mb-4 card-col">
                        <Card className="report-card">
                          <CardBody className="report-card-body">
                            <h5 className="title">{d && d?.subject}</h5>
                            <h5 className="title">{d && d?.message.slice(0, 20)}</h5>
                          </CardBody>
                        </Card>
                      </Col>
                    )) : <h2 className="text-center">No Records Found</h2>}
                    </Row>
                  </div>
                )}
              </div>
            </CardBody>
            <div className="justify-content-center">
              {reports && reports.totalPages && reports.totalPages > 1 ? (
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center mt-5">
                    <li className="page-item">
                      <span className="page-link" onClick={() => handleNextPage(prevPage)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </span>
                    </li>
                    {report_pagination && report_pagination.map((p, i) => (
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
      <NewReport
        modal={modal}
        toggle={toggle}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        coordinator={coordinator}
        subject={subject}
        message={message}
        create_loading={create_loading}
        regionalPastor={regionalPastor}
      />
    </div>   
  )
}