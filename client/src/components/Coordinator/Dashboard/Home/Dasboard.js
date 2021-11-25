import React, { useEffect } from "react";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import { FaEye } from "react-icons/fa"
import { Avatar, Image } from "antd";
import { localAuth } from "../../../../helper/authenticate";
import User from "../../../../assets/images/User.jpeg";
import { useDispatch, useSelector } from "react-redux";
import ChurchList from "../Church/ChurchList/ChurchList";

import "./Home.css";
import { churchList } from "../../../../store/actions/actions_church";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { churches } = useSelector(state => state.church);
  const admin = localAuth() && localAuth().user;
  useEffect(() => {
    dispatch(churchList());
  }, [ dispatch ]);

  return (
    <div>
      <Row className="mb-4">
        <Col xs="4" sm="4" md="3" lg="1" xl="1">
          <Avatar src={<Image src={User} />} size={100} />
        </Col>
        <Col xs="8" sm="8" md="9" lg="10" xl="10" className="p-4 greeting">
          <h1>Hello {admin && admin.first_name} {admin && admin.last_name}</h1>
          <p>Welcome to your admin dashboard</p>
        </Col>
        
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="3" xl="3"  className="fcard">
          <Card>
            <CardBody>
              <Row>
                <Col xs="9" sm="9" md="9" lg="9">
                  <div className="fcard-p">Number of Churches</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">{churches && churches.length > 0 ? churches.length : 0}</span>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="12" md="12" lg="3" xl="3" className="fcard">
          <Card>
            <CardBody>
              <Row>
                <Col xs="9" sm="9" md="9" lg="9">
                  <div className="fcard-p">Total Reports</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">100</span>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="12" md="12" lg="3" xl="3" className="fcard">
          <Card>
            <CardBody>
              <Row>
                <Col xs="9" sm="9" md="9" lg="9">
                  <div className="fcard-p">New Reports</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">100</span>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        
      </Row>
      <ChurchList />
      
    </div>
  );
}

export default Dashboard;