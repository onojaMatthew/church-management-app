import React, { useState } from "react";
import { Button } from "antd";
import { Col, Row } from "reactstrap";


import "./Report.css";

export const ReportDetails = ({
  toggle,
  handleSubmit,
  report,
}) => {
  const [ isOpen, setIsOpen ] = useState(false);
  console.log(report, " report details")
  const date_data = report && report.createdAt.split("T");
  const date = date_data[0];
  const time = date_data[1];
  const converted_date = new Date(date);
  const converted_time = time && time.toString()
  console.log(converted_time, " converted time");
  
  console.log(report);
  return (
    <div className="coord-body">
      <div className="cord-detail-card">
        <span className="close" onClick={() => toggle()}>X</span>
        <div className="coord-detail-inner-container">
          <p className="detail-name">{report?.subject}</p>
          <p className="detail-email"><strong>Date</strong>: {converted_date.toLocaleDateString()} {" "} <strong>Time</strong>: {time.toString()}</p>
          <p className="detail-email">{report?.message}</p>
          <div className="remarks">
            <p className="remark-label"><strong>Coordinator remark</strong></p>:
            <p className='coordinator-remark'> jskdjskdjskjskjskjdks slkslkdsn lksdskjk ksjksj kjdksjs{report?.coordinator_remark}</p>
            <p className="remark-label"><strong>G.O remark</strong></p>:
            <p className='go-remark'> jskdjskdjskjskjskjdks slkslkdsn lksdskjk ksjksj kjdksjs jskdjskdjs kjskjskjdks slkslkdsn lksdskjk ksjksj{report?.coordinator_remark}</p>
          </div> 
          <hr />
          <p>Coordinator</p>
          <p className="detail-email"><strong>Name</strong>: {report?.coordinator?.name}</p>
          <p className="detail-email"><strong>Email</strong>: {report?.coordinator?.email}</p>
          <p className="detail-email"><strong>Phone</strong> {report?.coordinator?.phone}</p>
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