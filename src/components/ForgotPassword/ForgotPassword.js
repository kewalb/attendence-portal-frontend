import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [choice, setChoice] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`http://localhost:9000/${choice}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
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
  }

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
              <Dropdown.Item href="#/action-1" eventKey="admin">
                --------
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2" eventKey="teacher">
                Teacher
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3" eventKey="student">
                Student
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="mb-3">
            <button className="btn btn-primary d-block w-100" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <a className="forgot" href="#">
            Already have an account? Login.
          </a>
        </form>
      </section>
    </div>
  );
}

export default ForgotPassword;
