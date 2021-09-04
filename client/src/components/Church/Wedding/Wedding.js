import { Button } from "antd";
import React from "react";
import { Card, CardBody, Col, Row, Spinner, Table } from "reactstrap"; 
import "./Wedding.css";

const Wedding = () => {
  return (
    <div>
      <Card id="wedding_card">
        <CardBody>
          <div className="card-top">
            <h3>Wedding Events</h3>
            <Button>Create New Event</Button>
          </div>
          
          <Row>
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              {/* { <div className="text-center spin">
                  <Spinner className="my-loader">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              } */}
              <Table responsive>
                <thead>
                  <th>S/N</th>
                  <th>Groom First Name</th>
                  <th>Groom Last Name</th>
                  <th>Groom Phone Contact</th>
                  <th>Bride First Name</th>
                  <th>Bride Last Name</th>
                  <th>Bride Phone Contact</th>
                  <th>Officiating Lead Pastor</th>
                  <th>Venue</th>
                  <th>Date</th>
                </thead>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}

export default Wedding;