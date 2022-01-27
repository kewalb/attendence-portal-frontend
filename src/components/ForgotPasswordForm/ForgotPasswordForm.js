import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ForgotPasswordForm() {

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('')
    const {token, choice} = useParams()

 
    const handleSubmit = () => {
        if(password !== passwordConfirm){
            setMessage("password did not match")
        }
        fetch(`https://attendence-portal.herokuapp.com/${choice}/new-password`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setMessage(data.message);
            setTimeout(() => setMessage(""), 4000);
          }
        })
        .catch((error) => {
          setMessage("Something went wrong");
          setTimeout(() => setMessage(""), 4000);
        });
    }

  return (
    <section className="login-clean" style={{ minHeight: "610px" }}>
        {message ? (
        <div
          className={
            message === "password update success"
              ? "alert alert-success"
              : "alert alert-danger"
          }
        >
          <span>{message}</span>
        </div>
      ) : (
        ""
      )}
      <form method="post">
        <h2 className="visually-hidden">Reset your password</h2>
        <div className="illustration">
          <i className="icon ion-ios-navigate"></i>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            name="new-password"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            name="new-password-confirm"
            placeholder="Confirm new password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary d-block w-100" onClick={handleSubmit}>
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

export default ForgotPasswordForm;
