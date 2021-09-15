import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Button } from "antd";

export const NewBirthday = ({
  modal,
  toggle,
  onHandleChange,
  create_loading,
  handleSubmit,
  birthdayData,
  addNewData,
}) => {

  return (
    <div>
      <Modal toggle={toggle} isOpen={modal} id="birthday-modal">
        <ModalHeader toggle={toggle}>Create New Event</ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={handleSubmit}>
              {birthdayData.map((field, index) => (
                <>
                  <div className="input-container">
                    <label htmlFor="first_name">First Name</label>
                    <input className="form-control" id="first_name" placeholder="First name" value={field?.first_name} name="first_name" onChange={(e) => onHandleChange(e, index)} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="last_name">Last Name</label>
                    <input className="form-control" id="last_name" placeholder="Last name" value={field?.last_name} name="last_name" onChange={(e) => onHandleChange(e, index)} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" id="email" placeholder="Enter email address" value={field?.email} name="email" onChange={(e) => onHandleChange(e, index)} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="phone">Phone Number</label>
                    <input className="form-control" className="form-control" id="phone" placeholder="Phone number" value={field?.phone} name="phone" onChange={(e) => onHandleChange(e, index)} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="birth_date">Date of Birth</label>
                    <input className="form-control" type="date" id="birth_date" value={field?.birth_date} name="birth_date" onChange={(e) => onHandleChange(e, index)} />
                  </div>

                  <div className="input-container">
                    <label htmlFor="female">
                    <input type="radio" id="female" value={"female"} name="sex" onChange={(e) => onHandleChange(e, index)} /> Female
                    </label>
                    <label htmlFor="male">
                    <input type="radio" id="male" value={"male"} name="sex" onChange={(e) => onHandleChange(e, index)} /> Male
                    </label>
                  </div>
                </>
              ))}
              <div className="button-container">
                {create_loading ? <Button loading>Processing...</Button> : <Button onClick={handleSubmit}>Submit</Button>}
                <Button onClick={addNewData}>Add more...</Button>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}
