import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Edit from "../Edit/Edit";
import Register from '../Register/Register'
import Remove from "../Remove/Remove";
import "./AdminDashboard.css";

function AdminDashboard({match}) {
  console.log(match)
  return (
    <BrowserRouter>
      <div id="page-top">
        <div id="wrapper">
          <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div className="container-fluid d-flex flex-column p-0">
              <div className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0">
                <div className="sidebar-brand-icon rotate-n-15"></div>
                <div className="sidebar-brand-text mx-3">
                  <span>Brand</span>
                </div>
              </div>

              <hr className="sidebar-divider my-0" />
              <ul className="navbar-nav text-light" id="accordionSidebar">
                <li className="nav-item">
                  <div className="nav-link">
                    <span>
                      <Link
                        to={`${match.url}/register`}
                        style={{
                          textDecoration: "None",
                          color: "inherit",
                          fontSize: 20,
                        }}
                      >
                        Register
                      </Link>
                    </span>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link
                      to={`${match.url}/edit/:email`}
                      style={{
                        textDecoration: "None",
                        color: "inherit",
                        fontSize: 20,
                      }}
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="nav-link">
                    <Link
                      to={`${match.url}/remove/`}
                      style={{
                        textDecoration: "None",
                        color: "inherit",
                        fontSize: 20,
                      }}
                    >
                      Remove
                    </Link>
                  </div>
                </li>
                <li className="nav-item"></li>
                <li className="nav-item">
                  <div className="nav-link">
                    <Link
                      to=""
                      style={{
                        textDecoration: "None",
                        color: "inherit",
                        fontSize: 20,
                      }}
                    >
                      Logout
                    </Link>
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
            <Route path={`${match.url}/register`} exact>
              <Register />
            </Route>
            <Route path={`${match.url}/edit/:email`} exact>
              <Edit />
            </Route>
            <Route path={`${match.url}/remove/`} exact>
              <Remove />
            </Route>
            
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AdminDashboard;


// Dashboard component for readability
function Dashboard() {
  const [teacherCount, setTeacherCount] = useState("");
  const [studentCount, setStudentCount] = useState("");

  useEffect(() => {
    fetch("http://localhost:9000/admin/dashboard/count")
      .then((response) => response.json())
      .then((data) => {
        setStudentCount(data.countStudent);
        setTeacherCount(data.countTeacher);
      });
  }, []);
  // console.log(teacherCount, studentCount)
  return (
    <div className="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex justify-content-between align-items-center mb-4">
            <h3 className="text-dark my-5">Dashboard</h3>
          </div>
          <div className="row">
            <div className="col-md-6 col-xl-3 mb-4">
              <div className="card shadow border-start-primary py-2">
                <div className="card-body">
                  <div className="row align-items-center no-gutters">
                    <div className="col me-2">
                      <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                        <span>Teachers</span>
                      </div>
                      <div className="text-dark fw-bold h5 mb-0">
                        <span>{teacherCount}</span>
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
                        <span>Students</span>
                      </div>
                      <div className="text-dark fw-bold h5 mb-0">
                        <span>{studentCount}</span>
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
