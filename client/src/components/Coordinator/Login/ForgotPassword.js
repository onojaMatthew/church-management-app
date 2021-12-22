import { useEffect, useState } from "react";
import { Row, Col, Input, Card, CardBody } from "reactstrap";
import { Button } from "antd";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { churchLogo } from "../../../store/actions/actions_admin";
import Envelope from "../../../assets/images/evelope.svg";
import { zonalForgotPassword } from "../../../store/actions/actions_zonal_pastor";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, success, validation_error } = useSelector(state => state.coordinatorReducer);
  const [ values, setValues ] = useState({ email: "" });
  const [ validationError, setValidationError ] = useState([]);
  const [ done, setDone ] = useState(false);

  const { email } = values;
  
  useEffect(() => {
    dispatch(churchLogo())
  }, [ dispatch ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({...values, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email };
    dispatch(zonalForgotPassword(data));
  }

  useEffect(() => {
    if (success) {
      setDone(true);
    }
  }, [ success ]);

  useEffect(() => {
    if (validation_error?.length > 0) {
      setValidationError(validation_error);
    }
  }, [ validation_error ]);
  
  return (
    <div className="forgot-password-container">
      {done ? (
        <div>
          <p className="text-center"><img src={Envelope} alt="" /></p>
          <p className="text-center" style={{
            color: "#ffffff",
            fontSize: "18px"
          }}>A password reset email was sent to {email}. Please check your email to proceed.</p>
          <p style={{
            color: "#ffffff",
            fontSize: "18px"
          }} className="mt-2 text-center">Did not receive email? Click <span style={{
            color: "#0dcaf0;",
            cursor: "pointer"
          }} onClick={handleSubmit}>here</span> to resend email</p>
        </div>
      ) : (
        <Row>
          <Col xs="12" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
            <Card>
              <CardBody className="pt-5 pb-5">
                <form onSubmit={handleSubmit}>
                  <p style={{ fontSize: "24px"}}>Forgot password</p>
                  <label>Email *</label>
                  <Input onChange={(e) => handleChange(e)} placeholder="Enter  email" type="email" name="email" value={email} />
                  {validationError.length > 0 ? validationError.map((error, i) => error.param === "email" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                  
                  {loading ? <Button className="login-button mt-4" loading>Loading...</Button> : <button type="submit" className="login-button mt-4">Send</button>}
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ForgotPassword;