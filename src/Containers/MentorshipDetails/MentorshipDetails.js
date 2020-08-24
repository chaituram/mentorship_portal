import React, { Component } from "react";
import firebase from ".././../Services/FireBase";
import "./MentorshipDetails.css";
import { Link } from "react-router-dom";

class MentorshipDetails extends Component {

    state = {
        mentorship: {
            mentor_id: "",
            mentee_id: "",
            startDate: new Date(),
            status: "active",
            goal: ""
        },
        saveButtonStatus: false
    }

    componentWillMount() {
        // debugger/
        console.log('component will mount', this.props);
        firebase.db.collection('mentorship').where('mentor_id', '==', this.props.id)
            .get().then((snapshot) => {
                console.log(snapshot.id, 'mentor');
            })
    }

    componentDidMount() {
        console.log('component will receive props', this.props);
    }

    saveMentorshipDetailsHandler = (event) => {
        event.preventDefault();
        firebase.db.collection('mentorship').add(this.state.mentorship)
    }

    selectMentorHandler = (event) => {
        event.preventDefault();
        console.log(event.target.value, this.props.id);
        const updatedState = {
            ...this.state.mentorship
        }
        updatedState.mentor_id = event.target.value;
        updatedState.mentee_id = this.props.id;
        this.setState({ mentorship: updatedState });
    }

    textAreaHandler = (event) => {
        // console.log(event.target.value);
        const updatedState = {
            ...this.state.mentorship
        }
        updatedState.goal = event.target.value;
        this.setState({ mentorship: updatedState });
    }

    render() {
        console.log(this.props);
        let dataToDisplay;
        if (this.props.mentorshipPrograms.length > 0) {
            dataToDisplay = (
                <div>
                    {/* <p>Data available</p> */}
                Mentor:  <select className="mb-3" disabled onChange={this.selectMentorHandler} value={this.props.mentorshipPrograms[0].mentor_id}>
                        <option value="null">---select---</option>
                        {
                            this.props.completeUsers &&
                            this.props.completeUsers.map((h, i) =>
                                (<option key={i} value={h.id}>{h.firstname}</option>))
                        }
                    </select>
                    <p>
                        Goal: {this.props.mentorshipPrograms[0].goal}
                    </p>
                    <p>
                        Status: {this.props.mentorshipPrograms[0].status}
                    </p>
                    <p>
                        Start date: {this.props.mentorshipPrograms[0].startDate.toDate().toString()}
                    </p>
                    <div>
                        <Link
                            to={{
                                pathname: "/portal/" + this.props.id
                            }}>
                            <button className="btn btn-primary">Go to Board</button>
                        </Link>
                    </div>
                </div>
            )
        } else {

            dataToDisplay = (
                <div>
                    <p>No mentorships available</p>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Assign a mentor</label>
                        <div className="col-sm-10">
                            <select 
                            onChange={this.selectMentorHandler}>
                                <option value="null">---select---</option>
                                {
                                    this.props.completeUsers &&
                                    this.props.completeUsers.map((h, i) =>
                                        (<option key={i} value={h.id}>{h.firstname}</option>))
                                }
                            </select>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div>
                        <textarea onChange={this.textAreaHandler}></textarea>
                    </div>
                    <div>
                        <Link
                            to={{
                                pathname: "/portal/" + this.props.id
                            }}>
                            <button
                                disabled={this.state.saveButtonStatus}
                                className="btn btn-primary"
                                onClick={this.saveMentorshipDetailsHandler}
                            >Save</button>
                        </Link>

                    </div>
                </div>
            )
        }
        return (
            <div className="card main">
                <h3 className="card-header">
                    Mentorship Details
            </h3>
                <div className="card-body">
                    {dataToDisplay}
                </div>
            </div>
        )
    }
}

export default MentorshipDetails;