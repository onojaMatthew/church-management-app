import { useHistory } from "react-router-dom";
import { Card, CardBody, Spinner, Table } from "reactstrap";
import { FaArrowLeft, FaTrash } from "react-icons/fa"
import Search from "../../../SearchComponent/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Burial.css";
import { Button, Image } from "antd";
import { NewBurial } from "./NewBurial";
import { burialList, createBurial, deleteBurial, searchBurial } from "../../../../store/actions/actions_burial";
import Avatar from "antd/lib/avatar/avatar";

const Burial = () => {
  const dispatch = useDispatch();
  const { burials, get_loading, docs, error, search_success, create_success, create_loading, delete_loading } = useSelector(state => state.burial);

  const [ search_term, setSearchTerm ] = useState("");
  const [ modal, setModal ] = useState(false);
  const [ burialData, setBurialData ] = useState({
    first_name: "", 
    last_name: "", 
    officiating_pastor: "", 
    death_date: "", 
    sex: "", 
    age: "", 
    burial_date: "", 
    position: "", 
    burial_venue: "",
  });

  const [ image_url, setImageUrl ] = useState({});

  const history = useHistory();
  // const church = localAuth().church && localAuth().church._id;

  const {
    first_name, 
    last_name, 
    officiating_pastor, 
    death_date, 
    sex, 
    age, 
    burial_date, 
    position, 
    burial_venue, 
  } = burialData

  const onDataChange = (e) => {
    const { name, value } = e.target;
    const newBurialData = {...burialData, [name]: value };
    
    setBurialData(newBurialData);
  }

  const { nextPage, page, prevPage, totalPages } = burials && burials;

  const onHandleChange = (e) => {
    const { value } = e.target;
    console.log("the search value")
    setSearchTerm(value);
  }

  const handleSearch = () => {
    dispatch(searchBurial(search_term))
  }

  const toggle = () => {
    setModal(!modal);
  }

  useEffect(() => {
    if (error && error === "Invalid token") {
      history.push("/church-login")
    }
  }, [ error ]);

  useEffect(() => {
    if (search_term.length > 0) {
      handleSearch();
    }
  }, [ search_term ]);

  useEffect(() => {
    const offset=1;
    const limit=10;
    dispatch(burialList(offset, limit))
  }, [ dispatch]);

  let paginateArr = [];
  for (let i = 1; i <= totalPages; i++) {
    paginateArr.push(i);
  }

  const handleNextPage = (next_page) => {
    const offset=next_page;
    const limit=10;
    dispatch(burialList(offset, limit));
  }

  const handleSubmit = () => {
    const data = {
      first_name, 
      last_name, 
      officiating_pastor, 
      death_date, 
      sex, 
      age, 
      burial_date, 
      position, 
      burial_venue,
      image_url,
    };

    dispatch(createBurial(data));
  }

  const onDelete = (id) => {
    dispatch(deleteBurial(id));
  }

  useEffect(() => {
    if (create_success) {
      setBurialData({
        first_name: "", 
        last_name: "", 
        officiating_pastor: "", 
        death_date: "", 
        sex: "", 
        age: "", 
        burial_date: "", 
        position: "", 
        burial_venue: "",
      });
      toggle();
    }
  }, [ create_success ]);

  const handlePhoto = (e) => {
    setImageUrl(e.target.files[0]);
  }

  return (
    <div>
      {get_loading ? (
        <div className="text-center spin">
          <Spinner className="my-loader">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Card id="birthday-card">
          <FaArrowLeft onClick={() => history.goBack()} size={30} color="#1890ff" />
        <div>
          <Button onClick={toggle} className="new-event-button">New Death Record</Button>
        </div>
        <CardBody>
          <div className="search-wrapper">
            <h1>Death Records</h1>
            <Search 
              search_term={search_term}
              onChange={onHandleChange}
            />
          </div>
          {search_success ? (
            <Table responsive>
              <thead>
                <th className="head">S/N</th>
                <th className="head">First Name</th>
                <th className="head">Last Name</th>
                <th className="head">Death Date</th>
                <th className="head">Age</th>
                <th className="head">Burial Date</th>
                <th className="head">Burial Venue</th>
                <th className="head">Sex</th>
                <th className="head">Position</th>
                <th className="head">Photo</th>
                <th className="head">Delete</th>
              </thead>
              <tbody>
                {burials && burials.length > 0 ? burials.map((b, i) => {
                  let date = new Date(b?.death_date);
                  let b_date = new Date(b?.burial_date)
                  return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{b?.first_name}</td>
                    <td>{b?.last_name}</td>
                    <td>{date && date.toLocaleDateString()}</td>
                    <td>{b?.age}</td>
                    <td>{b_date && b_date.toLocaleDateString()}</td>
                    <td>{b?.burial_venue}</td>
                    <td>{b?.sex}</td>
                    <td>{b?.position}</td>
                    <td><Avatar src={<Image src={b?.image_url} />} /></td>
                    <td onClick={() => onDelete(b?._id)}>{delete_loading ?  (
                      <Spinner>
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : <FaTrash color="#ff0000" />}</td>
                  </tr>
                  )}) : <h2 className="text-center mt-5">No results found</h2>}
              </tbody>
            </Table>
          ) : (
            <Table responsive>
              <thead>
                <th className="head">S/N</th>
                <th className="head">First Name</th>
                <th className="head">Last Name</th>
                <th className="head">Death Date</th>
                <th className="head">Age</th>
                <th className="head">Burial Date</th>
                <th className="head">Burial Venue</th>
                <th className="head">Sex</th>
                <th className="head">Position</th>
                <th className="head">Photo</th>
                <th className="head">Delete</th>
              </thead>
              <tbody>
                {docs && docs.length > 0 ? docs.map((b, i) => {
                  let date = new Date(b?.death_date);
                  let b_date = new Date(b?.burial_date)
                  return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{b?.first_name}</td>
                    <td>{b?.last_name}</td>
                    <td>{date && date.toLocaleDateString()}</td>
                    <td>{b?.age}</td>
                    <td>{b_date && b_date.toLocaleDateString()}</td>
                    <td>{b?.burial_venue}</td>
                    <td>{b?.sex}</td>
                    <td>{b?.position}</td>
                    <td><Avatar src={<Image src={b?.image_url} />} /></td>
                    <td onClick={() => onDelete(b._id)}>{delete_loading ?  (
                      <Spinner>
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : <FaTrash color="#ff0000" />}</td>
                  </tr>
                  )}) : <h2 className="text-center">No records found</h2>}
              </tbody>
            </Table>
          )}
          <div className="justify-content-center">
            {burials && burials.totalPages && burials.totalPages > 1 ? (
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
        </CardBody>
        <NewBurial 
          first_name={first_name}
          last_name={last_name}
          officiating_pastor={officiating_pastor}
          death_date={death_date}
          sex={sex} 
          age={age} 
          burial_date={burial_date} 
          position={position}
          burial_venue={burial_venue}
          image_url={image_url}
          create_loading={create_loading}
          toggle={toggle}
          modal={modal}
          handlePhoto={handlePhoto}
          onHandleChange={onDataChange}
          handleSubmit={handleSubmit}
          burialData={burialData}
        />
      </Card>
      )}
    </div>
  )
}

export default Burial;