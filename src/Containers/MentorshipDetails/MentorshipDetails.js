import React, { Component } from "react";
import firebase from ".././../Services/FireBase";
import "./MentorshipDetails.css";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import MentorShipProgram from "../../Components/MentorShipPrograms/MentorShipProgram";
import CreateMentorshipProgram from "../../Components/CreateMentorshipProgram/CreateMentorshipProgram";
import { Accordion, Card, Button } from 'react-bootstrap';

class MentorshipDetails extends Component {

    state = {
        mentorship: {
            mentor_id: "",
            mentee_id: "",
            startDate: new Date(),
            status: "active",
            goal: ""
        },
        saveButtonStatus: false,
        redirect: false

    }

    componentWillMount() {
        // debugger/
        console.log('component will mount', this.props);
        firebase.db.collection('mentorship').where('mentor_id', '==', this.props.id)
            .get().then((snapshot) => {
                console.log(snapshot.id, 'mentor');
            })
        firebase.db.collection('mentorship').where('mentee_id', '==', this.props.id)
            .get().then((snapshot) => {
                console.log(snapshot.id, 'mentee');
            })
    }

    saveMentorshipDetailsHandler = (event) => {
        console.log(this.state.mentorship);
        firebase.db.collection('mentorship').add(this.state.mentorship);
        this.setState({ redirect: true });
    }

    selectMentorHandler = (event) => {
        const updatedState = {
            ...this.state.mentorship
        }
        updatedState.mentor_id = event;
        updatedState.mentee_id = this.props.id;
        this.setState({ mentorship: updatedState });
    }

    textAreaHandler = (e) => {
        const updatedState = {
            ...this.state.mentorship
        }
        updatedState.goal = e;
        this.setState({ mentorship: updatedState });
    }


    render() {
        // console.log(this.props);
        let mentorshipPrograms = null;
        let menteePrograms = null;
        if (this.props.mentorshipPrograms.length > 0) {
            mentorshipPrograms = (
                this.props.mentorshipPrograms.map((program) => {
                    return <MentorShipProgram
                        key={program.id}
                        goal={program.goal}
                        status={program.status}
                        startDate={program.startDate}
                        programId={program.id}
                        allUsers={this.props.completeUsers}
                        mentor={program.mentor_id}
                    />
                })
            )
        } else {
            mentorshipPrograms = (
                <CreateMentorshipProgram
                    allUsers={this.props.completeUsers}
                    mentorSelection={this.selectMentorHandler}
                    goalHandler={this.textAreaHandler}
                    saveProgram={this.saveMentorshipDetailsHandler}
                    id={this.props.id}
                />
            )
        }
        if (this.props.menteePrograms != null && this.props.menteePrograms.length > 0) {
            menteePrograms = (
                this.props.menteePrograms.map((program) => {
                    return <MentorShipProgram
                        key={program.id}
                        goal={program.goal}
                        status={program.status}
                        startDate={program.startDate}
                        programId={program.id}
                        allUsers={this.props.completeUsers}
                        mentor={program.mentor_id}
                    />
                })
            )
        }
        return (
            <Accordion defaultActiveKey="0" className="card main p-1" >
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <div className="d-flex justify-content-start">
                                <div>
                                    <span><i className="fa fa-angle-down fa-2x" aria-hidden="true"></i></span>
                                </div>
                                <div>
                                    <h3 className="title">  Mentorship Programs</h3>
                                </div>
                            </div>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <div className="card-body p-0">
                                {mentorshipPrograms}
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        <div className="d-flex justify-content-start">
                                <div>
                                    <span><i className="fa fa-angle-down fa-2x" aria-hidden="true"></i></span>
                                </div>
                                <div>
                                <h5 className="title">  Mentee Programs </h5>
                                </div>
                            </div>
                            <span></span> 
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <div className="card-body p-0">
                                {menteePrograms}
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }
}

export default MentorshipDetails;