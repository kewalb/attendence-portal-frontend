import React, {  useRef, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import "./Edit.css";

function Edit() {
  const [choice, setChoice] = useState("");
  // const [email, setEmail] = useState("");
  const [formData, setFormData] = useState([]);
  const [renderComponent, setRenderComponent] = useState(false);
  const inputEl = useRef(null);

  const handleSearch = () => {
    console.log("hello");
    fetch(
      `https://attendence-portal.herokuapp.com/admin/dashboard/${choice}-detail/${inputEl.current.value}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setRenderComponent(true);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    // setEmail(e.target.value)
    // console.log(inputEl.current.value);
  };

  return (
    <section
      className="login-clean"
      style={{ minHeight: "610px", width: "100%" }}
    >
      <div className="mb-3">
        <label style={{ color: "black" }}>Select a role to edit:</label>
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
        <div className="container" style={{ width: "60%" }}>
          <div className="mb-3">
            <label style={{ float: "left", color: "black" }}>Email:</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder={`Enter email of ${choice}`}
              ref={inputEl}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <button
              className="btn btn-primary d-block w-100"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {renderComponent ? (
        choice === "teacher" ? (
          <EditTeacher parameter={formData} />
        ) : (
          <EditStudent parameter={formData}/>
        )
      ) : (
        " "
      )}
    </section>
  );
}

// form to update teacher details
function EditTeacher({ parameter }) {


  const name = useRef("");
  const email = useRef("");
  const [gender, setGender] = useState("")
  const [qual, setQual] = useState("")
  const dept = useRef("");


  const handleSubmit = () => {
    fetch(
      `https://attendence-portal.herokuapp.com/admin/dashboard/update-teacher/${parameter.data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email.current.value,
          name: name.current.value,
          gender: gender,
          qualification: qual,
          role: "teacher",
          department: dept.current.value,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        }
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };

  return (
    <section
      className="login-clean"
      style={{ minHeight: "610px", width: "100%" }}
    >
      <h1 style={{ color: "black" }}>Enter Teacher's Details.</h1>
      <form>
        <div className="mb-3">
          <label style={{ float: "left" }}>Name:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Enter name"
            defaultValue={parameter.data.name}
            ref={name}
          />
        </div>
        <div className="mb-3">
          <label style={{ float: "left" }}>Email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter Email"
            defaultValue={parameter.data.email}
            ref={email}
          />
        </div>
        <div className="mb-3">
          <label style={{ float: "left" }}>Department:</label>
          <input
            className="form-control"
            type="text"
            name="dept"
            placeholder="Enter Department"
            defaultValue={parameter.data.department}
            ref={dept}
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
            defaultChecked={parameter.data.gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
          />
          <Form.Check
            inline
            label="Female"
            name="group1"
            type="radio"
            value="Female"
            defaultChecked={parameter.data.gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label style={{ float: "left" }}>Qualification:</label>
          <Dropdown 
          onSelect={(eventKey, e) => setQual(eventKey)} 
          >
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {parameter.data.qualification !== ""
                ? parameter.data.qualification
                : qual ? qual : "Select a choice"}
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
            Edit
          </button>
        </div>
      </form>
    </section>
  );
}

// form for student update operation.
function EditStudent({ parameter }) {


  const [gender, setGender] = useState("");

  const name = useRef("")
  const email = useRef("")
  const department = useRef("")
  const roll = useRef('')

  console.log(gender)

  const handleSubmit = () => {
    fetch(`https://attendence-portal.herokuapp.com/admin/dashboard/update-student/${parameter.data._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email.current.value,
        name: name.current.value,
        gender,
        role: "student",
        department: department.current.value,
        roll: roll.current.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        }
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
  return (
    <section
      className="login-clean"
      style={{ minHeight: "610px", width: "100%" }}
    >
      <h1 style={{ color: "black" }}>Enter Student's Details.</h1>
      <form>
        <div className="mb-3">
          <label style={{ float: "left" }}>Name:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Enter name"
            defaultValue={parameter.data.name}
            ref={name}
          />
        </div>
        <div className="mb-3">
          <label style={{ float: "left" }}>Email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter Email"
            defaultValue={parameter.data.email}
            ref={email}
          />
        </div>
        <div className="mb-3">
          <label style={{ float: "left" }}>Department:</label>
          <input
            className="form-control"
            type="text"
            name="dept"
            placeholder="Enter Department name"
            defaultValue={parameter.data.department}
            ref={department}
          />
        </div>
        <div className="mb-3">
          <label style={{ float: "left" }}>Roll:</label>
          <input
            className="form-control"
            type="text"
            name="roll"
            placeholder="Enter Studennt roll number"
            defaultValue={parameter.data.roll}
            ref={roll}
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
            defaultChecked={parameter.data.gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
          />
          <Form.Check
            inline
            label="Female"
            name="group1"
            type="radio"
            value="Female"
            defaultChecked={parameter.data.gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <button
            className="btn btn-primary d-block w-100"
            type="button"
            onClick={handleSubmit}
          >
            Edit
          </button>
        </div>
      </form>
    </section>
  );
}

export default Edit;
