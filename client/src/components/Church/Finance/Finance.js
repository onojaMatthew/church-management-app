import { Button } from "antd";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { localAuth } from "../../../helper/authenticate";
import { useDispatch, useSelector } from "react-redux";
import { createIncome, deleteIncome, fetchIncome, fetchIncomeCategory } from "../../../store/actions/actions_finance";
import { Card, CardBody, Col, Row, Table, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

import "./Finance.css";
import { IncomeModal } from "./IncomeModal";

const Finance = () => {
  const church = localAuth().church && localAuth().church._id;
  const dispatch = useDispatch()
  const { create_loading, category_list, delete_loading, income_list, docs } = useSelector(state => state.finance)
  const [ values, setValues ] = useState({ category: "", service_type: "", amount: "", created_by: "", date: "" });
  const [ modal, setModal ] = useState(false);
  const [ incomeModal, setIncomeModal ] = useState(false);
  const [ expenditureModal, setExpenditureModal ] = useState(false);
  const [ toggleView, setToggleView ] = useState(false);
  const [ isIncomeDelete, setIncomeDelete ] = useState(false);
  const [ isExpDelete, SetExpDelete ] = useState(false);
  const [ message, setMessage ] = useState("");
  const [ incomeId, setIncomeId ] = useState("");

  const { service_type, amount, created_by, date, category } = values;

  const { nextPage, prevPage, page, totalPages } = income_list;

  const toggleConfirmDelete = (action, id) => {
    if (action === "income_delete") {
      setMessage("Are you sure you want to delete this income data? To delete, click CONTINUE");
      setIncomeDelete(true);
      setModal(true);
      setIncomeId(id);
    } else {
      SetExpDelete(true);
      setMessage("Are you sure you want to delete this Expenditure data? To delete, click CONTINUE");
      setModal(true);
    }
  }

  const handleDelete = (name) => {
    if (name.includes("income")) {
      dispatch(deleteIncome(incomeId));
    } else {

    }
  }

  const toggleIncome = () => {
    setIncomeModal(!incomeModal);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { category, service_type, amount, created_by, date, church } ;
    dispatch(createIncome(data))
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValues = {...values, [name]: value };
    setValues(newValues); 
  }

  const resetForm = () => {
    setValues({ category: "", service_type: "", amount: "", created_by: "", date: "" });
    toggleIncome();
  }

  useEffect(() => {
    const offset=1;
    const limit=10;
    dispatch(fetchIncome(offset, limit));
    dispatch(fetchIncomeCategory());
  }, [ dispatch ]);

  let paginateArr = [];
  for (let i = 1; i <= totalPages; i++) {
    paginateArr.push(i);
  }

  const handleNextPage = (next_page) => {
    const offset=next_page;
    const limit=10;
    dispatch(fetchIncome(offset, limit));
  }

  console.log(income_list, category_list, " the docs");
  return (
    <div>
      {toggleView ? (
        <Row>
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Row>
              <Col xs="12" sm="12" md="12" lg="8"></Col>
              <Col xs="12" sm="12" md="12" lg="2">
                <Button className="action-btn" onClick={toggleIncome}>Create Expenditure</Button>
              </Col>
              <Col xs="12" sm="12" md="12" lg="2">
                <Button className="action-btn" onClick={() => setToggleView(false)}>View Income</Button>
              </Col>
            </Row>
            <Card id="income-card">
              <CardBody>
                <h3>Expenditure Table</h3>
                <Table responsive>
                  <thead>
                    <th>S/N</th>
                    <th>Item</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Authorized By</th>
                    <th>Purchased By</th>
                    <th>Date</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Table water</td>
                      <td>N 100.00</td>
                      <td>24</td>
                      <td>N 2,400.00</td>
                      <td>Pastor Lawrence Eghene</td>
                      <td>Lawrence Eghene</td>
                      <td>03/10/2021</td>
                      <td><FaTrash onClick={() => toggleConfirmDelete("exp_delete")} className="delete-icon" /></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Table water</td>
                      <td>N 100.00</td>
                      <td>24</td>
                      <td>N 2,400.00</td>
                      <td>Pastor Lawrence Eghene</td>
                      <td>Lawrence Eghene</td>
                      <td>03/10/2021</td>
                      <td><FaTrash onClick={() => toggleConfirmDelete("exp_delete")} className="delete-icon" /></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Table water</td>
                      <td>N 100.00</td>
                      <td>24</td>
                      <td>N 2,400.00</td>
                      <td>Pastor Lawrence Eghene</td>
                      <td>Lawrence Eghene</td>
                      <td>03/10/2021</td>
                      <td><FaTrash onClick={() => toggleConfirmDelete("exp_delete")} className="delete-icon" /></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
              {/* <div className="justify-content-center">
              {birthdays && birthdays.totalPages && birthdays.totalPages > 1 ? (
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center mt-5">
                    <li className="page-item">
                      <span className="page-link" onClick={() => handleNextPage(prevPage)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </span>
                    </li>
                    {paginateArr && paginateArr.map((p, i) => (
                      <li key={i} onClick={() => handleNextPage(p && p)} className={p === page ? `page-item active` : "page-item"}><span className="page-link">{p}</span></li>
                    ))}
                    
                    <li className="page-item">
                      <span className="page-link" onClick={() => handleNextPage(nextPage && nextPage)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </span>
                    </li>
                  </ul>
                </nav>
              ) : null}
            </div> */}
            </Card>
          </Col>
        </Row>
        ) : (
        <Row>
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Row>
              <Col xs="12" sm="12" md="12" lg="8"></Col>
              <Col xs="12" sm="12" md="12" lg="2">
                <Button className="action-btn" onClick={toggleIncome}>Create Income</Button>
              </Col>
              <Col xs="12" sm="12" md="12" lg="2">
                <Button className="action-btn" onClick={() => setToggleView(true)}>View Expenditure</Button>
              </Col>
            </Row>
            <Card id="expenditure-card">
              <CardBody>
                <h3>Income Table</h3>
                <Table responsive>
                  <thead>
                    <th>S/N</th>
                    <th>Income Category</th>
                    <th>Service Type</th>
                    <th>Amount</th>
                    <th>Created By</th>
                    <th>Date</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    {docs?.length > 0 ? docs.map((d, i) => {
                      let date = new Date(d?.date);
                      return (
                        <tr>
                        <td>{i + 1}</td>
                        <td>{d?.category}</td>
                        <td>{d?.service_type}</td>
                        <td>N {d?.amount}</td>
                        <td>{d?.created_by}</td>
                        <td>{date && date.toLocaleDateString()}</td>
                        <td><FaTrash onClick={() => toggleConfirmDelete("income_delete", d?._id)} className="delete-icon" /></td>
                      </tr>
                    )}): <h1 className="text-center">No records found</h1>
                  }
                
                  </tbody>
                </Table>
              </CardBody>
              <div className="justify-content-center">
                {income_list && income_list.totalPages && income_list.totalPages > 1 ? (
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center mt-5">
                      <li className="page-item">
                        <span className="page-link" onClick={() => handleNextPage(prevPage)} aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </span>
                      </li>
                      {paginateArr && paginateArr.map((p, i) => (
                        <li key={i} onClick={() => handleNextPage(p && p)} className={p === page ? `page-item active` : "page-item"}><span className="page-link">{p}</span></li>
                      ))}
                      
                      <li className="page-item">
                        <span className="page-link" onClick={() => handleNextPage(nextPage && nextPage)} aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </span>
                      </li>
                    </ul>
                  </nav>
                ) : null}
              </div>
            </Card>
          </Col>
        </Row>
      )}
      
      
      <Modal id="income-modal" isOpen={modal} toggle={toggleConfirmDelete}>
        <ModalHeader isOpen={modal}>Confirm Delete</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          {delete_loading ? 
            <Button loading>Deleting...</Button> : 
            <>
              <Button onClick={() => handleDelete(`${message}`)} className="delete">
                Delete
              </Button>
              <Button onClick={() => setModal(false)} className="cancil">
                Cancil
              </Button>
            </>
          }
          
        </ModalFooter>
        
      </Modal>
      <IncomeModal
        modal={incomeModal}
        toggle={toggleIncome}
        category={category} 
        service_type={service_type} 
        amount={amount} 
        created_by={created_by} 
        date={date}
        handleChange={handleChange}
        resetForm={resetForm}
        handleSubmit={handleSubmit}
        create_loading={create_loading}
        category_list={category_list}
      />
    </div>
  );
}

export default Finance;