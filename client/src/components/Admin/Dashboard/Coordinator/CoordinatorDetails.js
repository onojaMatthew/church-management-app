import { Input, Row, Col, Table } from "reactstrap";
import { Button, Divider } from "antd";

import "./Coordinator.css";
import { useState } from "react";

export const CoordinatorDetails = ({
  viewToggle,
  isView,
  coordinatorDetail,
  church,
}) => {
  const [ isOpen, setIsOpen ] = useState(false);
  let role = coordinatorDetail.role && coordinatorDetail.role?.role_name;
  const rolesplit = role.split("_");
  const role1 = rolesplit[0];
  const role2 = rolesplit[1];

  return (
    <div className="coord-body">
      <div className="cord-detail-card">
        <div className="coord-detail-inner-container">
          <p className="detail-name">{coordinatorDetail?.first_name}{" "}{coordinatorDetail?.last_name}</p>
          <p className="detail-email"><strong>Email</strong>: {coordinatorDetail?.email}</p>
          <p className="detail-email"><strong>Phone</strong>: {coordinatorDetail?.phone}</p>
          <p className="detail-email"><strong>Role</strong>: {role1.charAt(0).toUpperCase() + role1.slice(1)}{" "}{role2}</p>
          <p className="detail-email"><strong>No. of churches</strong>: {coordinatorDetail?.churches.length}</p>
          <hr />
          <Row>
            <Col xs="12" sm="12" md="12" lg="6" xl="6">
              <Input type="select" name="church" >
                <option>---Select a Church---</option>
                {church && church.length > 0 && church.map((ch, i) => (
                  <option value={ch?._id}>{ch?.branch}</option>
                ))}
              </Input> 
            </Col>
            <Col xs="12" sm="12" md="12" lg="3" xl="3">
              <Button className="assign-btn">Submit</Button></Col>
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
                <Table responsive>
                  <tbody>
                    <tr className="t-row">
                      <tb>Head Pastor</tb>
                      <tb>Branch Name</tb>
                      <tb>Phone Contact</tb>
                      <tb>Email Address</tb>
                    </tr>
                    <tr className="t-row">
                      <tb>Head Pastor</tb>
                      <tb>Branch Name</tb>
                      <tb>Phone Contact</tb>
                      <tb>Email Address</tb>
                    </tr>
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