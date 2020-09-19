import React from "react";
import { Link } from "react-router-dom";

const createMentorshipProgram = (props) => {
    let selectHandler = (e) => {
        props.mentorSelection(e.target.value);
    }
    let textAreaHandler = (e) => {
        props.goalHandler(e.target.value);
    }
    let save = (event) => {
        props.saveProgram(event);
    }
    return (
        <div className="program p-3">
            <div className="form-group">
                <label>Mentor</label>
                {/* onChange={this.selectMentorHandler}  */}
                <select className="form-control" onChange={selectHandler}>
                    <option value="null">---select---</option>
                    {
                        props.allUsers &&
                        props.allUsers.map((h, i) =>
                            (<option key={i} value={h.id}>{h.firstname}</option>))
                    }
                </select>
            </div>
            <div className="form-group">
                <label>  Goal </label>
                <textarea onChange={textAreaHandler} className="form-control"></textarea>
            </div>
            <div>
                <Link
                    to={{
                        pathname: "/portal/" + props.id
                    }}
                >
                    <button className="btn btn-primary" onClick={save}>Save & Go to Board</button>
                </Link>
            </div>
        </div >
    )
}

export default createMentorshipProgram;