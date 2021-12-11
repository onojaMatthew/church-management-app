import React from "react";
import { Button } from "antd";
import { Col, Row, Input } from "reactstrap";
import { FaInfo } from "react-icons/fa";


import "./Report.css";

export const ReportDetails = ({
  toggle,
  report,
}) => {
  // const [ isOpen, setIsOpen ] = useState(false);
  console.log(report, " report details")
  const date_data = report && report.createdAt.split("T");
  const date = date_data[0];
  const time = date_data[1];
  const converted_date = new Date(date);
  // const converted_time = time && time.toString()
  
  return (
    <div className="coord-body">
      <div className="cord-detail-card">
        <span className="close" onClick={() => toggle()}>X</span>
        <div className="coord-detail-inner-container">
          <p className="detail-name">{report?.subject}</p>
          <Row>
            <Col xs='12' sm='12' md='12' lg='6' xl='6' className="church-details">
              <h2 className="mb-3 mt-3"><strong>Church Details</strong></h2>
              <p className="detail-email"><strong>Date</strong>: {report?.church?.branch}</p>
              <p className="detail-email"><strong>Head Pastor</strong>: {report?.church?.head_pastor?.first_name} {report?.church?.head_pastor?.last_name}</p>
              <p className="detail-email"><strong>Email</strong>: {report?.church?.email}</p>
              <p className="detail-email"><strong>Phone</strong>: {report?.church?.phone}</p>
              <p className="detail-email"><strong>Date</strong>: {converted_date.toLocaleDateString()} {" "} <strong>Time</strong>: {time.toString()}</p>
            </Col>
            <Col xs='12' sm='12' md='12' lg='6' xl='6' className='coordinator-details'>
              <h2 className="mb-3 mt-3"><strong>Coordinator Details</strong></h2>
              <p className="detail-email"><strong>Name</strong>: {report?.coordinator?.name}</p>
              <p className="detail-email"><strong>Email</strong>: {report?.coordinator?.email}</p>
              <p className="detail-email"><strong>Phone</strong> {report?.coordinator?.phone}</p>
            </Col>
          </Row>
          <Row>
            <Col xs='12' sm='12' md='12' lg='6' xl='6'>
              <p className="report-head mt-4">Report</p>
              <p className="detail-email">{report?.message}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='12' sm='12' md='12' lg='6' xl='6'>
              <h4><strong>Approval</strong></h4>
              <label> 
                <Input className="go-check" type='checkbox' checked={report.gco_approval_remark?.approved} name="approval" />
                 G.O
              </label> {" "}
              <label>
               
                <Input className="coordinator-check" type='checkbox' checked={report?.coordinator_approval} />{" "}{" "}
                Zonal Pastor
              </label><br /><br />

               <label> 
                <Input className="go-check" type='checkbox' checked={report?.coordinator_approval} />
                Regional Pastor
              </label><br /><br />
              
            </Col>
            <Col xs='12' sm='12' md='12' lg='6' xl='6'>
              <p className="remark-label"><strong>Zonal pastor remark</strong></p>
              <p className='coordinator-remark'>{report.coordinator_remark ? report.coordinator_remark : "No remark"}</p>
              <p className="remark-label"><strong>Regional paster remark</strong></p>
              <p className='coordinator-remark'>{report.regional_pastor_remark ? report.regional_pastor_remark : "No remark"}</p>
              <p className="remark-label"><strong>General Overseer remark</strong></p>
              <p className='go-remark'>{report?.gco_approval_remark.remark ? report?.gco_approval_remark.remark : "No remark"}</p>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}