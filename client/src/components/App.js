import { BrowserRouter, Route } from "react-router-dom";
import Auth from "../helper/Auth";
import Home from "./Admin/Dashboard/Home/Home";
import Login from "./Admin/Login/Login";
import ChurchHomePage from "./Church/Home/Home";
import ChurchLogin from "./Church/Login/Login";
import CoordinatorHome from "./Coordinator/Dashboard/Home/Home";

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
        <PrivateRoute path="/church/:subdomain" render={(props) => <ChurchHomePage {...props} />} />
        {/* <Route path="/*" render={() => 
          <div>
            <h3 className="text-center">Page Not Found!</h3>
          </div>} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
