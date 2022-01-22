import React, { useState } from "react";
import { Dropdown, Form} from "react-bootstrap";
import "./Register.css";

function Register() {

  const [choice, setChoice] = useState("")

  return (
    <section
      className="login-clean"
      style={{ minHeight: "610px", width: "100%" }}
    >
      <div className="mb-3">
      <label style={{ color: "black" }}>Select a role to register:</label>
          <Dropdown onSelect={(eventKey, e) => setChoice(eventKey)}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {choice ? choice : "Select a choice"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="teacher">Teacher</Dropdown.Item>
              <Dropdown.Item eventKey="student">Student</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </div>
      {choice === 'teacher' ? <RegisterTeacher /> : <RegisterStudent />}
      
    </section>
  );
}

function RegisterTeacher() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [qual, setQual] = useState("");

  const handleSubmit = () => {
    fetch(`https://attendence-portal.herokuapp.com/teacher/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password, name, gender, qualification: qual, role: "teacher" }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message)
          }
        }
      )
      .catch((error) => {
        alert("Something went wrong");
        
      });
  };
  return (
    <section
      className="login-clean"
      style={{ minHeight: "610px", width: "100%" }}
    >
      <h1 style={{color:"black"}}>Enter Teacher's Details.</h1>
      <form>
        <h2 className="visually-hidden">Reset your password</h2>
        <div className="illustration">
          <i className="icon ion-ios-navigate"></i>
        </div>
        <div className="mb-3">
          <label style={{ float: "left" }}>Name:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label style={{ float: "left" }}>email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label style={{ float: "left" }}>Password:</label>{" "}
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label style={{ float: "left" }}>Gender:</label>
          <Form.Check
            inline
            label="Male"
            name="group1"
            type="radio"
            value="Male"
            onChange={(e) => setGender(e.target.value)}
          />
          <Form.Check
            inline
            label="Female"
            name="group1"
            type="radio"
            value="Female"
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label style={{ float: "left" }}>Qualification:</label>
          <Dropdown onSelect={(eventKey, e) => setQual(eventKey)}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {qual ? qual : "Select a choice"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="B.ed">D.ed</Dropdown.Item>
              <Dropdown.Item eventKey="M.ed">M.ed</Dropdown.Item>
              <Dropdown.Item eventKey="Other teaching certification">
                Other teaching certification
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="mb-3">
          <button
            className="btn btn-primary d-block w-100"
            type="button"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
}



// registration form for student registration.
function RegisterStudent() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState('');
  const [roll, setRoll] = useState('');

  const handleSubmit = () => {
    fetch(`https://attendence-portal.herokuapp.com/student/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password, name, gender, role: "student", department, roll }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message)
          }
        }
      )
      .catch((error) => {
        alert("Something went wrong");
        
      });
  };
  return (
    <section
      className="login-clean"
      style={{ minHeight: "610px", width: "100%" }}
    >
      <h1 style={{color:"black"}}>Enter Student's Details.</h1>
      <form>
        <h2 className="visually-hidden">Reset your password</h2>
        <div className="illustration">
          <i className="icon ion-ios-navigate"></i>
        </div>
        <div className="mb-3">
          <label style={{ float: "left" }}>Name:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label style={{ float: "left" }}>email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label style={{ float: "left" }}>Password:</label>{" "}
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label style={{ float: "left" }}>department:</label>
          <input
            className="form-control"
            type="text"
            name="dept"
            placeholder="Enter Department name"
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label style={{ float: "left" }}>roll:</label>
          <input
            className="form-control"
            type="text"
            name="roll"
            placeholder="Enter Studennt roll number"
            onChange={(e) => setRoll(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label style={{ float: "left" }}>Gender:</label>
          <Form.Check
            inline
            label="Male"
            name="group1"
            type="radio"
            value="Male"
            onChange={(e) => setGender(e.target.value)}
          />
          <Form.Check
            inline
            label="Female"
            name="group1"
            type="radio"
            value="Female"
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        

        <div className="mb-3">
          <button
            className="btn btn-primary d-block w-100"
            type="button"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
}

export default Register;
