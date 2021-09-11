import { Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Input, Row, Spinner, Table } from "reactstrap"; 
  import { BsFillEyeFill, BsArrowLeftShort } from "react-icons/bs";
import { createWedding, deleteWedding, updateWedding, weddingList } from "../../../../store/actions/actions_wedding";
import "./Wedding.css";
import NewEvent from "./NewEvent";
import UpdateEvent from "./Update";

const Wedding = () => {
  const dispatch = useDispatch();
  const { list_loading, weddings, update_loading, delete_success, update_success, delete_loading, create_loading, create_success, error } = useSelector(state => state.wedding);
  const [ isDetail, setDetail ] = useState(false);
  const [ id, setId ] = useState("");
  const [ modal, setModal ] = useState(false);
  const [ event, setEvent ] = useState({});
  const [ isUpdate, setUpdate ] = useState(false);
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

  const toggleUpdate = () => {
    setUpdate(!isUpdate);
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
    let formData = new FormData();
    formData.append("groom_first_name", groom_first_name);
    formData.append("groom_last_name", groom_last_name)
    formData.append("groom_phone_number", groom_phone_number)
    formData.append("bride_first_name", bride_first_name)
    formData.append("bride_last_name", bride_last_name)
    formData.append("bried_phone_number", bride_phone_number)
    formData.append("venue", venue)
    formData.append("lead_pastor", lead_pastor);
    formData.append("date", date);
    formData.append("wedding_picture", wedding_picture);

    dispatch(createWedding(formData));
  }

  const handlePhoto = (e) => {
    const { files } = e.target;
    setValues({...values, ["wedding_picture"]: files[0]});
  }

  useEffect(() => {
    if (create_success || update_success) {
      setValues({
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
      })
    }
  }, [ create_success, update_success ]);

  const handleUpdate = () => {
    let formData = new FormData();
    formData.append("groom_first_name", groom_first_name);
    formData.append("groom_last_name", groom_last_name)
    formData.append("groom_phone_number", groom_phone_number)
    formData.append("bride_first_name", bride_first_name)
    formData.append("bride_last_name", bride_last_name)
    formData.append("bride_phone_number", bride_phone_number)
    formData.append("venue", venue)
    formData.append("lead_pastor", lead_pastor);
    formData.append("date", date);
    formData.append("wedding_picture", wedding_picture);
    formData.append("id", id);

    dispatch(updateWedding(formData));
  }

  const handleDelete = (id) => {
    dispatch(deleteWedding(id))
  }

  useEffect(() => {
    if (delete_success) {
      setDetail(false)
    }
  }, [ delete_success]);

  useEffect(() => {
    if (update_success) {
      setDetail(false)
    }
  }, [ update_success])

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
                      <label>Wedding Venue</label>
                      <Input value={event?.venue} />
                    </Col>
                    <Col xs="12" sm="12" smd="12" lg="4" xl="4">
                      <label>Wedding Date</label>
                      <Input value={event?.date && event.date.slice(0,10)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="6" sm="6" md="6"></Col>
                    <Col xs="6" sm="6" md="6">
                      <Row>
                        <Col xs="6" sm="6" md="6">
                          <Button className="update_btn" onClick={toggleUpdate}>Update</Button>
                        </Col>
                        <Col xs="6" sm="6" md="6">
                          {delete_loading ? <Button className="delete_btn" loading>Deleting...</Button> : <Button className="delete_btn" onClick={() => handleDelete(event?._id)}>Delete</Button>}
                          
                        </Col>
                      </Row>
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
                          <td>{w.date && w?.date.slice(0,10)}</td>
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
        create_loading={create_loading}
      />
      <UpdateEvent
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
        toggle={toggleUpdate}
        handleChange={handleChange}
        handleSubmit={handleUpdate}
        modal={isUpdate}
        handlePhoto={handlePhoto}
        create_loading={create_loading}
        update_loading={update_success}
      />
    </div>
  )
}

export default Wedding;