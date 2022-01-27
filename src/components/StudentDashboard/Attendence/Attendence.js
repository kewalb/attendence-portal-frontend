import React, { useState, useEffect } from "react";

function Attendence() {
  const [attendenceByDate, setAttendenceByDate] = useState([]);
  const email = localStorage.getItem("email");
  

  useEffect(() => {
    fetch(
      `https://attendence-portal.herokuapp.com/student/dashboard/attendence-detail/${email}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAttendenceByDate(data.attendenceByDate);
      })
      .catch((error) => console.log(error));
  }, [email]);

  const getDate = (date) => {
    var today = date;
    return (today.substring(0, 10))
    
  };

  return (
    <div className="container m-4" style={{textAlign: 'center'}}>
        <h2 className="text-dark m-4">Attendence by date</h2><br />
      {attendenceByDate.map((attendence, index) => (
        <div className="row" key={index}>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 text-dark">
                {getDate(attendence.date)}
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 text-dark">
              {attendence.status === "P" ? "Present" : attendence.status === "L" ? "Leave" : "Absent"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Attendence;
