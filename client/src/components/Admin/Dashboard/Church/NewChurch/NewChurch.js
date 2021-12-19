import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Row, Col, Input } from "reactstrap";
import "./NewChurch.css";
import { useDispatch, useSelector } from "react-redux";
import { roleList } from "../../../../../store/actions/actions_role";
import { errorMsg } from "../../../../../helper/message";
import { post_church } from "../../../../../store/actions/actions_church";
import { State, City } from "country-state-city";
import { resident_pastor_list } from "../../../../../store/actions/actions_resident_pastor";
import { Button, message } from "antd";

const NewChurch = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector(state => state.role);
  const [ stateCode, setStateCode ] = useState("");
  const { postLoading, postSuccess, validation_error, error } = useSelector(state => state.church);
  const [ validationError, setValidaionError ] = useState([]);
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
    setValidaionError([]);
    const { name, value } = e.target;
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

    if (error && error.includes("Invalid token")) {
      window.location.href = "/"
    }
  }, [ error ]);

  useEffect(() => {
    if (validation_error.length > 0) {
      setValidaionError(validation_error);
    }
  }, [ validation_error ]);

  useEffect(() => {
    if (postSuccess) {
      // success("Request processed successfully");
      message.success("Request processed successfully");
      setValues({
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
      // setTimeout(() => {
        
        // history.push("/dashboard/church-list")
      // }, 500);
    }
  }, [ postSuccess, history ]);

  const onSubmit = (e) => {
    e.preventDefault();
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
              <form onSubmit={onSubmit}>
                <Row>
                  <Col xs="12" sm="12" md="12" lg="4" xl="4">
                    <label>Head Pastor</label>
                    <Input className="select" type="select" onChange={(e) => handleChange(e)} name="head_pastor">
                      <option disabled={true}>Select a pastor</option>
                      {pastor_docs?.length > 0 && pastor_docs.map((p, i) => {
                        return (
                          <option key={i} value={p._id}>{p.first_name}{" "}{p.last_name}</option>
                        )
                      })}
                    </Input>
                    {validationError.length > 0 ? validationError.map((error, i) => error.param === "resident_pastor_id" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                  </Col>
                  <Col xs="12" sm="12" md="12" lg="4" xl="4">
                    <label>Branch Name</label>
                    <Input placeholder="Enter branch name" onChange={(e) => handleChange(e)} value={branch} name="branch" />
                    {validationError.length > 0 ? validationError.map((error, i) => error.param === "branch" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                  </Col>  
                  <Col xs="12" sm="12" md="12" lg="4" xl="4">
                    <label>Select a Role</label>
                    <Input className="select" type="select" onChange={(e) => handleChange(e)} name="role">
                      <option>Select a role</option>
                      {roles && roles.length > 0 && roles.map((role, i) => (
                        <option value={role && role._id} key={i}>{role && role.name}</option>
                      ))}
                    </Input>
                    {validationError.length > 0 ? validationError.map((error, i) => error.param === "role" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                  </Col> 
                </Row>
                <Row>
                  <Col xs="12" sm="12" md="12" lg="4" xl="4">
                    <label className="mt-3">State *</label>
                    <Input className="select" type="select" onChange={(e) => handleChange(e)} name="state">
                      <option>State</option>
                      {allStates && allStates.map((s, i) => {
                        return <option key={i} value={`${s.name} ${s.isoCode}`}>{s.name}</option>
                      })}
                    </Input>
                    {validationError.length > 0 ? validationError.map((error, i) => error.param === "state" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                  </Col> 
                  <Col xs="12" sm="12" md="12" lg="4" xl="4">
                    <label className="mt-3">Select City</label>
                    <Input className="select" type="select" onChange={(e) => handleChange(e)} name="city">
                      <option>City</option>
                      {cities && cities.map((s, i) => {
                        return <option key={i} value={s.name}>{s.name}</option>
                      })}
                    </Input>
                    {validationError.length > 0 ? validationError.map((error, i) => error.param === "city" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                  </Col> 
                  <Col xs="12" sm="12" md="12" lg="4" xl="4">
                    <label className="mt-3">Street</label>
                    <Input placeholder="Enter street" onChange={(e) => handleChange(e)} value={street} name="street" />
                    {validationError.length > 0 ? validationError.map((error, i) => error.param === "street" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                  </Col>
                </Row>
                
                <Row>
                  <Col xs="12" sm="12" md="12" lg="4" xl="4">
                    <label className="mt-3">Email</label>
                    <Input placeholder="Enter email" onChange={(e) => handleChange(e)} value={email} name="email" />
                    {validationError.length > 0 ? validationError.map((error, i) => error.param === "email" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                  </Col>
                  <Col xs="12" sm="12" md="12" lg="4" xl="4">
                    <label className="mt-3">Password</label>
                    <Input placeholder="Enter password" onChange={(e) => handleChange(e)} value={password} name="password" />
                    {validationError.length > 0 ? validationError.map((error, i) => error.param === "password" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                  </Col> 
                  <Col xs="12" sm="12" md="12" lg="4" xl="4">
                    <label className="mt-3">Phone</label>
                    <Input placeholder="Enter phone" onChange={(e) => handleChange(e)} value={phone} name="phone" />
                    {validationError.length > 0 ? validationError.map((error, i) => error.param === "phone" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                  </Col>  
                </Row>
                <Row>
                  <Col xs="12" sm="12" md="12" lg="4" xl="4">
                    <label className="mt-3">Bank name</label>
                    <Input placeholder="Enter bank name" onChange={(e) => handleChange(e)} value={bank_name} name="bank_name" />
                    {validationError.length > 0 ? validationError.map((error, i) => error.param === "bank_name" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                  </Col>
                  <Col xs="12" sm="12" md="12" lg="4" xl="4">
                    <label className="mt-3">Account name</label>
                    <Input placeholder="Enter account holder name" onChange={(e) => handleChange(e)} value={acct_name} name="acct_name" />
                    {validationError.length > 0 ? validationError.map((error, i) => error.param === "acct_name" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                  </Col> 
                  <Col xs="12" sm="12" md="12" lg="4" xl="4">
                    <label className="mt-3">Account number</label>
                    <Input placeholder="Enter account number" onChange={(e) => handleChange(e)} value={acct_no} name="acct_no" />
                    {validationError.length > 0 ? validationError.map((error, i) => error.param === "acct_no" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                  </Col>   
                </Row>
                <Row className="mt-3">
                  <Col xs="12" sm="12" md="12" lg="6" xl="6">
                    {postLoading ? (
                      <Button loading>Loading</Button>
                    ) : <button style={{ color: "#FFFFFF"}} type="submit">Submt</button>}
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default NewChurch;