import React, { useState } from "react";
import { Button } from "antd";
import { Col, Row } from "reactstrap";


import "./Report.css";

export const ReportDetails = ({
  toggle,
  handleSubmit
}) => {
  const [ isOpen, setIsOpen ] = useState(false)
  return (
    <div className="coord-body">
      <div className="cord-detail-card">
        <span className="close" onClick={() => toggle()}>X</span>
        <div className="coord-detail-inner-container">
          {/* <p className="detail-name">{coordinatorDetail?.first_name}{" "}{coordinatorDetail?.last_name}</p>
          <p className="detail-email"><strong>Email</strong>: {coordinatorDetail?.email}</p>
          <p className="detail-email"><strong>Phone</strong>: {coordinatorDetail?.phone}</p>
          <p className="detail-email"><strong>Role</strong>: {role1.charAt(0).toUpperCase() + role1.slice(1)}{" "}{role2}</p>
          <p className="detail-email"><strong>No. of churches</strong>: {coordinatorDetail?.churches.length}</p> */}
          <hr />
          <Row>
            <Col xs="12" sm="12" md="12" lg="6" xl="6">
              {/* <Input type="select" name="church" onChange={(e) => handleChurchChange(e)} >
                <option>---Select a Church---</option>
                {church && church.length > 0 && church.map((ch, i) => (
                  <option value={ch?._id}>{ch?.branch}</option>
                ))}
              </Input>  */}
            </Col>
            <Col xs="12" sm="12" md="12" lg="3" xl="3">
              {/* {assign_loading ? 
                <Button loading className="assign-btn">Processing...</Button> : */}
                <Button onClick={handleSubmit} className="assign-btn">Submit</Button> 
              {/* } */}
            </Col>
            <Col xs="12" sm="12" md="12" lg="3" xl="3">
              {isOpen ? 
              <Button onClick={() => setIsOpen(!isOpen)} className="church-view">Hide Church List</Button> : 
              <Button onClick={() => setIsOpen(!isOpen)} className="church-view">View Church List</Button>}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              {/* {isOpen ? (
                <>
                <Divider plain>Assigned Church List</Divider>
                
                </>
              ) : null} */}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}