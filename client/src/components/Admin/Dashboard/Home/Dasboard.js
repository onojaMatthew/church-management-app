import React, { useEffect } from "react";
import { Row, Col, Card, CardBody, Spinner } from "reactstrap";
import { Avatar, Image, message } from "antd";
import Charts from "../../../Chart/Chart";
import { localAuth } from "../../../../helper/authenticate";
import User from "../../../../assets/images/User.jpeg";
import { useDispatch, useSelector } from "react-redux";

import "./Home.css";
import { churchList } from "../../../../store/actions/actions_church";
import { admin_data } from "../../../../store/actions/actions_dashboard_data";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { churches } = useSelector(state => state.church);
  const { loading, error, data } = useSelector(state => state.dashboard_data);
  const admin = localAuth() && localAuth().user;
  useEffect(() => {
    dispatch(churchList());
    dispatch(admin_data());
  }, [ dispatch ]);

  useEffect(() => {
    if (error?.length > 0) {
      message.error(error);
    }
  });

  console.log(data, " dasboard data");
  const { chart_data, coordinatorObj, memberObj, churchObj, expenditureObj, incomeObj } = data;

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
                  <span className="c-number">{churchObj && churchObj.totalChurch ? churchObj.totalChurch : 0}</span>
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
                  <div className="fcard-p">Number of Members</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">{memberObj && memberObj.totalMember ? memberObj.totalMember : 0}</span>
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
                  <div className="fcard-p">number of Coordinators</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">{coordinatorObj && coordinatorObj.totalCoordinator ? coordinatorObj.totalCoordinator : 0}</span>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        {/* <Col xs="12" sm="12" md="12" lg="3" xl="3" className="fcard">
          <Card>
            <CardBody>
              <Row>
                <Col xs="9" sm="9" md="9" lg="9">
                  <div className="fcard-p">Audience Reached</div>
                </Col>
                <Col xs="3" sm="3" md="3" lg="3">
                  <span className="c-number">100</span>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col> */}
      </Row>

      {loading ?
        <div className="text-center spin">
          <Spinner className="my-loader">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div> : (
          <Row className="mt-4">
          <Col className="chart-area" xs="12" sm="12" md="12" lg="6" xl="6">
            <Card className="rp-container">
              <CardBody>
                <Row>
                  <Col>
                    <Charts chart_data={chart_data} />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col className="report-l" xs="12" sm="12" md="12" lg="6" xl="6">
            <Card className="rp-container">
              <CardBody>
                <Row>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6">
                    <Card className="st-card">
                      <CardBody>
                        <h1 className="text-center">Income</h1>
                        <p className="text-center">&#8358;{incomeObj?.totalIncome}</p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6">
                    <Card className="st-card2">
                      <CardBody>
                        <h1 className="text-center">Expenses</h1>
                        <p className="text-center">{expenditureObj?.totalExpenses}</p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col xs="12" sm="12" md="12" lg="6" xl="6">
                    <Card className="st-card3">
                      <CardBody>
                        <h1 className="text-center">Branches</h1>
                        <p className="text-center">300</p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6">
                    <Card className="st-card4">
                      <CardBody>
                        <h1 className="text-center">Members</h1>
                        <p className="text-center">{memberObj?.totalMember}</p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

              </CardBody>
            </Card>
          </Col>
        </Row>  
        )}
      
    </div>
  );
}

export default Dashboard;