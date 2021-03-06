import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Homepage.css";

function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [choice, setChoice] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    fetch(`https://attendence-portal.herokuapp.com/${choice}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
          if (data.message === "Login Success") {
            localStorage.setItem("token", data.jwtToken);
            localStorage.setItem("user", data.name);
            localStorage.setItem("email", data.email);
            if (choice === "admin") {
              history.push("/admin-dashboard");
            }
            if (choice === "teacher") {
              history.push("/teacher-dashboard");
            }
            if (choice === "student") {
              history.push("/student-dashboard");
            }
          }
        }
      })
      .catch((error) => {
        setMessage("Something went wrong");
        console.log(error);
        // setTimeout(() => setMessage(""), 4000);
      });
  };

  const handleGuest = () => {
    const email = process.env.REACT_APP_EMAIL;
    const password = process.env.REACT_APP_PASSWORD;
    if (!choice) {
      alert("please select a choice");
      return
    }
    fetch(`https://attendence-portal.herokuapp.com/${choice}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
          if (data.message === "Login Success") {
            localStorage.setItem("token", data.jwtToken);
            localStorage.setItem("user", data.name);
            localStorage.setItem("email", data.email);
            if (choice === "admin") {
              history.push("/admin-dashboard");
            }
            if (choice === "teacher") {
              history.push("/teacher-dashboard");
            }
            if (choice === "student") {
              history.push("/student-dashboard");
            }
          }
        }
      })
      .catch((error) => {
        setMessage("Something went wrong");
        console.log(error);
        // setTimeout(() => setMessage(""), 4000);
      });
  };

  return (
    <section className="register-photo">
      <h1 className="text-dark mb-2">WELCOME TO ATTENDANCE PORTAL.</h1>
      {message ? (
        <div
          className={
            message === "Login Success"
              ? "alert alert-success"
              : "alert alert-danger"
          }
        >
          <span>{message}</span>
        </div>
      ) : (
        ""
      )}
      <div className="form-container">
        <div className="image-holder"></div>
        <form>
          <h2 className="text-center">
            <strong>Login.</strong>
          </h2>
          <div className="mb-3">
            <input
              required
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleEmailChange}
              autoComplete="username"
            />
          </div>
          <div className="mb-3">
            <input
              required
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
          </div>
          {/* <div className="btn btn-outline-dark dropdown-toggle link-secondary">
              <select className='dropdown-menu'>
                  <option className="dropdown-item" value="Admin">--------</option>
                  <option className="dropdown-item" value="Student">Student</option>
                  <option className="dropdown-item" value="Teacher">Teacher</option>
              </select>
          </div> */}
          <Dropdown onSelect={(eventKey, e) => setChoice(eventKey)}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {choice
                ? choice === "Admin"
                  ? "--------"
                  : choice
                : "Select a choice"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="admin">--------</Dropdown.Item>
              <Dropdown.Item eventKey="teacher">Teacher</Dropdown.Item>
              <Dropdown.Item eventKey="student">Student</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="mb-3"></div>
          <div className="mb-3"></div>
          <div className="mb-3">
            <button
              className="btn btn-primary d-block w-100"
              type="button"
              onClick={handleSubmit}
            >
              Login
            </button>
            <button
              className="btn btn-primary d-block w-100"
              type="button"
              onClick={handleGuest}
            >
              Guest
            </button>
          </div>

          <p
            className="d-xl-flex justify-content-xl-center"
            style={{ fontSize: "small" }}
          >
            Don't have an account? Ask your admin.
          </p>
          <p
            className="d-xl-flex justify-content-xl-center"
            style={{ fontSize: "small" }}
          >
            Forgot Password?{" "}
            <span
              style={{ color: "cadetblue", cursor: "pointer" }}
              onClick={() => history.push("/forgot-password")}
            >
              Click Here
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}

export default HomePage;
