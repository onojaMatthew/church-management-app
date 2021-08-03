import React, { useState } from "react";
import { Row, Col, Input, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import { Avatar, Divider } from "antd";

import "../MemberList/MemberList.css";

const NewMember = ({ 
  categories,
  isOpen, 
  toggleOpen, 
  handleChange,
  first_name,
  last_name,
  email,
  phone,
  city,
  street,
  state,
  state_of_origin,
  marital_status,
  occupation,
  category,
  dob,
}) => {
  
  return (
    <Modal id="member-detail-modal" isOpen={isOpen} toggle={toggleOpen}>
      <ModalHeader toggle={toggleOpen}>New Member Information</ModalHeader>
      <ModalBody id="modal-body">
        <Row>
          <Col xs="6" sm="6" md="6" lg="9" xl="9">
            <Avatar size={100} />
          </Col>
        </Row>
        <Divider>Member Info</Divider>detail
        <Divider>Member Info</Divider>detaildetaildetail
        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>First name *</label>
            <Input placeholder="First name" value={first_name} name="first_name" onChange={(e) => handleChange(e)} />
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Last name *</label>
            <Input placeholder="Last name" value={last_name} name="last_name" onChange={(e) => handleChange(e)} />
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Email *</label>
            <Input placeholder="Email" value={email} name="email" onChange={(e) => handleChange(e)} />
          </Col>
        </Row>
        <Divider>Contact Info</Divider>
        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <label>Street *</label>
            <Input placeholder="Street address" onChange={(e) => handleChange(e)} name="street" value={street} />
          </Col>
        </Row>
        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>City *</label>
            <Input placeholder="City" onChange={(e) => handleChange(e)} name="city" value={city} />
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>State *</label>
            <Input placeholder="State of residence" onChange={(e) => handleChange(e)} name="state" value={state} />
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Phone *</label>
            <Input placeholder="Phone Number" onChange={(e) => handleChange(e)} name="phone" value={phone} />
          </Col>
        </Row>
        
        <Divider>Other Info</Divider>

        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>State of Origin *</label>
            <Input placeholder="State of Origin" onChange={(e) => handleChange(e)} name="state_of_origin" value={state_of_origin} />
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Occupation *</label>
            <Input placeholder="Occupation" onChange={(e) => handleChange(e)} name="occupation" value={occupation} />
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Marital Status *</label>
            <Input placeholder="Marital status" onChange={(e) => handleChange(e)} name="marital_status" value={marital_status} />
          </Col>
        </Row>
        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <label>Date of Birth *</label>
            <Input type="date" onChange={(e) => handleChange(e)} name="dob" value={dob} />
          </Col>
          {/* <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <label>Responsibility</label>
            <Input placeholder="Responsibility" onChange={(e) => handleChange(e)} name="office" value={""} />
          </Col> */}
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <label>Membership category *</label>
            <Input type="select" onChange={(e) => handleChange(e)} name="category">
              <option>Select membership category</option>
              {categories && categories.length > 0 && categories.map((c,i) => (
                <option key={i} value={c._id}>{c && c.name}</option>
              ))}
            </Input>
          </Col>
        </Row>
        <Divider>Actions</Divider>

        <Row className="member-info">
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <Button className="add-to-group">Submit</Button>
          </Col>
          
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <Button className="member-delete">Cancel</Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default NewMember;