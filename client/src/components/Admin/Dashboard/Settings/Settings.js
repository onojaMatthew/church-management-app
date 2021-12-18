import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, CardBody, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { Button } from "antd";

import "./Settings.css";
import { createRole, deleteRole, roleList, updateRole } from "../../../../store/actions/actions_role";
import { FaTrash } from "react-icons/fa";

export const Settings = () => {
  const dispatch = useDispatch();
  const { 
    validation_error, 
    roles, 
    createLoading, 
    updateSuccess, 
    deleteLoading, 
    listLoading, 
    updateLoading
  } = useSelector(state => state.role);
  const [ value, setValue ] = useState("");
  const [ modal, setModal ] = useState(false);
  const [ id, setId ] = useState("");
  const [ role, setRole ] = useState("");
  const [ validationError, setValidationError ] = useState([]);

  const toggle = (id) => {
    setModal(!modal);
    if (id) setId(id);
  }

  const handleChange = (e) => {
    setValidationError([]);
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: value
    }
    dispatch(createRole(data));
  }

  const onChange = (e) => {
    setValidationError([]);
    setRole(e.target.value);
  }

  useEffect(() => {
    dispatch(roleList());
  }, [ dispatch ]);

  const handleDelete = (id) => {
    dispatch(deleteRole(id));
  }

  const onEdit = (e) => {
    e.preventDefault()
    const data = {
      name: role,
      id
    }
    dispatch(updateRole(data));
  }

  useEffect(() => {
    if (updateSuccess) {
      dispatch(roleList())
    }
  }, [ dispatch, updateSuccess ]);

  useEffect(() => {
    if (validation_error?.length > 0) {
      setValidationError(validation_error);
    }
  }, [ validation_error ]);

  useEffect(() => {
    if (updateSuccess) {
      setRole("")
    }
  }, [ updateSuccess ]);

  const onReset = () => {
    setRole("");
    setValue("")
  }

  console.log(validationError, " the validation error")

  return (
    <div>
      <Row>
        <Col xs="12" sm="12" md="12" xl="6" lg="12">
        <Card className="mt-3">
          <CardBody>
          <p className="page-title">New Role</p>
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <label htmlFor="role"> Name</label>
                <input id="role" type="text" value={value} placeholder="Enter role name" onChange={(e) => handleChange(e)} name="role" className="form-control" />
                {validationError.length > 0 ? validationError.map((error, i) => error.param === "name" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12" lg="3" xl="3">
                <button onClick={onReset} className="reg-delete">Cancil</button>
              </Col>
              <Col xs="12" sm="12" md="12" lg="3" xl="3">
                {
                  createLoading ? <Button className="set-cancil" loading>Loading...</Button> : 
                  <button onClick={handleSubmit} type="submit" className="set-cancil">Submit</button>
                }
              </Col>
            </Row>
          </form>
          </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="12" md="12" xl="6" lg="12">
          <Card className="mt-3">
            <CardBody>
              <p className="page-title">Role List</p>
              {listLoading ? 
                <div className="text-center">
                  <Spinner>
                    <span className="visualy-hidden"></span>
                  </Spinner>
                </div> : roles?.length > 0 ? roles.map((r, i) => (
                <Row className="mb-3 table-row">
                  <Col xs="6" sm="6" md="6" lg="8" xl="8">
                    <p className="role-name">{r?.name.charAt(0).toUpperCase() + r?.name.slice(1)}</p>
                  </Col>
                  <Col xs="3" sm="3" md="6" lg="2" xl="2">
                    <Button onClick={() => toggle(r?._id)} className="role-edit">Edit</Button>
                  </Col>
                  <Col xs="3" sm="3" md="6" lg="2" xl="2">
                      <Button onClick={() => handleDelete(r?._id)} className="role-delete">
                      {deleteLoading ? (
                        <Spinner color="#fff">
                          <span className="visually-hidden"></span>
                        </Spinner>
                      ) : 
                        <FaTrash />
                      }
                      </Button>
                  </Col>
                </Row>
              )): <h4 className="text-center">No records found</h4>}
            </CardBody>
          </Card>
        </Col>
      </Row> 
      <div>
        <Modal toggle={toggle} isOpen={modal} id="role-modal">
          <ModalHeader toggle={toggle}>
            <p className="role-edit-title">Edit Role</p>
          </ModalHeader>
          <ModalBody>
          <form onSubmit={onEdit}>
            <Row className="mb-3">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <label htmlFor="role"> Name</label>
                <input id="role" type="text" value={role} placeholder="Enter role name" onChange={(e) => onChange(e)} name="role" className="form-control" />
                {validationError.length > 0 ? validationError.map((error, i) => error.param === "name" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                {validationError.length > 0 ? validationError.map((error, i) => error.param === "roleId" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="12" md="12" lg="3" xl="3">
                <button onClick={onReset} className="reg-delete">Cancil</button>
              </Col>
              <Col xs="12" sm="12" md="12" lg="3" xl="3">
                {
                  updateLoading ? <Button className="set-cancil" loading>Processing...</Button> : 
                  <button type="submit" className="set-cancil">Submit</button>
                }
              </Col>
            </Row>
          </form>
          </ModalBody>
        </Modal>
      </div>
    </div> 
  );
}