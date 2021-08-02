import { EyeOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Button, Card, CardBody, Col, Input, Row, Table } from "reactstrap";
import Member from "./MemberDetail";

import "./MemberList.css";

const MemberList = () => {
  const [ modal, setModal ] = useState(false);

  const toggle = () => {
    setModal(!modal);
  }

  return (
    <div>
      <Card className="member-card">
        <CardBody>
          <Row className="member-header-row">
            <Col xs="12" sm="12" md="12" lg="2" xl="2">
              <p className="member-header lead">Member List</p>
            </Col>
            <Col xs="12" sm="12" md="12" lg="8" xl="8">
              <Input placeholder="Search..." />
            </Col>
            <Col xs="12" sm="12" md="12" lg="2" xl="2">
              <Button className="create-member-header-button lead">Create a New Member</Button>
            </Col>
          </Row>

          <Row>
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <Table responsive>
                <thead>
                  <th>S/N</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>State of Origin</th>
                  <th>Occupation</th>
                  <th>Marital Status</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John</td>
                    <td>Doe</td>
                    <td>johndoe@gmail.com</td>
                    <td>09088464233</td>
                    <td>Lagos</td>
                    <td>Software Engineer</td>
                    <td>Married</td>
                    <td className="view-member-button" onClick={toggle}><EyeOutlined size="large" /> View</td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td>John</td>
                    <td>Doe</td>
                    <td>johndoe@gmail.com</td>
                    <td>09088464233</td>
                    <td>Lagos</td>
                    <td>Software Engineer</td>
                    <td>Married</td>
                    <td className="view-member-button" onClick={toggle}><EyeOutlined size="large" /> View</td>
                  </tr>

                  <tr>
                    <td>3</td>
                    <td>John</td>
                    <td>Doe</td>
                    <td>johndoe@gmail.com</td>
                    <td>09088464233</td>
                    <td>Lagos</td>
                    <td>Software Engineer</td>
                    <td>Married</td>
                    <td className="view-member-button" onClick={toggle}><EyeOutlined size="large" /> View</td>
                  </tr>

                  <tr>
                    <td>4</td>
                    <td>John</td>
                    <td>Doe</td>
                    <td>johndoe@gmail.com</td>
                    <td>09088464233</td>
                    <td>Lagos</td>
                    <td>Software Engineer</td>
                    <td>Married</td>
                    <td className="view-member-button" onClick={toggle}><EyeOutlined size="large" /> View</td>
                  </tr>

                  <tr>
                    <td>5</td>
                    <td>John</td>
                    <td>Doe</td>
                    <td>johndoe@gmail.com</td>
                    <td>09088464233</td>
                    <td>Lagos</td>
                    <td>Software Engineer</td>
                    <td>Married</td>
                    <td className="view-member-button" onClick={toggle}><EyeOutlined size="large" /> View</td>
                  </tr>

                  <tr>
                    <td>6</td>
                    <td>John</td>
                    <td>Doe</td>
                    <td>johndoe@gmail.com</td>
                    <td>09088464233</td>
                    <td>Lagos</td>
                    <td>Software Engineer</td>
                    <td>Married</td>
                    <td className="view-member-button" onClick={toggle}><EyeOutlined size="large" /> View</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Member toggle={toggle} modal={modal} />
        </CardBody>
      </Card>
    </div>
  );
}

export default MemberList;