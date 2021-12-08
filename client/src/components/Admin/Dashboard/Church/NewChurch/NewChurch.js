import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Row, Col, Input, Button, Spinner } from "reactstrap";
import "./NewChurch.css";
import { useDispatch, useSelector } from "react-redux";
import { roleList } from "../../../../../store/actions/actions_role";
import { success, errorMsg } from "../../../../../helper/message";
import { post_church } from "../../../../../store/actions/actions_church";
import { State, City } from "country-state-city";
import { resident_pastor_list } from "../../../../../store/actions/actions_resident_pastor";

const NewChurch = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector(state => state.role);
  const [ stateCode, setStateCode ] = useState("");
  const { postLoading, postSuccess, error } = useSelector(state => state.church);
  const { pastor_docs } = useSelector(state => state.residentPastorReducer);
  const history = useHistory();
  const [ values, setValues ] = useState({ 
    email: "", 
    password: "", 
    branch: "", 
    city: "", 
    street: "", 
    state: "", 
    phone: "",
    acct_no: "",
    acct_name: "",
    bank_name: "",
    role: "",
    head_pastor: "",
  });

  const { head_pastor, email, password, branch, city, street, bank_name, acct_name, acct_no, state, phone, role } = values;

  useEffect(() => {
    dispatch(roleList());
    dispatch(resident_pastor_list());
  }, [ dispatch ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, " input change")
    if (name==="state") {
      const state_split = value.split(" ");
      setStateCode(state_split[state_split.length - 1]);
    }
    setValues({ ...values, [name]: value });
  }

  useEffect(() => {
    if (error && error.length > 0) {
      errorMsg(error);
    }
  }, [ error ]);

  useEffect(() => {
    if (postSuccess) {
      success("Request processed successfully");
      setTimeout(() => {
        history.push("/dashboard/church-list")
      }, 500);
    }
  }, [ postSuccess, history ]);

  const onSubmit = () => {
    const data = {
      email, 
      password, 
      branch, 
      city, 
      street, 
      bank_name, 
      acct_name, 
      acct_no, 
      state, 
      phone, 
      role,
      resident_pastor_id: head_pastor,
    }

    dispatch(post_church(data));
  }

  const allStates = State.getStatesOfCountry("NG");
  const cities = City.getCitiesOfState("NG", stateCode && stateCode)
  return (
    <div>
      <Row className="mt-3">
        <Col xs="12" sm="12" md="12" lg="12" xl="12">
          <Card className="newchurch-form">
            <CardBody>
              <p className="newchurch-header">Create New Church</p>
              <Row>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Head Pastor</label>
                  <Input type="select" onChange={(e) => handleChange(e)} name="head_pastor">
                    <option disabled={true}>Select a pastor</option>
                    {pastor_docs?.length > 0 && pastor_docs.map((p, i) => {
                      return (
                        <option key={i} value={p._id}>{p.first_name}{" "}{p.last_name}</option>
                      )
                    })}
                  </Input>
                </Col>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Branch Name</label>
                  <Input placeholder="Enter branch name" onChange={(e) => handleChange(e)} value={branch} name="branch" />
                </Col>  
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Select a Role</label>
                  <Input type="select" onChange={(e) => handleChange(e)} name="role">
                    <option>Select a role</option>
                    {roles && roles.length > 0 && roles.map((role, i) => (
                      <option value={role && role._id} key={i}>{role && role.name}</option>
                    ))}
                  </Input>
                </Col> 
              </Row>
              <Row>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>State *</label>
                  <Input type="select" onChange={(e) => handleChange(e)} name="state">
                    <option>State</option>
                    {allStates && allStates.map((s, i) => {
                      return <option key={i} value={`${s.name} ${s.isoCode}`}>{s.name}</option>
                    })}
                  </Input>
                </Col> 
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Select City</label>
                  <Input type="select" onChange={(e) => handleChange(e)} name="city">
                    <option>City</option>
                    {cities && cities.map((s, i) => {
                      return <option key={i} value={s.name}>{s.name}</option>
                    })}
                  </Input>
                </Col> 
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Street</label>
                  <Input placeholder="Enter street" onChange={(e) => handleChange(e)} value={street} name="street" />
                </Col>
              </Row>
              
              <Row>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Email</label>
                  <Input placeholder="Enter email" onChange={(e) => handleChange(e)} value={email} name="email" />
                </Col>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Password</label>
                  <Input placeholder="Enter password" onChange={(e) => handleChange(e)} value={password} name="password" />
                </Col> 
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Phone</label>
                  <Input placeholder="Enter phone" onChange={(e) => handleChange(e)} value={phone} name="phone" />
                </Col>  
              </Row>
              <Row>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Bank name</label>
                  <Input placeholder="Enter bank name" onChange={(e) => handleChange(e)} value={bank_name} name="bank_name" />
                </Col>
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Account name</label>
                  <Input placeholder="Enter account holder name" onChange={(e) => handleChange(e)} value={acct_name} name="acct_name" />
                </Col> 
                <Col xs="12" sm="12" md="12" lg="4" xl="4">
                  <label>Account number</label>
                  <Input placeholder="Enter account number" onChange={(e) => handleChange(e)} value={acct_no} name="acct_no" />
                </Col>   
              </Row>
              <Row>
                <Col xs="12" sm="12" md="12" lg="6" xl="6">
                  {postLoading ? (
                    <div className="text-center">
                      <Spinner color="info" animation="grow">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : <Button onClick={onSubmit}>Submt</Button>}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default NewChurch;