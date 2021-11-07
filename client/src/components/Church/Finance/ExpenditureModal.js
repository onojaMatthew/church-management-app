import { Modal, ModalBody, ModalHeader, Input } from "reactstrap";
import { Button } from "antd";

import "./Finance.css";

export const ExpenditureModal = ({  
    cost,
    item,
    unit_price,
    quantity,
    authorized_by,
    purchased_by,
    time,
    handleChange, 
    handleSubmit, 
    resetForm, 
    expenditure_create_loading, 
    modal, 
    toggle 
  }) => {
  
  return (
    <Modal id="income-modal" isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>New Income</ModalHeader>
      <ModalBody id="income-modal-body">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="item">Name of Item</label>
            <input id="item" type="text" value={item} placeholder="Enter item name" onChange={(e) => handleChange(e)} name="item" className="form-control" />
          </div>

          <div>
            <label htmlFor="unit_price">Item Unit Price</label>
            <input id="unit_price" type="text" name="unit_price" onChange={(e) => handleChange(e)} value={unit_price} placeholder="Enter item unit price" className="form-control" />
          </div>

          <div>
            <label htmlFor="quantity">Enter quantity</label>
            <input id="quantity" type="text" name="quantity" onChange={(e) => handleChange(e)} value={quantity} placeholder="Enter item quantity" className="form-control" />
          </div>

          <div>
            <label htmlFor="cost">Total Cost</label>
            <input id="cost" type="text" name="cost" onChange={(e) => handleChange(e)} value={cost} placeholder="Enter total cost of item" className="form-control" />
          </div>

          <div>
            <label htmlFor="authorized_by">Who authorized procurement?</label>
            <input id="authorized_by" type="text" name="authorized_by" onChange={(e) => handleChange(e)} value={authorized_by} placeholder="Who authorized purchase" className="form-control" />
          </div>

          <div>
            <label htmlFor="purchased_by">Who procured the item?</label>
            <input id="purchased_by" type="text" name="purchased_by" onChange={(e) => handleChange(e)} value={purchased_by} placeholder="Who purchased item" className="form-control" />
          </div>

          <div>
            <label htmlFor="time">Date</label>
            <input type="date" name="time" onChange={(e) => handleChange(e)} value={time} className="form-control" />
          </div>
          <button type="reset" onClick={resetForm} className="delete">Cancil</button>
          <button onClick={handleSubmit} type="submit" className="cancil">Submit</button>
          {/* {expenditure_create_loading ? <Button className="cancil" loading>Loading...</Button> :} */}
          
        </form>
      </ModalBody>
    </Modal>
  );
}