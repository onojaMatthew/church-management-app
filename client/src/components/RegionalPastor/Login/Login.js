import { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Avatar, Button, Image, message } from "antd";
import User from "../../../assets/images/User.jpeg";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { regionalPastorLogin } from "../../../store/actions/actions_regional_pastor";

const Regional_pastor_login = () => {
  const dispatch = useDispatch();
  const { login_loading, login_success, error } = useSelector(state => state.coordinatorReducer);
  const [ values, setValues ] = useState({ email: "", password: "" });
  const [ mobile, setMobile ] = useState(false);

  const { email, password } = values;
  useEffect(() => {
    if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      setMobile(true);
     }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({...values, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e, " the event")
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
  
  const imageSize = mobile === true ? 90 : 150;
  
  return (
    <div className="login-container">
      <Row>
        <Col xs="12" sm="12" md={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
          <Card>
            <CardBody className="pt-5 pb-5">
              <form onSubmit={handleSubmit}>
                <p className="text-center mb-5">
                  <Avatar src={<Image src={User} />} size={imageSize} />
                </p>
                <p className="text-center mb-5">Sign in by entering the information below</p>
                <label>Email *</label>
                <input onChange={(e) => handleChange(e)} className="form-control" placeholder="Enter email" type="email" name="email" value={email} />
                <label>Password *</label>
                <input onChange={(e) => handleChange(e)} className="form-control" placeholder="Enter password" type="password" name="password" value={password} />
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