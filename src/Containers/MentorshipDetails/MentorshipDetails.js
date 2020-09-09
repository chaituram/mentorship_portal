import React, { Component } from "react";
import firebase from ".././../Services/FireBase";
import "./MentorshipDetails.css";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';


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
    }

    componentDidMount() {
        console.log('component will receive props', this.props);
    }

    saveMentorshipDetailsHandler = (event) => {
        event.preventDefault();
        firebase.db.collection('mentorship').add(this.state.mentorship);
        console.log(this.props);
        // this.props.history.push("/portal/" + this.props.id);
        this.setState({ redirect: true });
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
        // console.log(this.props);
        if (this.state.redirect) {
            return <Redirect to={"/portal/" + this.props.id} />
        }
        let dataToDisplay;
        if (this.props.mentorshipPrograms.length > 0) {
            this.props.mentorshipPrograms.map((program) => {
                dataToDisplay = (
                    <div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Mentor</label>
                            <select className="form-control" disabled onChange={this.selectMentorHandler} value={program.mentor_id}>
                                <option value="null">---select---</option>
                                {
                                    this.props.completeUsers &&
                                    this.props.completeUsers.map((h, i) =>
                                        (<option key={i} value={h.id}>{h.firstname}</option>))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>  Goal </label>
                            {/* <label>  {program.goal} </label> */}
                            <input className="form-control" disabled value={program.goal} />
                        </div>
                        <div className="form-group">
                            <label>  Status </label>
                            <input className="form-control" disabled value={program.status} />
                        </div>
                        <div className="form-group">
                            <label>  Start date:  {program.startDate.toDate().toString()} </label>
                        </div>
                        <div>
                            <Link
                                to={{
                                    pathname: "/portal/" + program.id
                                }}>
                                <button className="btn btn-primary">Go to Board</button>
                            </Link>
                        </div>
                    </div>
                )
            })

        } else {
            dataToDisplay = (
                <div>
                    <h4 className="alert alert-warning" role="alert">No mentorships available</h4>
                    <div className="form-group">
                        <label className=" col-form-label">Assign a mentor</label>
                        {/* <div className="col-sm-10"> */}
                        <select
                            className="form-control"
                            onChange={this.selectMentorHandler}
                        >
                            <option value="null">---select---</option>
                            {
                                this.props.completeUsers &&
                                this.props.completeUsers.map((h, i) =>
                                    (<option key={i} value={h.id}>{h.firstname}</option>))
                            }
                        </select>
                        {/* </div> */}
                    </div>
                    <div>
                    </div>
                    <div className="form-group">
                        <label>  Goal </label>
                        <textarea className="form-control" onChange={this.textAreaHandler}></textarea>
                    </div>
                    <div>
                        <Link to={{
                            pathname: "/portal/" + this.props.id
                        }}>
                            <button className="btn btn-primary" onClick={this.saveMentorshipDetailsHandler}>Save</button>
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