import React, { Component } from "react";
import firebase from "../../Services/FireBase";

class MentorShipProgram extends Component {
    state = {
        allUsers: [],
        mentorships: []
    }
    componentDidMount() {
        let items = [];
        let mentorshipPrograms = [];
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
        // firebase.db.collection('mentorship').where('mentee_id', '==', this.props.match.params.id)
        //     .get()
        //     .then((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             // console.log(doc.data());
        //             let record = doc.data();
        //             record['id'] = doc.id;
        //             mentorshipPrograms.push(record);
        //             this.setState({ mentorships: mentorshipPrograms });
        //             // console.log(mentorshipPrograms);
        //         })
        //         console.log(this.props, 'userSate');
        //     })
    }

    render() {
        let dataToDisplay;
        // console.log(this.props.details);
        // if (this.props.details.mentorshipPrograms.length > 0) {
        //     // this.props.details.mentorshipPrograms.foreach((program) => {
        //     //     console.log(program, 'program**')
        //     //     dataToDisplay = (

        //     //         <div>{program.goal}</div>
        //     //     )
        //     // })
        //     this.props.details.mentorshipPrograms.forEach(program => {
        //         console.log(program, 'program**')
        //     });
        // }

        return (
            <div >
                <div className="form-group">
                    <label>Select mentor</label>
                    <select className="form-control">
                        <option value="null">---select---</option>
                        {
                            this.props.details.completeUsers &&
                            this.props.details.completeUsers.map((h, i) =>
                                (<option key={i} value={h.id}>{h.firstname}</option>))
                        }
                    </select>
                </div>
                {dataToDisplay}
            </div >
        )
    }

}

export default MentorShipProgram;