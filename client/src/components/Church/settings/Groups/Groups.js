import React from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { Button } from "antd";

import "./Groups.css";

const Groups = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <Table responsive>
            <tbody>
              <tr>
                <td>Choir</td>
                <td>
                  <Button>Edit</Button>
                </td>
                <td>
                  <Button>Delete</Button>
                </td>
              </tr>
              <tr>
                <td>Choir</td>
                <td>
                  <Button>Edit</Button>
                </td>
                <td>
                  <Button>Delete</Button>
                </td>
              </tr>
              <tr>
                <td>Choir</td>
                <td>
                  <Button>Edit</Button>
                </td>
                <td>
                  <Button>Delete</Button>
                </td>
              </tr>
            </tbody>
          </Table>
          <Row>
            <Col xs="12" sm="12" md="12" lg="6" xl="6">
              <Button>Create New Group</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default Groups;