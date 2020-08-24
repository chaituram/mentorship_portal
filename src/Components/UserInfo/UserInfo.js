import React from "react";
import "./UserInfo.css";

const userInfo = (props) => {
    // console.log(props.userInfo);
    const user = props.userInfo;
    return (
        <div className="card main">
            <h3 className="card-header">
            User Info
            </h3>
            <div className="card-body">
                <p className="card-text">{user.firstname}</p>
                <p className="card-text">{user.lastname}</p>
                <p className="card-text">{user.email}</p>
                <p className="card-text">{user.mobile}</p>
            </div>
        </div>
    )
}

export default userInfo;