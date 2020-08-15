import React, { Component } from "react";

import firebase from "../../Services/FireBase";

import Aux from "../../hoc/Hoc";
import Users from "../../Components/Users/Users";
import Header from "../../Components/Header/Header";
// let resUsers = [];

class Dashboard extends Component {
    state = {
        data: [],
        id: []
    };
    getAllUsers() {
        let items = [];
        firebase.db.collection("users").get()
            .then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    items.push(doc.data());
                    console.log(doc, 'doc');
                    this.setState({ data: items })
                });
                console.log(items, 'items');

            })
    }

    componentDidMount() {
        this.getAllUsers()
    }
    getAllUsersListHandler() {
        console.log('user created !');
    }
    render() {
        return (
            <Aux>
                <Header newUserCreated={this.getAllUsersListHandler} />
                <Users usersData={this.state.data} />
            </Aux>
        )
    }
}

export default Dashboard