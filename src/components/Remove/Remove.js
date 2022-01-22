import React, { useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Remove.css";

function Remove() {
  const [choice, setChoice] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");

  console.log(data);

  const handleSubmit = () => {
    fetch(`http://localhost:9000/admin/dashboard/${choice}-detail/${email}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.message === "No Record Found"){
          alert(data.message)
        }
        else{
          setData(data)
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:9000/admin/dashboard/remove-${choice}/${email}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message)
          setData("")
          }
        }
      )
      .catch((error) => {
        alert("Something went wrong");
        
      });
  }

  console.log(choice, email);
  return (
    <section
      className="login-clean"
      style={{ minHeight: "610px", width: "100%" }}
    >
      <form>
        <div className="mb-3">
          <label style={{ color: "black" }}>Select a role to delete:</label>
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
        {choice ? (
          <div>
            <div className="mb-3">
              <label style={{ color: "black", float: "left" }}>
                Enter email to search:
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        ) : (
          ""
        )}
      </form>
{data ? <Table bordered hover className="my-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.data.name}</td>
            <td>{data.data.role}</td>
            <td>{data.data.email}</td>
            <td><button className="btn btn-danger" onClick={handleDelete} type="button">Delete</button></td>
          </tr>
        </tbody>
      </Table> : ""}
      
    </section>
  );
}

export default Remove;
