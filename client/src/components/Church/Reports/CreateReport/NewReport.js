import { Modal, ModalBody, ModalHeader, Input } from "reactstrap";
import { Button } from "antd";

export const NewReport = ({
  modal,
  toggle,
  handleChange,
  handleSubmit,
  coordinator,
  subject,
  message,
  create_loading,
  regionalPastor,
}) => {
  
  return (
    <Modal id="income-modal" isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>New Income</ModalHeader>
      <ModalBody id="income-modal-body">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="item">Subject</label>
            <input id="item" type="text" value={subject} placeholder="Report title" onChange={(e) => handleChange(e)} name="subject" className="form-control" />
          </div>

          <div>
            <label htmlFor="unit_price">Zonal Pastor</label>
            <input id="unit_price" type="text" name="unit_price" value={coordinator.first_name + " " + coordinator.last_name} className="form-control" />
          </div>

          <div>
            <label htmlFor="unit_price">regional Pastor</label>
            <input id="unit_price" type="text" name="unit_price" value={regionalPastor.first_name + " " + regionalPastor.last_name} className="form-control" />
          </div>

          <div className="mb-4">
            <label htmlFor="cost">Report</label>
            <textarea id="cost" name="message" onChange={(e) => handleChange(e)} value={message} placeholder="Type a report..." className="form-control" />
          </div>

          <button type="reset" className="delete">Cancil</button>
          
          {
            create_loading ? <Button className="cancil" loading>Loading...</Button> : 
            <button onClick={handleSubmit} type="submit" className="cancil">Submit</button>
          }
           
        </form>
      </ModalBody>
    </Modal>
  );
}