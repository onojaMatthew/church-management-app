import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import { Button } from "antd";

import "./Settings.css";
import { createRole, roleList } from "../../../../store/actions/actions_role";

export const Settings = () => {
  const dispatch = useDispatch();
  const { validation_error, roles, role, loading, success } = useSelector(state => state.role);
  const [ value, setValue ] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: value
    }
    dispatch(createRole(data));
  }

  useEffect(() => {
    dispatch(roleList());
  }, [ dispatch ]);

  console.log(roles, " the role list")
  return (
    <Card className="settings-card mt-3">
      <CardBody>
        <Row>
          <Col xs="12" sm="12" md="12" xl="6" lg="12">
            <p>New Role</p>
            <form onSubmit={""}>
              <Row className="mb-3">
                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                  <label htmlFor="role"> Name</label>
                  <input id="role" type="text" value={value} placeholder="Enter role name" onChange={(e) => handleChange(e)} name="role" className="form-control" />
                  {validation_error.length > 0 ? validation_error.map((error, i) => error.param === "first_name" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                </Col>
               
              </Row>
              <Row>
                <Col xs="12" sm="12" md="12" lg="6" xl="6">
                  <Row>
                    <Col xs="12" sm="12" md="12" lg="3" xl="3">
                      <button type="reset" className="reg-delete">Cancil</button>
                    </Col>
                    <Col xs="12" sm="12" md="12" lg="3" xl="3">
                      {
                        loading ? <Button className="reg-cancil" loading>Loading...</Button> : 
                        <button onClick={handleSubmit} type="submit" className="reg-cancil">Submit</button>
                      }
                    </Col>
                  </Row>
                </Col>
                
              </Row>
            </form>
          </Col>
          <Col xs="12" sm="12" md="12" xl="6" lg="12">
            <Table responsive>
              <tbody>
                {roles?.length > 0 ? roles.map((r, i) => (
                  <tr>
                    <td>{r?.name.charAt(0).toUpperCase() + r?.name.slice(1)}</td>
                    <td><Button>Edit</Button></td>
                    <td><Button>Delete</Button></td>
                  </tr>
                )): <h4 className="text-center">No records found</h4>}
              </tbody>
            </Table>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}