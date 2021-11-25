import React from "react";
import { FaUsers } from "react-icons/fa";
import { Col, Row } from "reactstrap";

import "./Church.css";

export const Church = ({
  detail
}) => {

  console.log(detail, " the detail in detail");
  return (
    <div>
      <Row>
        <Col xs="12" sm="12" md="12" lg="3" xl="3">
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
        <Col xs="12" sm="12" md="12" lg="3" xl="3">
          <div className="detail-card">
            <Row>
              <Col xs="3" sm="3" md="3" lg="3" className="pt-3">
                <div className="detail-icon">
                  <FaUsers style={{ color: "blue", height: "23px", width: "33px", opacity: 1 }} />
                </div>
              </Col>
              <Col xs="9" sm="9" md="9" lg="9" className="pt-3">
                <p className="data-label">Income</p>
                <p className="data">30</p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs="12" sm="12" md="12" lg="3" xl="3">
          <div className="detail-card">
            <Row>
              <Col xs="3" sm="3" md="3" lg="3" className="pt-3">
                <div className="detail-icon">
                  <FaUsers style={{ color: "blue", height: "23px", width: "33px", opacity: 1 }} />
                </div>
              </Col>
              <Col xs="9" sm="9" md="9" lg="9" className="pt-3">
                <p className="data-label">Expenditure</p>
                <p className="data">30</p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs="12" sm="12" md="12" lg="3" xl="3">
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
    </div>
  );
}