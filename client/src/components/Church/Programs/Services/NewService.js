import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Button } from "antd";

import "./Service.css";

export const NewBirthday = ({
  modal,
  toggle,
  onHandleChange,
  create_loading,
  handleSubmit,
  name, 
  preacher, 
  topic, 
  bible_quote, 
  men, 
  women, 
  children, 
  youth, 
  start_time, 
  end_time
}) => {

  return (
    <div>
      <Modal toggle={toggle} isOpen={modal} id="birthday-modal">
        <ModalHeader toggle={toggle}>Create New Event</ModalHeader>
        <ModalBody>
          <div>
            <form onSubmit={handleSubmit}>
              
                <>
                  <div className="input-container">
                    <label htmlFor="service">Service Name</label>
                    <input className="form-control" id="service" placeholder="Service name" value={name} name="name" onChange={(e) => onHandleChange(e)} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="preacher">Last Name</label>
                    <input className="form-control" id="preacher" placeholder="Preacher name" value={preacher} name="preacher" onChange={(e) => onHandleChange(e)} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="topic">Message Title</label>
                    <input className="form-control" id="topic" placeholder="Enter message topic" value={topic} name="topic" onChange={(e) => onHandleChange(e)} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="bible_quote">Bible Quote</label>
                    <input className="form-control" className="form-control" id="bible_quote" placeholder="Enter bible quotation" value={bible_quote} name="bible_quote" onChange={(e) => onHandleChange(e)} />
                  </div>
                  <div className="input-container">
                    <label htmlFor="men">Number of Men</label>
                    <input className="form-control" id="men" value={men} name="men" onChange={(e) => onHandleChange(e)} />
                  </div>

                  <div className="input-container">
                    <label htmlFor="female" id="female">Enter Number of Women</label>
                    <input type="number" className="form-control" id="women" value={women} name="women" onChange={(e) => onHandleChange(e)} /> 
                   
                    
                    <input type="number" id="youth" value={youth} name="youth" onChange={(e) => onHandleChange(e)} /> <label htmlFor="male" id="male">Male
                    </label>
                  </div>
                </>
              <div className="button-container">
                {create_loading ? <Button loading>Processing...</Button> : <Button onClick={handleSubmit}>Submit</Button>}
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}
