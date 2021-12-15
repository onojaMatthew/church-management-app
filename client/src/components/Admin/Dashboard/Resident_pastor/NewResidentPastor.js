import React, { useCallback } from "react";
import { Col, Row, Input } from "reactstrap";
import { Button, Image } from "antd";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

export const NewResidentPastor = ({
  uploadedFile,
  handleChange,
  handleSubmit,
  first_name,
  last_name,
  phone,
  email,
  add_loading,
  roles,
  handlePhoto,
  validation_error,
  toggle
}) => {

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});
  
  return (
    <div className="regional_pastor_form">
    <FaArrowLeft onClick={toggle} className="reg-back" />
    <p className="form-title">Pastor profile</p>
    <form onSubmit={handleSubmit} >
      <Row className="mt-4 mb-4">
        <Col xs="12" xl="4">
          <label>Upload photo</label>
          <div {...getRootProps()} className="text-center r-file-uploader">
            {uploadedFile && uploadedFile.length > 0 ? <Image src={uploadedFile} alt="identity" style={{ width: "200px", height: "230px" }} /> : (
              <>
                <input {...getInputProps()} onChange={(e) => handlePhoto(e)} />
                <i className="ri-folder-reduce-fill"></i>
                {
                  isDragActive ?
                    <p style={{ color: "#00000045"}}>Drop the files here ...</p> :
                    <div style={{ color: "#00000045"}} className="mt-2">
                      <FaPlus />
                      <p>Upload</p>
                    </div>
                }
              </>
            )}
          </div>
          {validation_error.length > 0 ? validation_error.map((error, i) => error.param === "image_url" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <label htmlFor="first_name">First Name</label>
          <input id="first_name" type="text" value={first_name} placeholder="First Name" onChange={(e) => handleChange(e)} name="first_name" className="form-control" />
          {validation_error.length > 0 ? validation_error.map((error, i) => error.param === "first_name" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <label htmlFor="last_name">Last Name</label>
          <input id="last_name" type="text" name="last_name" placeholder="Last Name" onChange={(e) => handleChange(e)} value={last_name} className="form-control" />
          {validation_error.length > 0 ? validation_error.map((error, i) => error.param === "last_name" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" onChange={(e) => handleChange(e)} value={email} placeholder="example@mail.com" className="form-control" />
          {validation_error.length > 0 ? validation_error.map((error, i) => error.param === "email" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
        <Col xs="12" sm="12" md="12" lg="4" xl="4">
        <label htmlFor="phone">Phone</label>
          <input id="phone" type="text" name="phone" onChange={(e) => handleChange(e)} value={phone} placeholder="080123..." className="form-control" />
          {validation_error.length > 0 ? validation_error.map((error, i) => error.param === "phone" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col xs="12" sm="12" md="12" lg="8" xl="8">
          <label htmlFor="role">Role</label>
          <Input id="role" type="select" name="role" onChange={(e) => handleChange(e)} className="form-control">
            <option>Choose a Role</option>
            {roles && roles.length > 0 && roles.map((role, i) => (
              <option value={role?._id}>{role?.name}</option>
            ))}
          </Input>
          {validation_error.length > 0 ? validation_error.map((error, i) => error.param === "role" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
        </Col>
      </Row>
      
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <Row>
            <Col xs="12" sm="12" md="12" lg="3" xl="3">
              <button type="reset" className="reg-delete">Cancil</button>
            </Col>
            <Col xs="12" sm="12" md="12" lg="3" xl="3">
              {
                add_loading ? <Button className="reg-cancil" loading>Loading...</Button> : 
                <button onClick={handleSubmit} type="submit" className="reg-cancil">Submit</button>
              }
            </Col>
          </Row>
        </Col>
        
      </Row>
    </form>
  </div>
  );
}