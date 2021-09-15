import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Button } from "antd";

export const NewBirthday = ({
  modal,
  toggle,
  first_name,
  last_name,
  phone,
  email,
  date_of_birth,
  onHandleChange,
  create_loading,
  handleSubmit,
}) => {
  return (
    <div>
      <Modal toggle={toggle} isOpen={modal} id="birthday-modal">
        <ModalHeader toggle={toggle}>Create New Event</ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="first_name">First Name</label>
                <input className="form-control" id="first_name" placeholder="First name" value={first_name} name="first_name" onChange={(e) => onHandleChange(e)} />
              </div>
              <div className="input-container">
                <label htmlFor="last_name">Last Name</label>
                <input className="form-control" id="last_name" placeholder="Last name" value={last_name} name="last_name" onChange={(e) => onHandleChange(e)} />
              </div>
              <div className="input-container">
                <label htmlFor="email">Email</label>
                <input className="form-control" type="email" id="email" placeholder="Enter email address" value={email} name="email" onChange={(e) => onHandleChange(e)} />
              </div>
              <div className="input-container">
                <label htmlFor="phone">Phone Number</label>
                <input className="form-control" className="form-control" id="phone" placeholder="Phone number" value={phone} name="phone" onChange={(e) => onHandleChange(e)} />
              </div>

              <div className="input-container">
                <label htmlFor="birth_date">Date of Birth</label>
                <input className="form-control" type="date" id="birth_date" value={date_of_birth} name="date_of_birth" onChange={(e) => onHandleChange(e)} />
              </div>
              {create_loading ? <Button loading>Processing...</Button> : <Button onClick={handleSubmit}>Submit</Button>}
              
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}
