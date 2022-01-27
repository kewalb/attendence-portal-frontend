import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Attendence from "./Attendence/Attendence";
import Profile from "./Profile/Profile";
// import Register from "../Register/Register";
// import Attendence from "./Attendence/Attendence";
// import Profile from "./Profile/Profile";

function StudentDashboard({ match }) {
  console.log(match);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    history.push("/");
  };

  return (
    <BrowserRouter>
      <div id="page-top">
        <div id="wrapper">
          <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div className="container-fluid d-flex flex-column p-0">
              <div className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0">
                <div className="sidebar-brand-icon rotate-n-15"></div>
                <div className="sidebar-brand-text mx-3">
                  <span>Welcome</span>
                </div>
              </div>

              <hr className="sidebar-divider my-0" />
              <ul className="navbar-nav text-light" id="accordionSidebar">
                <li className="nav-item">
                  <div className="nav-link">
                    <span>
                      <Link
                        to={`${match.url}/`}
                        style={{
                          textDecoration: "None",
                          color: "inherit",
                          fontSize: 20,
                        }}
                      >
                        Dashboard
                      </Link>
                    </span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link
                      to={`${match.url}/profile/`}
                      style={{
                        textDecoration: "None",
                        color: "inherit",
                        fontSize: 20,
                      }}
                    >
                      Profile
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                <div className="nav-link">
                    <Link
                      to={`${match.url}/attendence/`}
                      style={{
                        textDecoration: "None",
                        color: "inherit",
                        fontSize: 20,
                      }}
                    >
                      Attendence
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <div
                      onClick={logout}
                      style={{
                        textDecoration: "None",
                        color: "inherit",
                        fontSize: 20,
                        cursor: "pointer",
                      }}
                    >
                      Logout
                    </div>
                  </div>
                </li>
                <li className="nav-item"></li>
              </ul>

              <div className="text-center d-none d-md-inline"></div>
            </div>
          </nav>
          <Switch>
            <Route path={`${match.url}/`} exact>
              <Dashboard />
            </Route>
            <Route path={`${match.url}/profile`} exact>
              <Profile />
            </Route>
            <Route path={`${match.url}/attendence`} exact>
              <Attendence />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default StudentDashboard;

// Dashboard component for readability
function Dashboard() {
  
  const [daysAttended, setDaysAttended] = useState("");
  const [totdays, setTotDays] = useState("");
  const [leave, setLeave] = useState('')
  const email = localStorage.getItem("email");
  console.log(process.env.NODE_ENV)

  useEffect(() => {
    fetch(`https://attendence-portal.herokuapp.com/student/dashboard/attendence-detail/${email}`)
      .then((response) => response.json())
      .then((data) => {
          console.log(data)
          setTotDays(data.totalDays)
          setLeave(data.leave)
          setDaysAttended(data.daysAttended)
            // setAttendence(data)
      })
  });
    

  return (
    <div className="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex justify-content-between align-items-center mb-4">
            <h3 className="text-dark my-5">Dashboard</h3>
            <p className="my-5 text-dark">Welcome {email}</p>
          </div>
          <div className="row">
            <div className="col-md-6 col-xl-3 mb-4">
              <div className="card shadow border-start-primary py-2">
                <div className="card-body">
                  <div className="row align-items-center no-gutters">
                    <div className="col me-2">
                      <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                        <span>Total days</span>
                      </div>
                      <div className="text-dark fw-bold h5 mb-0">
                        <span>{totdays}</span>
                      </div>
                    </div>
                    <div className="col-auto"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3 mb-4">
              <div className="card shadow border-start-success py-2">
                <div className="card-body">
                  <div className="row align-items-center no-gutters">
                    <div className="col me-2">
                      <div className="text-uppercase text-success fw-bold text-xs mb-1">
                        <span style={{color: 'green'}}>Days Present</span>
                      </div>
                      <div className="text-dark fw-bold h5 mb-0">
                        <span>{daysAttended}</span>
                      </div>
                    </div>
                    <div className="col-auto"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3 mb-4">
              <div className="card shadow border-start-success py-2">
                <div className="card-body">
                  <div className="row align-items-center no-gutters">
                    <div className="col me-2">
                      <div className="text-uppercase text-success fw-bold text-xs mb-1">
                        <span style={{color: 'grey'}}>Leave taken</span>
                      </div>
                      <div className="text-dark fw-bold h5 mb-0">
                        <span>{leave}</span>
                      </div>
                    </div>
                    <div className="col-auto"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3 mb-4">
              <div className="card shadow border-start-success py-2">
                <div className="card-body">
                  <div className="row align-items-center no-gutters">
                    <div className="col me-2">
                      <div className="text-uppercase text-success fw-bold text-xs mb-1">
                        <span style={{color: 'red'}}>Days absent</span>
                      </div>
                      <div className="text-dark fw-bold h5 mb-0">
                        <span>{totdays - (leave+daysAttended)}</span>
                      </div>
                    </div>
                    <div className="col-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
