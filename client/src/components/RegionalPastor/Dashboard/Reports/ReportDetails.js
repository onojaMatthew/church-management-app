import React, { useState } from "react";
import { Button } from "antd";
import { Col, Row, Input } from "reactstrap";
import { FaInfo } from "react-icons/fa";


import "./Report.css";

export const ReportDetails = ({
  toggle,
  handleSubmit,
  remark,
  remark_loading,
  handleChange,
  report,
}) => {
  
  const date_data = report && report.createdAt.split("T");
  const date = date_data[0];
  const time = date_data[1];
  const converted_date = new Date(date);
  const converted_time = time && time.toString()
  
  return (
    <div className="coord-body">
      <div className="cord-detail-card">
        <span className="close" onClick={() => toggle()}>X</span>
        <div className="coord-detail-inner-container">
          <p className="detail-name">{report?.subject}</p>
          <Row>
            <Col xs='12' sm='12' md='12' lg='6' xl='6' className="church-details">
              <h2 className="mb-3 mt-3"><strong>Church Details</strong></h2><br />
              <p className="detail-email-reg"><strong>Date</strong>: {report?.church?.branch}</p>
              <p className="detail-email-reg"><strong>Head Pastor</strong>: {report?.church?.head_pastor?.first_name} {report?.church?.head_pastor?.last_name}</p>
              <p className="detail-email-reg"><strong>Email</strong>: {report?.church?.email}</p>
              <p className="detail-email-reg"><strong>Phone</strong>: {report?.church?.phone}</p>
              <p className="detail-email-reg"><strong>Date</strong>: {converted_date.toLocaleDateString()} {" "} <strong>Time</strong>: {time.toString()}</p>
            </Col>
            <Col xs='12' sm='12' md='12' lg='6' xl='6' className='coordinator-details'>
              <h2 className="mb-3 mt-3"><strong>Regional Pastor</strong></h2><br />
              <p className="detail-email-reg"><strong>Name</strong>: {report?.coordinator?.name}</p>
              <p className="detail-email-reg"><strong>Email</strong>: {report?.coordinator?.email}</p>
              <p className="detail-email-reg"><strong>Phone</strong> {report?.coordinator?.phone}</p>
            </Col>
          </Row>
          <Row>
            <Col xs='12' sm='12' md='12' lg='12' xl='12'>
              <p className="report-head mt-4">Report</p>
              <p className="detail-email-reg">{report?.message}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='12' sm='12' md='12' lg='12' xl='12'>
              <p className="remark-label mt-4"><strong>Zonal pastor remark</strong></p>
              <p className='coordinator-remark'>{report.coordinator_remark ? report.coordinator_remark : "No remark"}</p>

              <p className="remark-label mt-4"><strong>Regional pastor remark</strong></p>
              <p className='coordinator-remark'>{report.regional_pastor_remark ? report.regional_pastor_remark : "No remark"}</p>

              <p className="remark-label mt-4"><strong>General Overseer remark</strong></p>
              <p className='go-remark'>{report?.gco_approval_remark.remark ? report?.gco_approval_remark.remark : "No remark"}</p>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col xs='12' sm='12' md='12' lg='12' xl='12'>
              <h4><strong>Remark</strong></h4>
              <textarea name="remark" value={remark} onChange={(e) => handleChange(e)} className="comment-input" placeholder="What's on your mind?" /> <br />
              <p><FaInfo className="approval-info-icon" /> <span className="info-note">You can click on the check box to approve report only if you're satisfied with the it else, you can just leave a comment</span></p>
              
              
              <label>
                <Input className="coordinator-check" type='checkbox' checked={report?.coordinator_approval} /> &nbsp;
                Zonal pastor
              </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label>
                {report?.regional_pastor_approval && report?.coordinator_approval ? 
                <Input className="go-check" type='checkbox' checked={report?.regional_pastor_approval} /> :
                report.coordinator_approval === false &&  report.regional_pastor_approval === false?
                <Input className="go-check" type='checkbox' checked={report?.regional_pastor_approval} /> :
                <Input className="go-check" type='checkbox' name="approval" onChange={(e) => handleChange(e)} /> 
                } Regional pastor
              </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label> 
                <Input className="go-check" type='checkbox' checked={report.gco_approval_remark?.approved} /> 
                 G.O
              </label> <br /><br />
              {remark_loading ? <Button loading className='remart-btn'>Processing...</Button> : 
              <Button onClick={handleSubmit} type="submit" className='remart-btn'>Send</Button>}
              
            </Col>
            
          </Row>
        </div>
      </div>
    </div>
  );
}