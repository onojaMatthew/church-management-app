import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Input } from "reactstrap";
import { AiOutlineFilter } from "react-icons/ai";
import Search from "../../../SearchComponent/Search";
import { Button } from "antd";
import { NewCoordinator } from "./NewCoordinator";
import { useDispatch, useSelector } from "react-redux";
import { churchList, fetch_all_church } from "../../../../store/actions/actions_church";

export const CoordinatorList = () => {
  const dispatch = useDispatch();
  const { churches, error } = useSelector(state => state.church); 
  const [ values, setValues ] = useState({ first_name: "", last_name: "", phone: "", email: "", password: "" })
  const [ search_term, setSearchTerm ] = useState("");
  const [ modal, setModal ] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  const { first_name, last_name, phone, email, password } = values;

  const handleFilterChange = (e) => {

  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newValues = { ...values, [name]: value }
    setValues(newValues);
  }

  const handleSubmit = (e) => {}

  useEffect(() => {
    dispatch(fetch_all_church());
  }, [ dispatch ]);

  console.log(churches, " all the churches")
  return (
    <div>
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
                      {/* {filters.map((t, i) => (
                        <option value={t.value} key={i}>{t.name}</option>
                      ))} */}
                    </Input>
                    <AiOutlineFilter style={{ color: "#fff", fontSize: 45 }} />
                  </div>
                </Col>
              </Row>

              <div>
                {/* {church_reports_loading ? (
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
                )} */}
              </div>
            </CardBody>
            {/* <div className="justify-content-center">
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
            </div> */}
          </Card>
        </Col>
      </Row> 
      <NewCoordinator
        first_name={first_name}
        last_name={last_name}
        email={email}
        password={password}
        phone={phone}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        modal={modal}
        toggle={toggle}
      />
    </div>
  );
}