import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Modal, ModalBody, ModalHeader, Row, Col, Input } from "reactstrap";
import { Button } from "antd";

export const NewRegionalPastor = ({
  modal,
  toggle,
  handleChange,
  handleSubmit,
  first_name,
  last_name,
  phone,
  password,
  email,
  region,
  add_loading,
  roles,
}) => {

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});
  
  
  // <Row className="mt-4">
  //       <Col xs="12" xl="12">
  //         <label>Upload a valid means of identification</label>
  //         <div {...getRootProps()} className="text-center p-file-uploader">
  //           {uploadedPhoto && uploadedPhoto.length > 0 ? <Image src={uploadedPhoto} alt="identity" style={{ width: "100%", height: "100%" }} /> : (
  //             <>
  //               <input {...getInputProps()} onChange={(e) => handlePhoto(e)} />
  //               <i className="ri-folder-reduce-fill"></i>
  //               {
  //                 isDragActive ?
  //                   <p style={{ color: "#00000045"}}>Drop the files here ...</p> :
  //                   <div style={{ color: "#00000045"}}>
  //                     <Icon name="plus" />
  //                     <p>Upload</p>
  //                   </div>
  //               }
  //             </>
  //           )}
  //         </div>
  //         {Array.isArray(errorMsg) && errorMsg.length > 0 ? errorMsg.map((error, i) => error.param === "meansOfIdentification" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
  //       </Col>
  //     </Row>
  return (
    // <Modal id="income-modal" isOpen={modal} toggle={toggle}>
    //   <ModalHeader toggle={toggle}>New Regional Pastor</ModalHeader>
    //   <ModalBody id="income-modal-body">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="first_name">First Name</label>
            <input id="first_name" type="text" value={first_name} placeholder="First Name" onChange={(e) => handleChange(e)} name="first_name" className="form-control" />
          </div>

          <div>
            <label htmlFor="last_name">Last Name</label>
            <input id="last_name" type="text" name="last_name" placeholder="Last Name" onChange={(e) => handleChange(e)} value={last_name} className="form-control" />
          </div>

          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" onChange={(e) => handleChange(e)} value={email} placeholder="example@mail.com" className="form-control" />
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" onChange={(e) => handleChange(e)} value={password} placeholder="Enter password" className="form-control" />
          </div>

          <div className="mb-4">
            <label htmlFor="phone">Phone</label>
            <input id="phone" type="text" name="phone" onChange={(e) => handleChange(e)} value={phone} placeholder="080123..." className="form-control" />
          </div>

          <div className="mb-4">
            <label htmlFor="region">Region</label>
            <input id="region" type="text" name="region" onChange={(e) => handleChange(e)} value={region} placeholder="Region" className="form-control" />
          </div>

          <div className="mb-4">
            <label htmlFor="phone">Role</label>
            <Input id="phone" type="select" name="role" onChange={(e) => handleChange(e)} className="form-control">
              <option>----------------------------Choose a Role-------------------------------</option>
              {roles && roles.length > 0 && roles.map((role, i) => (
                <option value={role?._id}>{role?.name}</option>
              ))}
              
            </Input>
          </div>
          <button type="reset" className="delete">Cancil</button>
          
          {
            add_loading ? <Button className="cancil" loading>Loading...</Button> : 
            <button onClick={handleSubmit} type="submit" className="cancil">Submit</button>
          }
           
        </form>
    //   </ModalBody>
    // </Modal>
  );
}