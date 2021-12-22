import { useEffect, useState } from "react";
import { Row, Col, Input, Card, CardBody } from "reactstrap";
import { Button } from "antd";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../store/actions/actions_login";
import { churchLogo } from "../../../store/actions/actions_admin";
import CheckMark from "../../../assets/images/checkmark.png"
import { useHistory } from "react-router";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { loading, success, validation_error } = useSelector(state => state.account);
  const [ values, setValues ] = useState({  password: "" });
  const { password } = values;
  const [ token, setToken ] = useState("");
  const [ validationError, setValidationError ] = useState([]);
  const [ done, setDone ] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(churchLogo());
  }, [ dispatch ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({...values, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { password, token };
    dispatch(resetPassword(data));
  }

  useEffect(() => {
    const tken = window.location.pathname.slice(16)
    setToken(tken)
  }, [])

  useEffect(() => {
    if (success) {
      setDone(true)
    }
  }, [ success ]);

  useEffect(() => {
    if (validation_error?.length > 0) setValidationError(validation_error);
  }, [ validation_error])
  
  return (
    <div className="reset-password-container">
      {done ? (
        <div>
          <p className="text-center"><img src={CheckMark} alt="" /></p>
          <p className="text-center" style={{
            color: "#ffffff",
            fontSize: "18px"
          }}>Your password was reset successfully. Click <span style={{
            cursor: "pointer",
          }} onClick={() => history.push("/")}>here</span> to login</p>
        </div>
      ) : (
        <Row>
          <Col xs="12" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
            <Card>
              <CardBody className="pt-5 pb-5">
                <form onSubmit={handleSubmit}>
                
                <p style={{ fontSize: "24px"}}>Reset password</p>
                <label>Enter new password *</label>
                <Input onChange={(e) => handleChange(e)} placeholder="Enter  new password" type="password" name="password" value={password} />
                {validationError.length > 0 ? validationError.map((error, i) => error.param === "password" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                {loading ? <Button className="login-button mt-4" loading>Loading...</Button> : <button type="submit" className="login-button mt-4">Reset password</button>}
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ResetPassword;