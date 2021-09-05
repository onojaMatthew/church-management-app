import { Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Input, Row, Spinner, Table } from "reactstrap"; 
  import { BsFillEyeFill, BsArrowLeftShort } from "react-icons/bs";
import { createWedding, weddingList } from "../../../store/actions/actions_wedding";
import "./Wedding.css";
import NewEvent from "./NewEvent";

const Wedding = () => {
  const dispatch = useDispatch();
  const { list_loading, weddings, error } = useSelector(state => state.wedding);
  const [ isDetail, setDetail ] = useState(false);
  const [ id, setId ] = useState("");
  const [ modal, setModal ] = useState(false);
  const [ event, setEvent ] = useState({});
  const [ values, setValues ] = useState({ 
    groom_first_name: "", 
    groom_last_name: "",
    groom_phone_number: "",
    bride_first_name: "",
    bride_last_name: "",
    bride_phone_number: "",
    venue: "",
    date: "",
    lead_pastor: "",
    wedding_picture: "",
  });

  const toggle = () => {
    setModal(!modal);
  }

  const {
    groom_first_name,
    groom_last_name,
    groom_phone_number,
    bride_first_name,
    bride_last_name,
    bride_phone_number,
    venue,
    date,
    lead_pastor,
    wedding_picture
  } = values;

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

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({...values, [name]: value});
  }

  const handleSubmit = () => {
    const data = {
      groom_first_name,
      groom_last_name,
      groom_phone_number,
      bride_first_name,
      bride_last_name,
      bride_phone_number,
      venue,
      date,
      lead_pastor,
      wedding_picture
    }

    dispatch(createWedding(data));
  }

  const handlePhoto = (e) => {
    const { files } = e.target;
    setValues({...values, ["wedding_picture"]: files[0]});
  }


  return (
    <div>
      {list_loading ? 
          <div className="text-center spin">
            <Spinner className="my-loader">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div> : 
        ( isDetail ? (
          <Card id="wedding_card">
            <CardBody>
              <BsArrowLeftShort size={40} id="arrow-icon" onClick={() => setDetail(false)} />
              <div className="card-top">
                <h3>Event Details</h3>
              </div>
              <Row>
                <Col xs="12" sm="12" md="12" lg="3" xl="3">
                  <div className="image-wrapper">
                    <Image id="wedding_image" preview={false} src={event?.wedding_picture} />
                  </div>
                </Col>
                <Col xs="12" sm="12" md="12" lg="9" xl="9">
                  <h3 className="celebrant-h3">Celebrants Information</h3>
                  <Row>
                    <Col xs="12" sm="12" smd="12" lg="4" xl="4">
                      <label>Groom First Name</label>
                      <Input value={event.groom && event.groom?.first_name} />
                    </Col>
                    <Col xs="12" sm="12" smd="12" lg="4" xl="4">
                      <label>Groom Last Name</label>
                      <Input value={event.groom && event.groom?.last_name} />
                    </Col>
                    <Col xs="12" sm="12" smd="12" lg="4" xl="4">
                      <label>Groom Phone Number</label>
                      <Input value={event.groom && event.groom?.phone} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" sm="12" smd="12" lg="4" xl="4">
                      <label>Bride First Name</label>
                      <Input value={event.bride && event.bride?.first_name} />
                    </Col>
                    <Col xs="12" sm="12" smd="12" lg="4" xl="4">
                      <label>Bride Last Name</label>
                      <Input value={event.bride && event.bride?.last_name} />
                    </Col>
                    <Col xs="12" sm="12" smd="12" lg="4" xl="4">
                      <label>Bride Phone Number</label>
                      <Input value={event.bride && event.bride?.phone} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" sm="12" smd="12" lg="4" xl="4">
                      <label>Officiating Lead Pastor</label>
                      <Input value={event?.lead_pastor } />
                    </Col>
                    <Col xs="12" sm="12" smd="12" lg="4" xl="4">
                      <label>Groom Last Name</label>
                      <Input value={event?.venue} />
                    </Col>
                    <Col xs="12" sm="12" smd="12" lg="4" xl="4">
                      <label>Groom Phone Number</label>
                      <Input value={event?.date && event.date.slice(0,10)} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        ) : 
          <Card id="wedding_card">
            <CardBody>
              <div className="card-top">
                <h3>Wedding Events</h3>
                <Button onClick={toggle}>Create New Event</Button>
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
      <NewEvent
        groom_first_name={groom_first_name}
        groom_last_name={groom_last_name}
        groom_phone_number={groom_phone_number}
        bride_first_name={bride_first_name}
        bride_last_name={bride_last_name}
        bride_phone_number={bride_phone_number}
        venue={venue}
        date={date}
        lead_pastor={lead_pastor}
        wedding_picture={wedding_picture}
        toggle={toggle}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        modal={modal}
        handlePhoto={handlePhoto}
      />
    </div>
  )
}

export default Wedding;