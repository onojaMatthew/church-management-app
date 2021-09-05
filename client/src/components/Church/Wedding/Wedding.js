import { Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row, Spinner, Table } from "reactstrap"; 
import { BsFillEyeFill } from "react-icons/bs";
import { weddingList } from "../../../store/actions/actions_wedding";
import "./Wedding.css";

const Wedding = () => {
  const dispatch = useDispatch();
  const { list_loading, weddings, error } = useSelector(state => state.wedding);
  const [ isDetail, setDetail ] = useState(false);
  const [ id, setId ] = useState("");
  const [ event, setEvent ] = useState({});

  useEffect(() => {
    dispatch(weddingList());
  }, [ dispatch ]);

  const toggleView = (id) => {
    setId(id);
    setDetail(!isDetail);
  }

  useEffect(() => {
    if (id && id.length > 0) {
      const details = weddings.find(f => f._id === id);
      setEvent(details);
    }
  }, [ id ]);

  console.log(event)

  return (
    <div>
      {list_loading ? 
          <div className="text-center spin">
            <Spinner className="my-loader">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div> : 
        ( isDetail ? (<Card id="wedding_card">
          <CardBody>
            <div className="card-top">
              <h3>Event Details</h3>
              {/* <Button>Create New Event</Button> */}
            </div>
            <div className="image-wrapper">
              <Image id="wedding_image" preview={false} src={event?.wedding_picture} />
            </div>
          </CardBody>
        </Card>
        ) : 
          <Card id="wedding_card">
            <CardBody>
              <div className="card-top">
                <h3>Wedding Events</h3>
                <Button>Create New Event</Button>
              </div>
              <Row>
                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                  <Table responsive>
                    <thead>
                      <th>S/N</th>
                      <th>Groom Name</th>
                      <th>Bride Name</th>
                      <th>Groom Phone Contact</th>
                      <th>Bride Phone Contact</th>
                      <th>Officiating Lead Pastor</th>
                      <th>Date</th>
                      <th>View Details</th>
                    </thead>
                    <tbody>
                      {weddings && weddings.length > 0 ? weddings.map((w, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{w.groom && w.groom?.first_name} {w.groom && w.groom?.last_name}</td>
                          <td>{w.bride && w.bride?.first_name} {w.bride && w.bride?.last_name}</td>
                          <td>{w.groom && w.groom?.phone}</td>
                          <td>{w.bride && w.bride?.phone}</td>
                          <td>{w?.lead_pastor}</td>
                          <td>{w?.date.slice(0,10)}</td>
                          <td>
                            <BsFillEyeFill onClick={() => toggleView(w?._id)} size={20} id="eye-icon" />
                            {/* <Avatar src={<Image src={w?.wedding_picture} />} /> */}
                          </td>
                        </tr>
                      )) : <h3 className="text-center">No Records Found</h3>} 
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )
      }
    </div>
  )
}

export default Wedding;