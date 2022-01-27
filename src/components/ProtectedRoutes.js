import { decode } from "jsonwebtoken";
import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
//   const isAuthenticated = localStorage.getItem("isAuthenticated");
const user = localStorage.getItem('user');
const token = localStorage.getItem('token'); 
const email = localStorage.getItem('email');
// const role = localStorage.getItem('role');

const validateToken = () => {
    if(user && email && token){
        const {exp} = decode(token)
        if (Date.now() >= exp * 1000) {
            return false;
        }
        else{
            return true
        }
    }
    else{
        return false
    }
}


// console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        validateToken() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;