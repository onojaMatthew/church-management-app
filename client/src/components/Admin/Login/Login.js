import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Row, Col, Input, Card, CardBody, Spinner } from "reactstrap";
import { Avatar, Button, Image } from "antd";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/actions/actions_login";
import { churchLogo } from "../../../store/actions/actions_admin";

const Login = () => {
  const dispatch = useDispatch();
  const { loginLoading, loginSuccess } = useSelector(state => state.account);
  const { logo: { church_logo}, logo_loading } = useSelector(state => state.adminReducer);
  const [ values, setValues ] = useState({ email: "", password: "" });
  const [ mobile, setMobile ] = useState(false);
  const history = useHistory();

  const { email, password } = values;
  useEffect(() => {
    if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      setMobile(true)
     }
  }, []);

  useEffect(() => {
    dispatch(churchLogo())
  }, [ dispatch ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({...values, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };
    dispatch(login(data));
  }

  useEffect(() => {
    if (loginSuccess) {
      window.location.href = "/dashboard";
    }
  }, [ loginSuccess ])
  
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
              <Input onChange={(e) => handleChange(e)} placeholder="Enter email" type="email" name="email" value={email} />
              {/* {validationError.length > 0 ? validationError.map((error, i) => error.param === "email" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null} */}
              <label>Password *</label>
              <Input onChange={(e) => handleChange(e)} placeholder="Enter password" type="password" name="password" value={password} />
              {/* {validationError.length > 0 ? validationError.map((error, i) => error.param === "password" ? (<><span key={i} style={{ color: "#ff0000", fontSize: "12px"}}>{error.msg}</span> <br /></>) : null): null} */}
              <p className="mb-4 forgot-p-text" onClick={() => history.push("/forgot_password")}>Forgot password</p>
              {loginLoading ? <Button className="login-button" loading>Loading...</Button> : <button type="submit" className="login-button">Login</button>}
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Login;