import { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Spinner } from "reactstrap";
import { Avatar, Button, Image, message } from "antd";
import User from "../../../assets/images/User.jpeg";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { regionalPastorLogin } from "../../../store/actions/actions_regional_pastor";
import { churchLogo } from "../../../store/actions/actions_admin";

const Regional_pastor_login = () => {
  const dispatch = useDispatch();
  const { login_loading, login_success, validation_error, error } = useSelector(state => state.regionalPastorReducer);
  const { logo: { church_logo}, logo_loading } = useSelector(state => state.adminReducer);
  const [ values, setValues ] = useState({ email: "", password: "" });
  const [ mobile, setMobile ] = useState(false);
  const [ validationError, setValidationError ] = useState([]);

  const { email, password } = values;
  useEffect(() => {
    if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      setMobile(true);
     }
  }, []);

  const handleChange = (e) => {
    setValidationError([]);
    const { name, value } = e.target;

    setValues({...values, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    dispatch(regionalPastorLogin(data));
  }

  useEffect(() => {
    if (login_success) {
      window.location.href = "/regional_pastor";
    }
  }, [ login_success ]);

  useEffect(() => {
    if (error && error.length > 0) {
      message.error(error)
    }
  }, [ error ]);

  useEffect(() => {
    dispatch(churchLogo())
  }, [ dispatch ]);

  useEffect(() => {
    if (validation_error?.length > 0) {
      setValidationError(validation_error);
    }
  }, [ validation_error ]);
  
  const imageSize = mobile === true ? 90 : 150;
  
  return (
    <div className="login-container">
      <Row>
        <Col xs="12" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <Card>
            <CardBody className="pt-5 pb-5">
              <form onSubmit={handleSubmit}>
                <p className="text-center mb-5">
                  {logo_loading ? 
                    <Spinner>
                      <span className="visually-hidden"></span>
                    </Spinner> : <Avatar src={<Image src={church_logo && church_logo} />} size={imageSize} />
                  }
                </p>
                <p className="text-center mb-5">Sign in by entering the information below</p>
                <label>Email *</label>
                <input onChange={(e) => handleChange(e)} className="form-control" placeholder="Enter email" type="email" name="email" value={email} />
                {validationError.length > 0 ? validationError.map((error, i) => error.param === "email" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                <label>Password *</label>
                <input onChange={(e) => handleChange(e)} className="form-control" placeholder="Enter password" type="password" name="password" value={password} />
                {validationError.length > 0 ? validationError.map((error, i) => error.param === "password" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null}
                <p className="mb-4 forgot-p-text">Forgot password</p>
                {login_loading ? <Button className="login-button" loading>Loading...</Button> : <button type="submit" className="login-button">Login</button>}
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Regional_pastor_login;