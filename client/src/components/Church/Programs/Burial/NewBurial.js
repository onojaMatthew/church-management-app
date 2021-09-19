import { useCallback } from "react";
import { Modal, ModalBody, ModalHeader, Input } from "reactstrap";
import { BsPlus } from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import { Button } from "antd";

import "./Burial.css";

export const NewBurial = ({
  modal,
  toggle,
  onHandleChange,
  create_loading,
  handleSubmit,
  first_name,
  last_name,
  officiating_pastor,
  death_date,
  // sex,
  handlePhoto,
  age,
  burial_date, 
  position,
  burial_venue,
  image_url,
}) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});
  return (
    <div>
      <Modal toggle={toggle} isOpen={modal} id="birthday-modal">
        <ModalHeader toggle={toggle}>Create New Service</ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="first_name">First Name</label>
                <input className="form-control" id="first_name" placeholder="First name" value={first_name} name="first_name" onChange={(e) => onHandleChange(e)} />
              </div>
              <div className="input-container">
                <label htmlFor="topic">Message Title</label>
                <input className="form-control" id="last_name" placeholder="Last name" value={last_name} name="last_name" onChange={(e) => onHandleChange(e)} />
              </div>
              <div className="input-container">
                <label htmlFor="death_date">Bible Quote</label>
                <input className="form-control" id="death_date" type="date" placeholder="Enter death date" value={death_date} name="death_date" onChange={(e) => onHandleChange(e)} />
              </div>
              <div className="input-container">
                <label htmlFor="burial_date">Enter Number of Men</label>
                <input className="form-control" id="burial_date" value={burial_date} name="burial_date" onChange={(e) => onHandleChange(e)} />
              </div>

              <div className="input-container">
                <label htmlFor="sex" id="female">Enter Number of Women</label>
                <input type="select" className="form-control" id="women" name="sex" onChange={(e) => onHandleChange(e)}>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </input> 
              </div>
              <div className="input-container">
                <label htmlFor="age">Age</label>
                <input className="form-control" type="number" id="age" value={age} name="age" onChange={(e) => onHandleChange(e)} /> 
              </div>
              <div className="input-container">
                <label htmlFor="pastor">Officiating Pastor</label>
                <input className="form-control" id="pastor" value={officiating_pastor} name="officiating_pastor" onChange={(e) => onHandleChange(e)} /> 
              </div>
              <div className="input-container">
                <label htmlFor="start-time">Position Held</label>
                <input className="form-control" id="position" value={position} name="position" onChange={(e) => onHandleChange(e)} /> 
              </div>
              <div className="input-container">
                <label htmlFor="venue">Burial Venue</label>
                <input className="form-control" id="venue" value={burial_venue} name="brial_venue" onChange={(e) => onHandleChange(e)} /> 
              </div>
              <label>Upload wedding picture</label>
              <div {...getRootProps()} className="text-center p-file-uploader">
                {image_url.name && image_url.name.length > 0 ? 
                  <Input value={image_url?.name} /> : (
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
              <div className="service-button-container">
                {create_loading ? <Button loading>Processing...</Button> : <Button onClick={handleSubmit}>Submit</Button>}
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}
