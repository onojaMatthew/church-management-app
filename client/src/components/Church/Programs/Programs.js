import { useRouteMatch, useHistory } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";

import "./Program.css";

const Programs = () => {
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <div className="programs-container">
      <h1 className="event-title">Events and Activities</h1>
      <Row>
        <Col xs="12" sm="12" md="12" lg="4" xl="6">
          <Card onClick={() => history.push(`${match.url}/birthdays`)} id="event-card">
            <p className="event-name">Birthdays Events</p>
          </Card>
        </Col>
        <Col xs="12" sm="12" md="12" lg="4" xl="6">
          <Card onClick={() => history.push(`${match.url}/burials`)} id="event-card">
            <p className="event-name">Burial Programs</p>
          </Card>
        </Col>
        
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="4" xl="6">
          <Card onClick={() => history.push(`${match.url}/services`)} id="event-card">
            <p className="event-name">Services</p>
          </Card>
        </Col>
        
        <Col xs="12" sm="12" md="12" lg="4" xl="6">
          <Card onClick={() => history.push(`${match.url}/weddings`)} id="event-card">
            <p className="event-name">Wedding Progams</p>
          </Card>
        </Col>
      </Row>
    </div>
    
  )
}

export default Programs;