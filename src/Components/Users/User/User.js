import React from "react";
import { Route, Link } from "react-router-dom";


const user = (props) => {
  console.log(props, 'user details');
  return (
    <tr>
      <td><Link
        to={{
          pathname: "/user-details/" + props.id
        }}
      >{props.fname}</Link></td>
      <td>{props.lname}</td>
      <td>{props.email}</td>
    </tr>
  )
}

export default user;