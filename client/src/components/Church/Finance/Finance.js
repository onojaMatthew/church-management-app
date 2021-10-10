import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Card, CardBody, Col, Row, Table } from "reactstrap";

const Finance = () => {


  return (
    <div>
      <Row>
        <Col xs="12" sm="12" md="12" lg="12" xl="12">
          <div>

          </div>
          <Card>
            <CardBody>
              <h3>Income Table</h3>
              <Table responsive>
                <thead>
                  <th>S/N</th>
                  <th>Income Category</th>
                  <th>Service Type</th>
                  <th>Amount</th>
                  <th>Created By</th>
                  <th>Date</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Offering</td>
                    <td>Sunday Service</td>
                    <td>N 3,130,000.00</td>
                    <td>Anonymous Member</td>
                    <td>03/10/2021</td>
                    <td><FaTrash /></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Offering</td>
                    <td>Sunday Service</td>
                    <td>N 3,130,000.00</td>
                    <td>Anonymous Member</td>
                    <td>03/10/2021</td>
                    <td><FaTrash /></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Offering</td>
                    <td>Sunday Service</td>
                    <td>N 3,130,000.00</td>
                    <td>Anonymous Member</td>
                    <td>03/10/2021</td>
                    <td><FaTrash /></td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
            {/* <div className="justify-content-center">
            {birthdays && birthdays.totalPages && birthdays.totalPages > 1 ? (
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
          </div> */}
          </Card>
        </Col>
        
      </Row>
      <Row className="mt-4">
        <Col xs="12" sm="12" md="12" lg="12" xl="12">
          <div>

          </div>
          <Card>
            <CardBody>
              <h3>Expenditure Table</h3>
              <Table responsive>
                <thead>
                  <th>S/N</th>
                  <th>Item</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Authorized By</th>
                  <th>Purchased By</th>
                  <th>Date</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Table water</td>
                    <td>N 100.00</td>
                    <td>24</td>
                    <td>N 2,400.00</td>
                    <td>Pastor Lawrence Eghene</td>
                    <td>Lawrence Eghene</td>
                    <td>03/10/2021</td>
                    <td><FaTrash /></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Table water</td>
                    <td>N 100.00</td>
                    <td>24</td>
                    <td>N 2,400.00</td>
                    <td>Pastor Lawrence Eghene</td>
                    <td>Lawrence Eghene</td>
                    <td>03/10/2021</td>
                    <td><FaTrash /></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table water</td>
                    <td>N 100.00</td>
                    <td>24</td>
                    <td>N 2,400.00</td>
                    <td>Pastor Lawrence Eghene</td>
                    <td>Lawrence Eghene</td>
                    <td>03/10/2021</td>
                    <td><FaTrash /></td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
            {/* <div className="justify-content-center">
            {birthdays && birthdays.totalPages && birthdays.totalPages > 1 ? (
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
          </div> */}
          </Card>
        </Col>
        
      </Row>
    </div>
  );
}

export default Finance;