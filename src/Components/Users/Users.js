import React from "react";
import { Link } from "react-router-dom";

import User from "./User/User";
import "./Users.css";
// let eachUser = null;
const users = (props) => {
    console.log(props, 'usersData');
    const eachUser = props.usersData.map(user =>
        <tr key={user.id}>
            <td><Link to="/portal">{user.firstname}</Link></td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
        </tr>
    )

    return (
        <div>
            <table className="table">
                <thead >
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {eachUser}
                </tbody>
            </table>

        </div>
    )
};

export default users;