import React, { Component } from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FireBase from "../../../Services/FireBase";
import Comments from "../../Comments/Comments";

const formElementsArray = [];
// const history = useHistory();
class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: [],
            showCommentSection: false,
            comment: ''
        }
        // console.log(this.state);
        this.handleChange = this.handleChange.bind(this);
        this.statusHandler = this.statusHandler.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // console.log(this.props, 'constructed props');
    }

    handleChange(event) {
        const updatedState = {
            ...this.state.task
        };
        updatedState.title = event.target.value;
        this.setState({ task: updatedState });
        // console.log(this.state);
    }
    componentDidMount() {
        console.log('un mounting', this.props);
        const id = this.props.match.params.id;
        FireBase.db.collection('tasks')
            .doc(id)
            .get()
            .then((snapShot) => {
                console.log(snapShot.data());
                snapShot.data().start_date.toDate().toString();
                this.setState({ task: snapShot.data() })
            });

    }

    savingUpdatedTask = () => {
        FireBase.db.collection('tasks')
            .doc(this.props.match.params.id)
            .update(this.state.task)
    }

    statusHandler = (event) => {
        this.setState({ status: event.target.value });
    }
    backToTasksHandler = () => {
        // history.push("/portal");
        this.props.history.goBack();
    }
    showCommentBoxHandler = () => {
        this.setState({ showCommentSection: true });
    }
    postCommentHandler = () => {
        // this.setState({ showCommentSection: false });
        // firebase.db.collection('comments')
        // .add()
    }
    commentHandler = (e) => {
        this.setState({ comment: e });
        console.log(e);
    }

    render() {
        return (
            <div className="p-3">
                <div className="text-right">
                    <button className="btn btn-primary" onClick={this.backToTasksHandler}>All tasks</button>
                </div>
                <form className="m-3">
                    {/* <div>dsd</div> */}
                    <div className="form-group">
                        <label>Title</label>

                        <input
                            type="text"
                            className="form-control"
                            value={this.state.task.title}
                            onChange={this.handleChange}
                            onBlur={this.savingUpdatedTask}
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label >Description</label>
                        <CKEditor
                            data={this.state.task.description}
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
                                // const data = editor.getData();
                                const updatedState = {
                                    ...this.state.task
                                }
                                updatedState.description = editor.getData();
                                this.setState({ task: updatedState });
                                this.savingUpdatedTask();
                            }}
                            onFocus={(event, editor) => {
                                // console.log('Focus.', editor);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Start date</label>
                        <input type="date" disabled value={this.state.task.start_date} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="form-group">
                        <label>End date</label>
                        <input type="date" value={this.state.task.endDate} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select className="form-control" onChange={this.statusHandler} value={this.state.task.status}>
                            <option value="pending">Pending</option>
                            <option value="inprogress">In Progress</option>
                            <option value="complete">Complete</option>
                        </select>
                    </div>
                </form>
                <div
                    style={{ display: (!this.state.showCommentSection ? 'block' : 'none') }}
                >
                    <button className="btn btn-secondary"
                        onClick={this.showCommentBoxHandler}
                    >
                        Add Comment
                    </button>
                </div>
                <div
                    className="p-3"
                    style={{ display: (this.state.showCommentSection ? 'block' : 'none') }}
                >
                    <Comments
                        comment={this.commentHandler}
                    />
                    <div className="text-right">
                        <button className="btn btn-danger mr-3" onClick={() => { this.setState({ showCommentSection: false }) }}>Cancel</button>
                        <button className="btn btn-info" onClick={this.postCommentHandler}>Post</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Task;