import { useEffect, useState } from "react";
import { Row, Col, Input, Card, CardBody } from "reactstrap";
import { Button } from "antd";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/actions/actions_login";
import { churchLogo } from "../../../store/actions/actions_admin";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { loginLoading, loginSuccess } = useSelector(state => state.account);
  const [ values, setValues ] = useState({  password: "" });
  const { password } = values;

  useEffect(() => {
    dispatch(churchLogo());
  }, [ dispatch ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({...values, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { password };
    dispatch(login(data));
  }

  useEffect(() => {
    if (loginSuccess) {
      window.location.href = "/dashboard";
    }
  }, [ loginSuccess ]);
  
  return (
    <div className="reset-password-container">
      <Row>
        <Col xs="12" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <Card>
            <CardBody className="pt-5 pb-5">
              <form onSubmit={handleSubmit}>
              
              <p style={{ fontSize: "24px"}}>Reset password</p>
              <label>Enter new password *</label>
              <Input onChange={(e) => handleChange(e)} placeholder="Enter  new password" type="password" name="password" value={password} />
              {/* {validationError.length > 0 ? validationError.map((error, i) => error.param === "email" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null} */}
              {loginLoading ? <Button className="login-button mt-4" loading>Loading...</Button> : <button type="submit" className="login-button mt-4">Reset password</button>}
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ResetPassword;