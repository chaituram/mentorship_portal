import React, { Component } from "react";
import firebase from "../../Services/FireBase";
import "./MentorShipProgram.css";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const mentorShipProgram = (props) => {
    console.log(props);
    let userName = null;
    debugger
    props.allUsers.map((user) => {
        if (props.mentor === user.id) {
            userName = user.firstName + ' ' + user.lastName
        }
    })
    return (
        <Table hover responsive>
            <thead>
                <tr>
                    <th>Goal</th>
                    <th>Mentor Name</th>
                    <th>Start Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{props.goal}</td>
                    <td>{userName}</td>
                    <td>{props.startDate.toDate().toString()}</td>
                    <td>{props.status}</td>
                    <td>
                        <Link
                            to={{
                                pathname: "/portal/" + props.programId
                            }}>
                            <b>View</b>
                        </Link>
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}

export default mentorShipProgram;