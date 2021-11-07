import { Button } from "antd";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { AiOutlineFilter } from "react-icons/ai";
import { localAuth } from "../../../helper/authenticate";
import { useDispatch, useSelector } from "react-redux";
import { createIncome, deleteIncome, fetchIncome, fetchIncomeCategory } from "../../../store/actions/actions_finance";
import { Card, CardBody, Col, Row, Table, Modal, ModalBody, ModalHeader, ModalFooter, Input } from "reactstrap";

import "./Finance.css";
import { IncomeModal } from "./IncomeModal";
import { ExpenditureModal } from "./ExpenditureModal";
import { createExpenditure, deleteExpenditure, fetchExpenditure, filter_expenditure, search_expenditure } from "../../../store/actions/actions_expenditure";
import Search from "../../SearchComponent/Search";

const Finance = () => {
  const church = localAuth().church && localAuth().church._id;
  const dispatch = useDispatch()
  const { create_loading, create_success, category_list, delete_loading, income_list, docs } = useSelector(state => state.finance);
  const { expenditures, exp_docs, expenditure_create_success } = useSelector(state => state.expenditureReducer);
  const [ values, setValues ] = useState({ category: "", service_type: "", amount: "", created_by: "", date: "" });
  const [ expValues, setExpValues ] = useState({ cost: "", item: "", unit_price: "", quantity: "", authorized_by: "", purchased_by: "", time: "" });
  const [ filterDate, setFilterDate ] = useState("");
  const [ modal, setModal ] = useState(false);
  const [ incomeModal, setIncomeModal ] = useState(false);
  const [ expenditureModal, setExpenditureModal ] = useState(false);
  const [ toggleView, setToggleView ] = useState(false);
  const [ isIncomeDelete, setIncomeDelete ] = useState(false);
  const [ isExpDelete, SetExpDelete ] = useState(false);
  const [ search_term, setSearchTerm ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ incomeId, setIncomeId ] = useState("");
  const [ expenditureId, setExpenditureId ] = useState("");

  const { service_type, amount, created_by, date, category } = values;

  const { nextPage, prevPage, page, totalPages } = income_list;

  const { item, cost, unit_price, quantity, authorized_by, purchased_by, time } = expValues;

  const filterData = [
    { name: "All", value: "all"},
    { name: "24 hours", value: "1 days" },
    { name: "Last 1 week", value: "1 weeks" },
    { name: "Last 2 week", value: "2 weeks" },
    { name: "Last 3 week", value: "3 weeks" },
    { name: "1 month ago", value: "1 months" },
    { name: "3 months ago", value: "3 months" },
    { name: "6 months ago", value: "6 months" },
    { name: "1 year ago", value: "12 months" }
  ]

  const toggleConfirmDelete = (action, id) => {
    if (action === "income_delete") {
      setMessage("Are you sure you want to delete this income data? To delete, click CONTINUE");
      setIncomeDelete(true);
      setModal(true);
      setIncomeId(id);
    } else {
      setExpenditureId(id)
      SetExpDelete(true);
      setMessage("Are you sure you want to delete this Expenditure data? To delete, click CONTINUE");
      setModal(true);
    }
  }

  const handleDelete = (name) => {
    if (name.includes("income")) {
      dispatch(deleteIncome(incomeId));
    } else {
      dispatch(deleteExpenditure(expenditureId));
    }
  }

  const toggleIncome = () => {
    setIncomeModal(!incomeModal);
  }

  const toggleExpenditure = () => {
    setExpenditureModal(!expenditureModal);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expenditureModal) {
      const data = { church, item, cost, unit_price, quantity, authorized_by, purchased_by, time };
      dispatch(createExpenditure(data));
    } else {
      const data = { category, service_type, amount, created_by, date, church } ;
      dispatch(createIncome(data))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (expenditureModal) {
      const exp_values = {...expValues, [name]: value };
      setExpValues(exp_values);
    } else {
      let newValues = {...values, [name]: value };
      setValues(newValues); 
    }
  }

  const resetForm = () => {
    if (expenditureModal) {
      setExpValues({ item: "", unit_price: "", quantity: "", authorized_by: "", purchased_by: "", date: "" });
    } else {
      setValues({ category: "", service_type: "", amount: "", created_by: "", date: "" });
      toggleIncome();
    }
  }

  useEffect(() => {
    const offset=1;
    const limit=10;
    dispatch(fetchIncome(offset, limit));
    dispatch(fetchIncomeCategory());
    dispatch(fetchExpenditure(offset, limit));
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

  const handleExpNextPage = (next_page) => {
    const offset=next_page;
    const limit=10;
    dispatch(fetchExpenditure(offset, limit));
  }

  useEffect(() => {
    if (create_success) {
      setValues({ category: "", service_type: "", amount: "", created_by: "", date: "" });
    }
  }, [ create_success ]);

  let exp_pagination = [];
  for (let i = 1; i <= expenditures.totalPages; i++) {
    exp_pagination.push(i);
  }

  const handleExpSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    if (search_term.length > 0) {
      dispatch(search_expenditure(search_term));
    }
  }, [ dispatch, search_term ]);

  useEffect(() => {
    if (expenditure_create_success) {
      setExpenditureModal(false);
    }
  }, [ expenditure_create_success ]);

  const handleFilterChange = (e) => {
    const { value } = e.target;

    setFilterDate(value)
  }

  useEffect(() => {
    if (filterDate.length >= 1) {
      dispatch(filter_expenditure(filterDate));
    }
  }, [ dispatch, filterDate ]);

  console.log(exp_docs, " the new exp docs")

  return (
    <div>
      {toggleView ? (
        <Row>
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Row>
              <Col xs="12" sm="12" md="12" lg="8"></Col>
              <Col xs="12" sm="12" md="12" lg="2">
                <Button className="action-btn" onClick={toggleExpenditure}>Create Expenditure</Button>
              </Col>
              <Col xs="12" sm="12" md="12" lg="2">
                <Button className="action-btn" onClick={() => setToggleView(false)}>View Income</Button>
              </Col>
            </Row>
            <Card id="income-card">
              <CardBody>
                <Row>
                  <Col xs="12" sm="12" md="12" lg="3" xl="3">
                  <h3>Expenditure Table</h3>
                  </Col>
                  <Col xs="12" sm="12" md="12" lg="6" xl="6">
                    <div className="search-container">
                      <Search onChange={handleExpSearchChange} search_term={search_term} />
                    </div>
                  </Col>
                  <Col xs="12" sm="12" md="12" lg="3" xl="3">
                    <div className="filter-container">
                      <Input type="select" id="filter-select" name="filterDate" onChange={(e) => handleFilterChange(e)}>
                        <option disabled={true}>Filter expenditure</option>
                        {filterData.map((t, i) => (
                          <option value={t.value} key={i}>{t.name}</option>
                        ))}
                      </Input>
                      <AiOutlineFilter style={{ color: "#fff", fontSize: 45 }} />
                    </div>
                  </Col>
                </Row>
                
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
                    {exp_docs && exp_docs.length > 0 ? exp_docs.map((e, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{e.item}</td>
                        <td>{e.unit_price}</td>
                        <td>{e.quantity}</td>
                        <td>{e.cost}</td>
                        <td>{e.authorized_by}</td>
                        <td>{e.purchased_by}</td>
                        <td>{e.time}</td>
                        <td><FaTrash onClick={() => toggleConfirmDelete("exp_delete", e?._id)} className="delete-icon" /></td>
                      </tr>
                    )) : <h1 className="text-center">No records found</h1>}
                    
                    
                  </tbody>
                </Table>
              </CardBody>
              <div className="justify-content-center">
                {expenditures && expenditures.totalPages && expenditures.totalPages > 1 ? (
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center mt-5">
                      <li className="page-item">
                        <span className="page-link" onClick={() => handleExpNextPage(prevPage)} aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </span>
                      </li>
                      {exp_pagination && exp_pagination.map((p, i) => (
                        <li key={i} onClick={() => handleExpNextPage(p && p)} className={p === page ? `page-item active` : "page-item"}><span className="page-link">{p}</span></li>
                      ))}
                      
                      <li className="page-item">
                        <span className="page-link" onClick={() => handleExpNextPage(nextPage && nextPage)} aria-label="Next">
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
      <ExpenditureModal
        item={item} 
        cost={cost} 
        unit_price={unit_price} 
        quantity={quantity} 
        authorized_by={authorized_by} 
        purchased_by={purchased_by} 
        time={time}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        modal={expenditureModal}
        toggle={toggleExpenditure}
        resetForm={resetForm}
        expenditure_create_loading
      />
    </div>
  );
}

export default Finance;