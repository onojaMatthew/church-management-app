import React, { useCallback } from "react";
import { Col, Modal, ModalBody, ModalHeader, Input, Row } from "reactstrap";
import { BsPlus } from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import { Button } from "antd";

const UpdateEvent = ({ 
  modal, 
  toggle,
  groom_first_name,
  groom_last_name,
  groom_phone_number,
  bride_first_name,
  bride_last_name,
  bride_phone_number,
  venue,
  date,
  lead_pastor,
  wedding_picture,
  handlePhoto,
  handleChange,
  create_loading,
  handleSubmit,
}) => {

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});
  
  return (
    <div className="wedding-modal">
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} id="header-title">Update Event</ModalHeader>
        <ModalBody>
          <Row className="mt-4">
            <Col xs="12" sm="12" md="12" lg="6" xl="6">
              <label htmlFor="groom_f_name">Groom First Name</label>
              <Input id="groom_f_name" name="groom_first_name" onChange={(e) => handleChange(e)} value={groom_first_name} placeholder="Groom first name" />
            </Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6">
              <label htmlFor="groom_l_name">Groom Last Name</label>
              <Input id="groom_l_name" name="groom_last_name" onChange={(e) => handleChange(e)} value={groom_last_name} placeholder="Groom last name" />
            </Col>
          </Row>
         
          <Row className="mt-4">
            <Col xs="12" sm="12" md="12" lg="6" xl="6">
              <label htmlFor="bride_f_name">Bride First Name</label>
              <Input id="bride_f_name" name="bride_first_name" value={bride_first_name} onChange={(e) => handleChange(e)} placeholder="Bride first name" />
            </Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6">
              <label htmlFor="bride_l_name">Bride Last Name</label>
              <Input id="bride_l_name" name="bride_last_name" value={bride_last_name} onChange={(e) => handleChange(e)} placeholder="Bride last name" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs="12" sm="12" md="12" lg="6" xl="6">
              <label htmlFor="groom_phone">Groom Phone Number</label>
              <Input id="groom_phone" name="groom_phone_number" value={groom_phone_number} onChange={(e) => handleChange(e)} placeholder="Groom phone number" />
            </Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6">
              <label htmlFor="bride_phone">Bride Phone Number</label>
              <Input id="bride_phone" name="bride_phone_number" value={bride_phone_number} onChange={(e) => handleChange(e)} placeholder="Bride phone number" />
            </Col>
          </Row>
          <Row className="mt-4"> 
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <label htmlFor="venue">Event Venue </label>
              <Input id="venue" name="venue" value={venue} onChange={(e) => handleChange(e)} placeholder="Wedding venue" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <label htmlFor="pastor">Officiating Lead Pastor</label>
              <Input id="pastor" name="lead_pastor" value={lead_pastor} onChange={(e) => handleChange(e)} placeholder="Officiating lead pastor" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <label htmlFor="date">Date</label>
              <Input id="date" type="date" name="date" value={date} onChange={(e) => handleChange(e)} />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs="12" xl="12">
              <label>Upload wedding picture</label>
              <div {...getRootProps()} className="text-center p-file-uploader">
                {wedding_picture.name && wedding_picture.name.length > 0 ? 
                  <Input value={wedding_picture?.name} /> : (
<>
                    <input {...getInputProps()} onChange={(e) => handlePhoto(e)} />
                    <i className="ri-folder-reduce-fill"></i>
                    {
                      isDragActive ?
                        <p style={{ color: "#00000045"}}>Drop the files
                         here ...</p> :
                        <div style={{ color: "#00000045"}}>
                          <BsPlus size={40} />
                          <p>Upload</p>
                        </div>
                    }
                  </>
                  )}
              </div>
              {/* {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "meansOfIdentification" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null} */}
            </Col>
          </Row>
          {create_loading ? <Button className="submit-button" loading>Processing...</Button> : <Button className="submit-button" onClick={handleSubmit}>Submit</Button>}
        </ModalBody>
      </Modal>
    </div>
  )
}

export default UpdateEvent;