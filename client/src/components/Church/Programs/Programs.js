import { useRouteMatch, useHistory } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";

import "./Program.css";

const Programs = () => {
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <div className="programs-container">
      <h1>Events and Activities</h1>
      <Row>
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <Card onClick={() => history.push(`${match.url}/birthdays`)} id="event-card">
            <p>Birthdays Events</p>
          </Card>
        </Col>
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <Card onClick={() => history.push(`${match.url}/burials`)} id="event-card">
            <p>BurialPrograms</p>
          </Card>
        </Col>
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <Card onClick={() => history.push(`${match.url}/outreach`)} id="event-card">
            <p>Outreach Progams</p>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <Card onClick={() => history.push(`${match.url}/services`)} id="event-card">
            <p>Services</p>
          </Card>
        </Col>
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <Card onClick={() => history.push(`${match.url}/socials`)} id="event-card">
            <p>Social Progams</p>
          </Card>
        </Col>
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <Card onClick={() => history.push(`${match.url}/weddings`)} id="event-card">
            <p>Wedding Progams</p>
          </Card>
        </Col>
      </Row>
    </div>
    
  )
}

export default Programs;