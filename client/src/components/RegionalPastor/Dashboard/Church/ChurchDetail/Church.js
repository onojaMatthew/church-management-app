import React from "react";
import { FaChevronLeft, FaChevronRight, FaUsers } from "react-icons/fa";
import { Col, Row, Table } from "reactstrap";

import "./Church.css";

export const Church = ({
  detail,
  expenditure,
  nextAttr,
  exp_docs,
  handleNextExp,
  docs,
  income_list,
  handleNextInc,
}) => {

  let exp_cost_arr = [];
  exp_docs && exp_docs.forEach(e => exp_cost_arr.push(e.cost));
  const date = new Date(detail?.createdAt);

  let fin_cost_arr = [];
  docs && docs.forEach(f => fin_cost_arr.push(f.amount))
  return (
    <div>
      <Row>
        <Col xs="12" sm="12" md="12" lg="3" xl="3" className="church-det-col">
          <div className="detail-card">
            <Row>
              <Col xs="3" sm="3" md="3" lg="3" className="pt-3">
                <div className="detail-icon">
                  <FaUsers style={{ color: "blue", height: "23px", width: "33px", opacity: 1 }} />
                </div>
              </Col>
              <Col xs="9" sm="9" md="9" lg="9" className="pt-3">
                <p className="data-label">Members</p>
                <p className="data">{detail?.members?.length}</p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs="12" sm="12" md="12" lg="3" xl="3" className="church-det-col">
          <div className="detail-card">
            <Row>
              <Col xs="3" sm="3" md="3" lg="3" className="pt-3">
                <div className="detail-icon">
                  <FaUsers style={{ color: "blue", height: "23px", width: "33px", opacity: 1 }} />
                </div>
              </Col>
              <Col xs="9" sm="9" md="9" lg="9" className="pt-3">
                <p className="data-label">Income</p>
                <p className="data"><span className="currency">&#8358;</span> {expenditure?.income ? expenditure?.income : "0.00"}</p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs="12" sm="12" md="12" lg="3" xl="3" className="church-det-col">
          <div className="detail-card">
            <Row>
              <Col xs="3" sm="3" md="3" lg="3" className="pt-3">
                <div className="detail-icon">
                  <FaUsers style={{ color: "blue", height: "23px", width: "33px", opacity: 1 }} />
                </div>
              </Col>
              <Col xs="9" sm="9" md="9" lg="9" className="pt-3">
                <p className="data-label">Expenditure</p>
                <p className="data"><span className="currency">&#8358;</span> {expenditure?.expenses}</p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs="12" sm="12" md="12" lg="3" xl="3" className="church-det-col">
          <div className="detail-card">
            <Row>
              <Col xs="3" sm="3" md="3" lg="3" className="pt-3">
                <div className="detail-icon">
                  <FaUsers style={{ color: "blue", height: "23px", width: "33px", opacity: 1 }} />
                </div>
              </Col>
              <Col xs="9" sm="9" md="9" lg="9" className="pt-3">
                <p className="data-label">Officers</p>
                <p className="data">{detail?.officers?.length}</p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <div className="church-info">
        <Row className="4">
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Table bordered responsive>
              <thead className="my-table">
                <th>Head Pastor</th>
                <th>Zonal Pastor</th>
                <th>Branch</th>
                <th>State</th>
                <th>City</th>
                <th>Street</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Bank Name</th>
                <th>Acct. No</th>
                <th>Acct. Holder</th>
                <th>Created At</th>
              </thead>
              <tbody>
                <tr>
                  <td>{detail?.head_pastor?.first_name} {detail?.head_pastor?.last_name}</td>
                  <td>{detail?.zonal_pastor?.first_name} {detail?.zonal_pastor?.last_name}</td>
                  <td>{detail?.branch}</td>
                  <td>{detail?.address?.state}</td>
                  <td>{detail?.address?.city}</td>
                  <td>{detail?.address?.street}</td>
                  <td>{detail?.email}</td>
                  <td>{detail?.phone}</td>
                  <td>{detail?.bank?.bank_name}</td>
                  <td>{detail?.bank?.acct_no}</td>
                  <td>{detail?.bank?.acct_name}</td>
                  <td>{date.toLocaleDateString()}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
      <Row className="mt-4">
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <div className="income-col">
            <p className="income-table-title">Income Table</p>
            <p>Total: <strong>&#8358; {fin_cost_arr.reduce((a, b) => a + b, 0)}</strong></p>
            <Table bordered responsive>
              <thead className="my-table">
                <th>Income Category</th>
                <th>Service Type</th>
                <th>Amount</th>
                <th>Created By</th>
                <th>Date</th>
              </thead>
              <tbody>
                {docs && docs.length > 0 ? docs.map((d, i) => {
                  const c_date = new Date(d?.date)
                  return (
                    <tr key={i}>
                      <td>{d?.category}</td>
                      <td>{d?.service_type}</td>
                      <td>{d?.amount}</td>
                      <td>{d?.created_by}</td>
                      <td>{c_date.toLocaleDateString()}</td>
                    </tr>
                  )
                }) : <h4 className="text-center">No Records</h4>}
              </tbody>
            </Table>
            <div className="chevron">
              <div>
                <p>Page <strong>{income_list?.page}</strong> of <strong>{income_list?.totalPages}</strong></p>
                <FaChevronLeft onClick={() => handleNextInc(income_list?.page - 1)} id="chev-left" /><FaChevronRight onClick={() => handleNextInc(income_list?.page + 1)} id="chev-right" />
              </div>
            </div>
          </div>
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <div className="expenditure-col">
            <p className="income-table-title">Expenditure Table</p>
            <p >Total: <strong>&#8358; {exp_cost_arr && exp_cost_arr.reduce((a, b) => a + b, 0)}</strong></p>
            <Table bordered responsive>
              <thead className="my-table">
                <th>Item</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Authorized By</th>
                <th>Purchased By</th>
                <th>Date</th>
              </thead>
              <tbody>
                {exp_docs?.length > 0 ? exp_docs.map((e,i) => {
                  const e_date = new Date(e?.createdAt);
                  return (
                    <tr key={i}>
                    <td>{e?.item}</td>
                    <td>{e?.unit_price}</td>
                    <td>{e?.quantity}</td>
                    <td>{e?.cost}</td>
                    <td>{e?.authorized_by}</td>
                    <td>{e?.purchased_by}</td>
                    <td>{e_date.toLocaleDateString()}</td>
                  </tr>
                  )}  
                ) : <h4 className="text-center">No Records</h4>}
                
              </tbody>
            </Table>
            <div className="chevron">
              <div>
                <p>Page <strong>{nextAttr?.page}</strong> of <strong>{nextAttr?.totalPages}</strong></p>
                <FaChevronLeft onClick={() => handleNextExp(nextAttr?.page - 1)} id="chev-left" /><FaChevronRight onClick={() => handleNextExp(nextAttr?.page + 1)} id="chev-right" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}