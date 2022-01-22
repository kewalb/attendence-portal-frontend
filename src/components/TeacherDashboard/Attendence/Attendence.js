import React, { useEffect, useState } from "react";

function Attendence() {
  const [array, setArray] = useState([]);
  const [data, setData] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    fetch(`http://localhost:9000/admin/dashboard/teacher-detail/${email}`)
      .then((response) => response.json())
      .then((data) => {
        fetch(
          `http://localhost:9000/teacher/dashboard/student-detail-batch/${data.data.department}`
        )
          .then((response) => response.json())
          .then((data) => setData(data.data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAttendence = () => {
    const value = {
      marked: true,
      date: Date.now(),
    };
    localStorage.setItem("attendence", value);
  };

  const getDate = () => {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = dd + "-" + mm + "-" + yyyy;
    return today;
  };

  const handlePresent = (id) => {
    fetch(`http://localhost:9000/teacher/dashboard/mark-attendence/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        present: 1,
        leave: 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    setArray([...array, id]);
  };
  const handleLeave = (id) => {
    fetch(`http://localhost:9000/teacher/dashboard/mark-attendence/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        present: 0,
        leave: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    setArray([...array, id]);
  };

  const handleAbsent = (id) => {
    setArray([...array, id]);
  };
//   console.log(array.includes("61ea3896144dc0ff711ada1b"));

  return (
    <section
      className="login-clean"
      style={{ minHeight: "auto", width: "100%" }}
    >
      <p className="text-dark">Attendence</p>
      <h3 className="text-dark">{getDate()}</h3>
      <table className="table text-dark">
        <thead>
          <tr>
            <th scope="col">Roll.No</th>
            <th scope="col">Name</th>
            <th scope="col" colSpan={3}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student._id}>
              <th scope="row">{student.roll}</th>
              <td>{student.name}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handlePresent(student._id)}
                  disabled={array.includes(student._id)}
                >
                  Present
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleAbsent(student._id)}
                  disabled={array.includes(student._id)}
                >
                  Absent
                </button>
              </td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleLeave(student._id)}
                  disabled={array.includes(student._id)}
                >
                  leave
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success my-5" onClick={handleAttendence}>
        Submit
      </button>
    </section>
  );
}

export default Attendence;
