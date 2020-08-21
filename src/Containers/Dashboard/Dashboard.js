import React, { Component } from "react";

import firebase from "../../Services/FireBase";

import Aux from "../../hoc/Hoc";
import Users from "../../Components/Users/Users";
import Header from "../../Components/Header/Header";
// let resUsers = [];

class Dashboard extends Component {
    
    render() {
        return (
            <Aux>
                <Header newUserCreated={this.getAllUsersListHandler} />
                <Users />
            </Aux>
        )
    }
}

export default Dashboard