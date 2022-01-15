import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [choice, setChoice] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`http://localhost:9000/${choice}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, choice }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
          setTimeout(() => setMessage(""), 4000);
        }
        console.log(data);
      })
      .catch((error) => {
        setMessage("Something went wrong");
        setTimeout(() => setMessage(""), 4000);
      });
  };

  //   console.log(email, choice)

  return (
    <div style={{ height: "auto" }}>
      <section className="login-clean" style={{ minHeight: "610px" }}>
        {message ? (
          <div
            className={
              message === "Email Sent"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            <span>{message}</span>
          </div>
        ) : (
          ""
        )}
        <form>
          <h2 className="visually-hidden">Please enter your email</h2>
          <div className="illustration">
            <i className="icon ion-ios-navigate"></i>
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </div>
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
          <div className="mb-3">
            <button
              className="btn btn-primary d-block w-100"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="forgot">
            Already have an account?{" "}
            <span
              onClick={() => history.push("/")}
              style={{ cursor: "pointer", color: "cadetblue" }}
            >
              Login.
            </span>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ForgotPassword;
