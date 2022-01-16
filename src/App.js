import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/Homepage/HomePage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ForgotPasswordForm from "./components/ForgotPasswordForm/ForgotPasswordForm";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password-form/:choice/:token">
            <ForgotPasswordForm />
          </Route>
          <Route path="/admin-dashboard" component={AdminDashboard}>
            {/* <AdminDashboard /> */}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
