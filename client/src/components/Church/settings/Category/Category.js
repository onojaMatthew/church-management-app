import React, { useEffect, useState } from "react";
import { localAuth } from "../../../../helper/authenticate";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

import "./Category.css";
import { NewCategory } from "./NewCategory";
import { createCategory, categoryList, deleteCategory } from "../../../../store/actions/actions_mem_category";

const Category = () => {
  const dispatch = useDispatch();
  const { 
    categories, 
    categoryInfo, 
    create_loading, 
    delete_loading, 
    create_success 
  } = useSelector(state => state.category);
  const [ value, setValue ] = useState("");
  const [ modal, setModal ] = useState(false);
  const [ churchId, setChurchId ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      churchId,
      name: value
    }

    dispatch(createCategory(data));
  }

  const toggle =() => {
    setModal(!modal);
  }

  const handleChange = ({ target: { value } }) => {
    setValue(value)
  }

  const onDelete = (id) => {
    dispatch(deleteCategory(id, churchId));
  }

  useEffect(() => {
    const id = localAuth()?.church?._id;
    setChurchId(id);
  }, [ localAuth ]); 

  useEffect(() => {
    if (churchId?.length > 0) {
      dispatch(categoryList(churchId));
    }
    
  }, [ dispatch, churchId ]);

  useEffect(() => {
    if (create_success) {
      setModal(!modal);
    }
  }, [ create_success ]);

  return (
    <div className="">
      <Card>
        <CardBody>
          <p className="group-header">Membership Types</p>
          <Table responsive>
            <tbody>
              {categories?.length > 0 ? categories.map((c, i) => (
                <tr>
                  <td>{c?.name}</td>
                  <td>
                    <Button className="edit-btn">Edit</Button>
                  </td>
                  <td>
                    {delete_loading ? <Button className="trash-btn" loading></Button> : <Button className="delete-btn" onClick={() => onDelete(c?._id)}>Delete</Button>}
                  </td>
                </tr>
              )) : <h3 className="text-center">No Records Found</h3>}
            </tbody>
          </Table>
          <Row>
            <Col xs="12" sm="12" md="12" lg="6" xl="6">
              <Button className="create-trigger" onClick={toggle}>Create New Category</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <NewCategory
        modal={modal}
        name={value}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        create_loading={create_loading}
        toggle={toggle}
      />
    </div>
  );
}

export default Category;