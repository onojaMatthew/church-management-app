import { Modal, ModalBody, ModalHeader, Input } from "reactstrap";
import { Button } from "antd";

export const NewZonalPastor = ({
  modal,
  toggle,
  handleChange,
  handleSubmit,
  first_name,
  last_name,
  phone,
  password,
  email,
  add_loading,
  roles,
  zone
}) => {
  return (
    <Modal id="income-modal" isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>New Coordinator</ModalHeader>
      <ModalBody id="income-modal-body">
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
            <label htmlFor="phone">Role</label>
            <Input id="phone" type="select" name="role" onChange={(e) => handleChange(e)} className="form-control">
              <option>----------------------------Choose a Role-------------------------------</option>
              {roles && roles.length > 0 && roles.map((role, i) => (
                <option value={role?._id}>{role?.name}</option>
              ))}
              
            </Input>
          </div>

          <div className="mb-4">
            <label htmlFor="zone">Zone</label>
            <input id="zone" type="text" name="zone" onChange={(e) => handleChange(e)} value={zone} placeholder="Enter zone name" className="form-control" />
          </div>

          <button type="reset" className="delete">Cancil</button>
          {
            add_loading ? <Button className="cancil" loading>Loading...</Button> : 
            <button onClick={handleSubmit} type="submit" className="cancil">Submit</button>
          }
        </form>
      </ModalBody>
    </Modal>
  );
}