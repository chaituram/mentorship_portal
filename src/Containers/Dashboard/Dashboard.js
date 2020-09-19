import React, { Component } from "react";

import firebase from "../../Services/FireBase";

import Aux from "../../hoc/Hoc";
import Users from "../../Components/Users/Users";
import Header from "../../Components/Header/Header";
import SignIn from "../SignIn/SignIn";
// let resUsers = [];

class Dashboard extends Component {

    render() {
        return (
            <Aux>
                <Header newUserCreated={this.getAllUsersListHandler} />
                <SignIn />
            </Aux>
        )
    }
}

export default Dashboard