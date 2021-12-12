import React, { useEffect, useState } from "react";
import { Card, CardBody, Spinner, Row, Col } from "reactstrap";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { coordinating_church_list } from "../../../../../store/actions/actions_zonal_pastor";
import { Church } from "../ChurchDetail/Church";

import "./ChurchList.css";
import { fetchExpenditure, getTotal } from "../../../../../store/actions/actions_expenditure";
import { fetchIncome } from "../../../../../store/actions/actions_finance";

const ChurchList = () => {
  const dispatch = useDispatch();
  const { church_list_loading, church_list, coordinator_docs } = useSelector(state => state.coordinatorReducer);
  const { expenditure, exp_docs, expenditures } = useSelector(state => state.expenditureReducer);
  const { docs, income_list } = useSelector(state => state.finance);
  const [ detail, setChurchDetail ] = useState({});
  const [ nextAttr, setNextArr ] = useState({ totalPages: "", page: "", nextPage: "", prevPage: "" });
  const [ isView, setIsView ] = useState(false);

  useEffect(() => {
    const offset = 1;
    const limit = 10;
    dispatch(coordinating_church_list(offset, limit));
  }, [ dispatch ]);

  const handleNextPage = (page_number) => {
    const offset = page_number;
    const limit = 10;
    const data = { offset, limit };
    dispatch(coordinating_church_list(data));
  }

  const totalPages = church_list?.totalPages;
  const page = church_list?.page;
  const prevPage = church_list?.prevPage;
  const nextPage = church_list?.nextPage;

  let paginateArr = [];
  for (let i = 1; i <= totalPages; i++) {
    paginateArr.push(i);
  }

  const toggleView = (id) => {
    const detail = coordinator_docs.find(f => f._id === id);
    setChurchDetail(detail);
    setIsView(!isView);
  }

  useEffect(() => {
    if (detail && detail._id?.length > 0) {
      const offset = 1;
      const limit = 2;
      dispatch(getTotal(detail?._id));
      dispatch(fetchExpenditure(detail?._id, offset, limit));
      dispatch(fetchIncome(detail?._id, offset, limit));
    }
  }, [ dispatch, detail ]);

  useEffect(() => {
    if (expenditures) {
      setNextArr({
        page: expenditures?.page,
        totalPages: expenditures?.totalPages,
        nextPage: expenditures?.nextPage,
        prevPage: expenditures?.nextPage
      })
    }
  }, [ expenditures ])

  const handleNextExp = (page) => {
    const offset = page, limit = 2;
    dispatch(fetchExpenditure(detail?._id, offset, limit))
  }
  
  const handleNextInc = (page) => {
    const offset = page, limit = 2;
    dispatch(fetchIncome(detail?._id, offset, limit));
  }

  return (
    <div>
      <Card className="church-card">
        <CardBody>
          {isView ? 
            <Church 
              detail={detail} 
              expenditure={expenditure} 
              handleNextExp={handleNextExp} 
              nextAttr={nextAttr} 
              exp_docs={exp_docs} 
              docs={docs}
              income_list={income_list}
              handleNextInc={handleNextInc}
            /> : (
            <>
              <Row>
                <Col xs="12" sm="12" md="12" lg="3" xl="3">
                <p className="coord-header">Church List</p>
                </Col>
              </Row>
              <div>
              {church_list_loading ? (
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
                      <div className="church-list-card" key>
                        <p className="church-name">{c?.head_pastor}</p>
                        <p className='church-branch'>{c?.branch}</p>
                        <p className='church-email'>{c?.email}</p>
                        <p className='church-phone'>{c?.phone}</p>
                        <div className='icon-conts'>
                          <p onClick={() => toggleView(c._id)} className="eye-btn"><FaEye /></p>
                        </div>
                      </div>
                    </Col>
                  )) : <h2 className="text-center">No Records Found</h2>}
                  </Row>
                </div>
              )}
              </div>
              <div className="justify-content-center">
                {totalPages > 1 ? (
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
            </>
          )}
        </CardBody>  
      </Card>
    </div>
  )
}

export default ChurchList;