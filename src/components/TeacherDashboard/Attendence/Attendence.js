import React, { useEffect, useState } from "react";

function Attendence() {
  const [array, setArray] = useState([]);
  const [data, setData] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    fetch(
      `https://attendence-portal.herokuapp.com/admin/dashboard/teacher-detail/${email}`
    )
      .then((response) => response.json())
      .then((data) => {
        fetch(
          `https://attendence-portal.herokuapp.com/teacher/dashboard/student-detail-batch/${data.data.department}`
        )
          .then((response) => response.json())
          .then((data) => setData(data.data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  });

  const handleAttendence = () => {
    
    if (array.length !== data.length) {
      alert("Please mark attendence of all students");
      return;
    } else {
      const value = getDate().split("-").reverse().join("-");
      localStorage.setItem("attendenceDate", value);
    }
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

  const checkMarked = () => {
    const todayDate = getDate().split("-").reverse().join('-');
    const localStorageDate = localStorage.getItem("attendenceDate")
    const markedDate = new Date(localStorageDate)
    
   return (new Date(todayDate) > markedDate)
 }

  const handlePresent = (id) => {
    fetch(
      `https://attendence-portal.herokuapp.com/teacher/dashboard/mark-attendence/${id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          present: 1,
          leave: 0,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    setArray([...array, id]);
  };
  const handleLeave = (id) => {
    fetch(
      `https://attendence-portal.herokuapp.com/teacher/dashboard/mark-attendence/${id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          present: 0,
          leave: 1,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    setArray([...array, id]);
  };

  const handleAbsent = (id) => {
    fetch(
      `https://attendence-portal.herokuapp.com/teacher/dashboard/mark-attendence/${id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          present: 0,
          leave: 0,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    setArray([...array, id]);
  };


  return (
    <section
      className="login-clean"
      style={{ minHeight: "auto", width: "100%" }}
    >
      <p className="text-dark">Attendence</p>
      <h3 className="text-dark">{getDate()}</h3>
      {checkMarked() ? (
        <div>
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
        </div>
      ) : (
        <h3 style={{marginTop: "30px"}}>You have already marked attendence for the day...</h3>
      )}
    </section>
  );
}

export default Attendence;
