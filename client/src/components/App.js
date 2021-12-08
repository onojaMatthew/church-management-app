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
        <PrivateRoute path="/coordinator" render={(props) => <CoordinatorHome {...props} />} />
        <Route path="/church-login" render={(props) => <ChurchLogin {...props} />} />
        <PrivateRoute path="/regional_pastor" render={(props) => <RegionalPastor {...props} />} />
        <Route path="/coordinator-login" render={(props) => <CoordinatorLogin {...props} />} />
        <PrivateRoute path="/church/:subdomain" render={(props) => <ChurchHomePage {...props} />} />
        <Route path="/regional_pastor_login" render={(props) => <RegionalPastorLogin {...props} />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
