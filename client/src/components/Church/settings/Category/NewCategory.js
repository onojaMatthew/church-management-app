import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Button } from "antd";

import "./Category.css";

export const NewCategory = ({
  name,
  handleChange,
  handleSubmit,
  toggle,
  modal,
  create_loading,

}) => {
  return (

    <Modal toggle={toggle} isOpen={modal} id="c-modal">
      <ModalHeader toggle={toggle}>
        <p className="header-text">Membership Type</p>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="name">Name</label>
            <input className="form-control" onChange={e => handleChange(e)} placeholder="Name" name="name" value={name} />
          </p>
          <p>
            {create_loading ? <Button className="c-submit-btn" loading>Processing...</Button> : <button className="c-submit-btn" type="submit">Send</button>}
          </p>
        </form>
      </ModalBody>
    </Modal>
  )
}