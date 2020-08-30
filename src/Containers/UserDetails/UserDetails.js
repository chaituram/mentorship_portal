import React, { Component } from "react";
import firebase from "../../Services/FireBase";
import UserInfo from "../../Components/UserInfo/UserInfo";
import MentorshipDetails from "../MentorshipDetails/MentorshipDetails";
class UserDetails extends Component {

    state = {
        user: {},
        id: '',
        allUsers: [],
        mentorships: []
    }

    componentDidMount() {
        let items = [];
        let mentorshipPrograms = [];
        if (this.props.match.params.id) {
            firebase.db.collection("users").doc(this.props.match.params.id).get()
                .then((snapshot) => {
                    this.setState({ user: snapshot.data() });
                    this.setState({ id: snapshot.id });
                });
        }
        firebase.db.collection("users").get()
            .then((snapshot) => {
                snapshot.docs.forEach((doc, index) => {
                    let record = doc.data();
                    record['id'] = doc.id;
                    items.push(record);
                    // userId.push(doc.id);
                    this.setState({ allUsers: items });
                    // console.log(this.state.allUsers, 'userId');
                });
            })
        firebase.db.collection('mentorship').where('mentee_id', '==', this.props.match.params.id)
            .get()
            .then( (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.data());
                    let record = doc.data();
                    record['id'] = doc.id;
                    mentorshipPrograms.push(record);
                    this.setState({ mentorships: mentorshipPrograms });
                    // console.log(mentorshipPrograms);
                })
            })
    }

    render() {
        return (
            <div>
                <UserInfo userInfo={this.state.user} />
                <MentorshipDetails id={this.state.id} completeUsers={this.state.allUsers} mentorshipPrograms={this.state.mentorships} />
            </div>
        )
    }
}

export default UserDetails;