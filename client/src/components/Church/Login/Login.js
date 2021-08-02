import { useEffect, useState } from "react";
import { Row, Col, Input, Card, CardBody, Spinner } from "reactstrap";
import { Avatar, Button, Image } from "antd";
import User from "../../../assets/images/User.jpeg";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { churchLogin } from "../../../store/actions/actions_church";
import { localAuth } from "../../../helper/authenticate";

const ChurchLogin = () => {
  const dispatch = useDispatch();
  const { loginLoading, loginSuccess } = useSelector(state => state.account);
  const [ values, setValues ] = useState({ email: "", password: "" });
  const [ mobile, setMobile ] = useState(false);

  const church = localAuth() && localAuth().user;

  const { email, password } = values;
  useEffect(() => {
    if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      setMobile(true)
     }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({...values, [name]: value });
  }

  const handleSubmit = () => {
    const data = { email, password };
    dispatch(churchLogin(data));
  }

  useEffect(() => {
    if (loginSuccess) {
      const subdomain = church && church.subdomain_name;
      window.location.href = `/church/${subdomain}`;
    }
  }, [ loginSuccess ])
  
  const imageSize = mobile === true ? 90 : 150;
  
  return (
    <div className="login-container">
      <Row>
        <Col xs="12" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <Card>
            <CardBody className="pt-5 pb-5">
              <p className="text-center mb-5">
                <Avatar src={<Image src={User} />} size={imageSize} />
              </p>
              <p className="text-center mb-5">Sign in by entering the information below</p>
              <label>Email *</label>
              <Input onChange={(e) => handleChange(e)} placeholder="Enter email" type="email" name="email" value={email} />
              <label>Password *</label>
              <Input onChange={(e) => handleChange(e)} placeholder="Enter password" type="password" name="password" value={password} />
              <p className="mb-4 forgot-p-text">Forgot password</p>
              <Button onClick={handleSubmit} className="login-button">{loginLoading ? (
                <div><Spinner /> Processing... </div>
              ) : "Login"}</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ChurchLogin;