import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/Homepage/HomePage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ForgotPasswordForm from "./components/ForgotPasswordForm/ForgotPasswordForm";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard";

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
          <ProtectedRoute path="/admin-dashboard" component={AdminDashboard}>
            {/* <AdminDashboard /> */}
          </ProtectedRoute>
          <ProtectedRoute path="/teacher-dashboard" component={TeacherDashboard}>
            {/* <AdminDashboard /> */}
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
