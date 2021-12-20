import { Input, Row, Col, Table } from "reactstrap";
import { Avatar, Button, Divider, Image } from "antd";

import "./RegionalPastor.css";
import { useState } from "react";

export const RegionalPastorDetails = ({
  assign_loading,
  handleChurchChange,
  handleChurchSubmit,
  regionalPastorDetail,
  church,
  viewToggle,
}) => {
  const [ isOpen, setIsOpen ] = useState(false);
  let role = regionalPastorDetail.role && regionalPastorDetail.role?.role_name;
  const rolesplit = role.split("_");
  const role1 = rolesplit[0];
  const role2 = rolesplit[1];
  const churches = regionalPastorDetail?.churches;
  return (
    <div className="coord-body">
      <div className="cord-detail-card">
        <span className="close" onClick={() => viewToggle()}>X</span>
        <div className="coord-detail-inner-container">
          
          <div className="info-cont">
            <Avatar style={{marginBottom: 25 }} src={<Image src={regionalPastorDetail?.image_url} />} size={250} />
            <p className="detail-email">{regionalPastorDetail?.first_name}{" "}{regionalPastorDetail?.last_name}</p>
            <p className="detail-email">{regionalPastorDetail?.email}</p>
            <p className="detail-email">{regionalPastorDetail?.phone}</p>
            <p className="detail-email">{role1.charAt(0).toUpperCase() + role1.slice(1)}{" "}{role2}</p>
            <p className="detail-email"><strong>No. of churches</strong>: {regionalPastorDetail?.churches.length}</p>
          </div>
          <hr />
          <Row>
            <Col xs="12" sm="12" md="12" lg="6" xl="6">
              <Input type="select" name="church" onChange={(e) => handleChurchChange(e)} >
                <option>---Select a Church---</option>
                {church && church.length > 0 && church.map((ch, i) => (
                  <option value={ch?._id}>{ch?.branch}</option>
                ))}
              </Input> 
            </Col>
            <Col xs="12" sm="12" md="12" lg="3" xl="3">
              {assign_loading ? 
                <Button loading className="assign-btn">Processing...</Button> :
                <Button onClick={handleChurchSubmit} className="assign-btn">Submit</Button> 
              }
            </Col>
            <Col xs="12" sm="12" md="12" lg="3" xl="3">
              {isOpen ? 
              <Button onClick={() => setIsOpen(!isOpen)} className="church-view">Hide Church List</Button> : 
              <Button onClick={() => setIsOpen(!isOpen)} className="church-view">View Church List</Button>}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              {isOpen ? (
                <>
                <Divider plain>Assigned Church List</Divider>
                <Table responsive striped>
                  <tr>
                    <th className="th">Head Pastor</th>
                    <th className="th">Branch Name</th>
                    <th className="th">Email Address</th>
                    <th className="th">Phone Number</th>
                  </tr>
                  <tbody>
                    {churches && churches.length > 0 && churches.map((c, i) => (
                      <tr className="t-row" key={i}>
                        <td className="ch-list-td">{c?.head_pastor?.first_name} {c?.head_pastor?.last_name}</td>
                        <td className="ch-list-td">{c?.branch}</td>
                        <td className="ch-list-td">{c?.email}</td>
                        <td className="ch-list-td">{c?.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                </>
              ) : null}
            </Col>
          </Row>
        </div>
      </div>

      
    </div>
  );
}