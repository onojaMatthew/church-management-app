import { BrowserRouter, Route } from "react-router-dom";
import Auth from "../helper/Auth";
import Home from "./Admin/Dashboard/Home/Home";
import Login from "./Admin/Login/Login";
import ChurchHomePage from "./Church/Home/Home";
import ChurchLogin from "./Church/Login/Login";
import CoordinatorLogin from "./Coordinator/Login/Login";
import CoordinatorHome from "./Coordinator/Dashboard/Home/Home";
import RegionalPastorLogin from "./RegionalPastor/Login/Login";
import RegionalPastor from "./RegionalPastor/Dashboard/Home/Home";
import ForgotPassword from "./Admin/Login/ForgotPassword";
import ResetPassword from "./Admin/Login/ResetPassword";
import ChurchForgotPassword from "./Church/Login/ForgotPassword";
import ChurchResetPassword from "./Church/Login/ResetPassword";
import ZonalForgotPassword from "./Coordinator/Login/ForgotPassword";
import ZonalResetPassword from "./Coordinator/Login/ResetPassword";
import RegionForgotPassword from "./RegionalPastor/Login/ForgotPassword";
import RegionalResetPassword from "./RegionalPastor/Login/ResetPassword"

function App() {

  const PrivateRoute = ({ component, ...options }) => {
    
    const finalComponent = Auth.isUserAuthenticated() ? component : Login;
  
    return <Route {...options} component={finalComponent} />;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" render={(props) => <Login {...props} />} />
        <PrivateRoute path="/dashboard" render={(props) => <Home {...props} />} />
        <Route exact path="/forgot_password" render={(props) => <ForgotPassword {...props} />} />
        <Route exact path="/reset_password/:token" render={(props) => <ResetPassword {...props} />} />
        <Route exact path="/church_forgot_password" render={(props) => <ChurchForgotPassword {...props} />} />
        <Route exact path="/church_reset_password/:token" render={(props) => <ChurchResetPassword {...props} />} />
        <Route exact path="/zonal_reset_password/:token" render={(props) => <ZonalResetPassword {...props} />} />
        <Route exact path="/zonal_forgot_password" render={(props) => <ZonalForgotPassword {...props} />} />
        <Route exact path="/regional_forgot_password" render={(props) => <RegionForgotPassword {...props} />} />
        <Route exact path="/regional_reset_password/:token" render={(props) => <RegionalResetPassword {...props} />} />
        <PrivateRoute path="/zonal_pastor" render={(props) => <CoordinatorHome {...props} />} />
        <Route path="/church-login" render={(props) => <ChurchLogin {...props} />} />
        <PrivateRoute path="/regional_pastor" render={(props) => <RegionalPastor {...props} />} />
        <Route path="/zonal_pastor_login" render={(props) => <CoordinatorLogin {...props} />} />
        <PrivateRoute path="/church/:subdomain" render={(props) => <ChurchHomePage {...props} />} />
        <Route path="/regional_pastor_login" render={(props) => <RegionalPastorLogin {...props} />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
