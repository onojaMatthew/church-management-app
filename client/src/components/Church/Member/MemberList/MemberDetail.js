import React, { useState } from "react";
import { Row, Col, Input, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { Avatar, Divider } from "antd";

import "./MemberList.css";

const Member = ({ modal, toggle, data }) => {
  const [ readOnly, setReadOnly ] = useState(true);

  const toggleReadOnly = () => {
    setReadOnly(!readOnly);
  }

  return (
    <Modal id="member-detail-modal" isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Member Information</ModalHeader>
      <ModalBody id="modal-body">
        <Row>
          <Col xs="6" sm="6" md="6" lg="9" xl="9">
            <Avatar size={100} />
          </Col>
          <Col xs="6" sm="6" md="6" lg="3" xl="3">
            <Button onClick={toggleReadOnly} className="update-toggle-btn">Click to Update</Button>
          </Col>
        </Row>
        <Divider>Member Info</Divider>
        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>First name</label>
            <Input value={"John"} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Last name</label>
            <Input value={"Doe"} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Email</label>
            <Input value={"johdoe@gmail.com"} readOnly={readOnly}/>
          </Col>
        </Row>
        <Divider>Contact Info</Divider>
        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <label>Street</label>
            <Input value={"21 Akinnagbe, Seaside Estate Badore Road"} readOnly={readOnly}/>
          </Col>
        </Row>
        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>City</label>
            <Input value={"Ajah"} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>State</label>
            <Input value={"Lagos"} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Phone</label>
            <Input value={"09012345678"} readOnly={readOnly}/>
          </Col>
        </Row>
        
        <Divider>Other Info</Divider>

        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>State of Origin</label>
            <Input value={"Lagos"} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Occupation</label>
            <Input value={"Software Developer"} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Marital Status</label>
            <Input value={"Married"} readOnly={readOnly}/>
          </Col>
        </Row>
        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Date of Birth</label>
            <Input value={"21/10/1986"} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Responsibility</label>
            <Input value={"Head usher"} readOnly={readOnly}/>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Membership</label>
            <Input value={"Individual"} readOnly={readOnly}/>
          </Col>
        </Row>
        <Divider>Actions</Divider>

        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <Button className="add-to-group">Add to Group</Button>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <Button className="a-responsibility">Assign responsibility</Button>
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <Button className="member-delete">Delete</Button>
          </Col>
        </Row>
      </ModalBody>
      {/* <ModalFooter>
        <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter> */}
    </Modal>
  )
}

export default Member;