import React, { Component } from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FireBase from "../../../Services/FireBase";

const formElementsArray = [];

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.task.title,
            description: props.task.description,
            startDate: props.task.start_date,
            endDate: props.task.endDate,
            status: props.task.status
        };
        console.log(this.state);
        this.handleChange = this.handleChange.bind(this);
        this.statusHandler = this.statusHandler.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ title: event.target.value });
        // console.log(this.state);
    }
    componentWillMount() {
        console.log('un mounting');
    }

    savingUpdatedTask = () => {
        FireBase.db.collection('tasks')
        .doc(this.props.task.id)
        .update(this.state)
    }

    statusHandler = (event) => {
        this.setState({ status: event.target.value });
    }


    render() {
        console.log(this.props, 'task clicked');
        return (
            <form>
                <div className="form-group">
                    <label>Title</label>
                    {this.state.title}
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.title}
                        onChange={this.handleChange}
                        onBlur={this.savingUpdatedTask}
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label >Description</label>
                    <CKEditor
                        data={this.props.task.description}
                        editor={ClassicEditor}
                        // data="<p>Hello from CKEditor 5!</p>"
                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            // console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            // console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            const data = editor.getData();

                            const updatedState = {
                                ...this.state
                            }
                            updatedState.description = data;
                            this.setState({ description: updatedState })
                        }}
                        onFocus={(event, editor) => {
                            // console.log('Focus.', editor);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Start date</label>
                    <input type="date" disabled className="form-control" id="exampleInputPassword1" value={this.props.task.start_date} disabled />
                </div>
                <div className="form-group">
                    <label>End date</label>
                    <input type="date" className="form-control" id="exampleInputPassword1" disabled value={this.props.task.endDate} disabled/>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select value={this.props.task.status} onChange={this.statusHandler}>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="complete">Complete</option>
                    </select>
                </div>
            </form>
        )
    }
}

export default Task;