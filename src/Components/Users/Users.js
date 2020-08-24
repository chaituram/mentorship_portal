import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import firebase from "../../Services/FireBase";

import User from "./User/User";
import "./Users.css";
// let eachUser = null;
class Users extends Component {
    state = {
        data: []
    };
    getAllUsers() {
        let items = [];
        let userId = [];
        firebase.db.collection("users").get()
            .then((snapshot) => {
                snapshot.docs.forEach((doc, index) => {
                    let record = doc.data();
                    record['id'] = doc.id;
                    items.push(record);
                    // userId.push(doc.id);
                    this.setState({ data: items });
                });
                // console.log(this.state.data, 'userId');
            })
    }

    componentDidMount() {
        this.getAllUsers()
    }
    getAllUsersListHandler() {
        // console.log('user created !');
    }


    render() {
        const eachUser = this.state.data.map(user =>
            <User
                key={user.id}
                id={user.id}
                fname={user.firstname}
                lname={user.lastname}
                email={user.email}
            />
        )
        return(
            <div>
                <table className="table">
                    <thead >
                        <tr>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eachUser}
                    </tbody>
                </table>
            </div>
        )
    }
};

export default Users;