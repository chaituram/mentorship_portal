import React from "react";
import { Route, Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';


const user = (props) => {
  // console.log(props, 'user details');
  return (
    <tr>
      <td>{props.fname} </td>
      <td>{props.lname}</td>
      <td>{props.email}</td>
      <td>
        <Link
          to={{
            pathname: "/user-details/" + props.id
          }}
        >
          <i className="fa fa-chevron-right" aria-hidden="true"></i>

        </Link>
      </td>

    </tr>
  )
}

export default user;