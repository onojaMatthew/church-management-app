import React, { useEffect } from "react";
import { Card, CardBody, Table, Spinner, Row, Col } from "reactstrap";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { churchList } from "../../../../../store/actions/actions_church";

import "./ChurchList.css";
import Paginations from "../../../../../helper/Pagination";

const ChurchList = () => {
  const dispatch = useDispatch();
  const { churches, allLoading } = useSelector(state => state.church);

  useEffect(() => {
    const offset = 1;
    const limit = 4;
    const data = { offset, limit}
    dispatch(churchList(data));
  }, [ dispatch ]);

  const onPaginate = (page_number) => {
    console.log(page_number, " the page number")
    const offset = page_number;
    const limit = 4;
    const data = { offset, limit };
    dispatch(churchList(data));
  }

  return (
    <div>
      <Card className="church-card">
        <CardBody>
          <h1>Church List</h1>  
          <Table responsive>
            <thead>
              <th>S/N</th>
              <th>Head Pastor</th>
              <th>Branch</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>View Detail</th>
            </thead>
            <tbody className="mt-4">
              {allLoading ? 
                <div className="text-center">
                  <Spinner animation="grow" color="info">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div> : 
                churches && churches.docs && churches.docs.length > 0 ? churches.docs.map((church, i) => (
                  <tr key={church && church._id}>
                    <td>{i+1}</td>
                    <td>{church && church.head_pastor}</td>
                    <td>{church && church.branch}</td>
                    <td>{church && church.email}</td>
                    <td>{church && church.phone}</td>
                    <td>{church && church.address && church.address.street}</td>
                    <td>{church && church.address && church.address.city}</td>
                    <td>{church && church.address && church.address.state}</td>
                    <td className="view-church" onClick={() => window.location.href=`/church/${church && church.subdomain_name}`}>View <EyeOutlined size="large" /></td>
                  </tr>
                )) : <h2 className="text-center mt-5">No records found</h2>}
            </tbody>
          </Table>
          <Row>
            <Col xs="12" sm="12" md="12" lg="4" xl="4">
              {churches && churches.totalPages && churches.totalPages > 1 ? (
                <Paginations 
                  churches={churches && churches}
                  onPaginate={onPaginate}
                />
              ) : null}
              
            </Col>
          </Row>
        </CardBody>  
      </Card>
    </div>
  )
}

export default ChurchList;