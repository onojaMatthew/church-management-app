import { Modal, ModalBody, ModalHeader, Input } from "reactstrap";
import { Button } from "antd";

import "./Finance.css";

export const IncomeModal = ({ category_list, handleChange, handleSubmit, resetForm, create_loading, service_type, amount, created_by, date, modal, toggle }) => {
  
  return (
    <Modal id="income-modal" isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>New Income</ModalHeader>
      <ModalBody id="income-modal-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="category">Income Type</label>
            <Input type="select" onChange={(e) => handleChange(e)} name="category" className="form-control">
              <option>Select Income type</option>
              {category_list?.length > 0 && category_list.map((c,i) => (
                <option key={i} value={c.name}>{c?.name}</option>
              ))}
            </Input>
          </div>

          <div>
            <label htmlFor="service_type">Program Name</label>
            <input id="service_type" type="text" name="service_type" onChange={(e) => handleChange(e)} value={service_type} placeholder="Enter Program name" className="form-control" />
          </div>

          <div>
            <label htmlFor="amount">Amount</label>
            <input id="amount" type="text" name="amount" onChange={(e) => handleChange(e)} value={amount} placeholder="Enter Amount" className="form-control" />
          </div>

          <div>
            <label htmlFor="created_by">Entered By</label>
            <input id="created_by" type="text" name="created_by" onChange={(e) => handleChange(e)} value={created_by} placeholder="Enter Your Name" className="form-control" />
          </div>

          <div>
            <label htmlFor="">Date</label>
            <input type="date" name="date" onChange={(e) => handleChange(e)} value={date} placeholder="Enter Program date" className="form-control" />
          </div>
          <button type="reset" onClick={resetForm} className="delete">Cancil</button>
          {create_loading ? <Button className="cancil" loading>Loading...</Button> : <button type="submit" className="cancil">Submit</button>}
          
        </form>
      </ModalBody>
    </Modal>
  );
}