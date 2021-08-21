import React, { useEffect } from "react";
import { Card, CardBody, Table, Spinner } from "reactstrap";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { churchList } from "../../../../../store/actions/actions_church";

import "./ChurchList.css";

const ChurchList = (props) => {
  const dispatch = useDispatch();
  const { churches, allLoading } = useSelector(state => state.church);

  useEffect(() => {
    dispatch(churchList());
  }, [ dispatch ]);

  return (
    <div>
      <Card className="church-card">
        <CardBody>
          <h1>Church List</h1>  
          <Table responsive>
            <thead>
              <th>S/N</th>
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
        </CardBody>  
      </Card>
    </div>
  )
}

export default ChurchList;