import React, { useState } from 'react';
import "./Comment.css";
import FireBase from "../../../Services/FireBase";

const Comment = (props) => {
    const [disableId, setDisable] = useState('');
    const enable = (id) => {
        setDisable(id)
    }
    const updatingComment = (id) => {
        // FireBase.db.collection('comments')
        // .doc
        setDisable('')
    }
    const comment = props.comment.map((record) => {
        console.log(record, 'record');
        return (
            <div>
                <textarea
                    className="form-control"
                    disabled={!(record.id === disableId)}
                    key={record.id}
                    value={record.description.replace(/(<([^>]+)>)/ig, '')}
                > </textarea>
                <ul className="text-right m-0"
                    style={{ display: !(record.id === disableId) ? 'block' : 'none' }}
                >
                    <li onClick={() => { enable(record.id) }}>Edit</li>
                    <li>Delete</li>
                </ul>
                <div
                    className="m-3 text-right"
                    style={{ display: (record.id === disableId) ? 'block' : 'none' }}
                >
                    <button className="btn btn-primary" onClick={()=>{updatingComment(record.id)}}>Update</button>
                    <button className="btn btn-danger ml-3" onClick={() => { setDisable('') }}>Cancel</button>
                </div>
            </div>
        )
    })
    return (
        <div>
            {comment}
        </div>
    )
}

export default Comment;