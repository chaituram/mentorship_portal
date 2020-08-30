import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PortalHeader from "../../../Components/PortalHeader/PortalHeader";
import Modal from "../../../Components/UI/Modal/Modal";
import Firebase from "../../../Services/FireBase";
import Task from "../../../Components/Tasks/Task/Task";
import "./PortalContainer.css";
import Tasks from '../../../Components/Tasks/Tasks';
import { Route, Link } from "react-router-dom";

let selectedTask;
const modalTitle = 'Create Task';
class PortalContainer extends Component {
    state = {
        isModalOpen: false,
        task: {
            title: "",
            description: "",
            status: "pending",
            start_date: new Date(),
            end_date: "",
            mentorship_id: this.props.mentorshipId
        },
        tasksList: [],
        // selectedTask: {},
        error: false
    }

    componentDidMount() {
        this.readingAllTasks();
    }

    openModalHandler = () => {
        this.setState({ isModalOpen: true })
    }
    titleHandler = (event) => {
        let updatedTitle = {
            ...this.state.task
        }
        updatedTitle.title = event.target.value;
        // updatedTitle = event.target.value;
        this.setState({ task: updatedTitle })
    }
    statusHandler = (event) => {
        let updatedState = {
            ...this.state.task
        }
        updatedState.status = event.target.value;
        this.setState({ task: updatedState })
    }
    endDateHandler = (event) => {
        let updatedState = {
            ...this.state.task
        }
        updatedState.endDate = event.target.value;
        this.setState({ task: updatedState })
    }

    submitHandler = () => {
        // console.log(this.props, this.state.task);
        Firebase.db.collection("tasks").add(this.state.task)
            .then((res) => {
                // console.log(res, 'task created ');
                this.readingAllTasks();
                this.setState({ isModalOpen: false })
            });
    }

    readingAllTasks() {
        console.log('refreshing', this.props.mentorshipId);
        let list = [];
        Firebase.db.collection("tasks").where("mentorship_id", "==", this.props.mentorshipId)
            .get()
            .then((snapshot) => {
                // console.log();
                snapshot.docs.forEach((doc, index) => {
                    console.log('inside tasks', this.props.mentorshipId);
                    list.push({
                        ...doc.data(),
                        id: doc.id
                    })
                });
                // console.log(list);
                this.setState({ tasksList: list });
            })
            .catch(error => {
                // console.log(error, '=> reading all tasks');
                this.setState({ error: true });
            })
    }

    taskSelectedHandler = (task) => {
        selectedTask = <Task task={task} />
    }

    render() {
        // console.log('1');
        let tasks = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error) {
            tasks = this.state.tasksList.map(task => {
                return (<Link
                    to={{
                        pathname: "/portal/" + this.props.mentorshipId
                    }}
                >
                    <Tasks
                        key={task.id}
                        taskData={task}
                        clicked={() => this.taskSelectedHandler(task)}
                    />
                </Link>);
            });
        }
        return (
            <div className="container-wrapper">
                <PortalHeader />
                <div className="container-fluid d-flex justify-content-between">
                    <div>
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        {/* <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                    </div>
                    <div>
                        <button className="btn btn-primary mb-3" onClick={this.openModalHandler}>Create New Task</button>
                    </div>
                </div>
                <Modal
                    show={this.state.isModalOpen}
                    modalClosed={this.modalHandler}
                    classes={'Modal-lg'}
                >
                    <div
                        style={{ color: 'black' }}
                    >
                        <div className="modal-title">
                            <h4>{modalTitle}</h4>
                        </div>
                        <hr />
                        <div className="modal-body pt-0">
                            <div className="form-group">
                                <label >Title</label>
                                <input onChange={this.titleHandler} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" />
                            </div>
                            <label >Description</label>
                            <CKEditor
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
                                        ...this.state.task
                                    }
                                    updatedState.description = data;
                                    this.setState({ task: updatedState })
                                }}
                                onFocus={(event, editor) => {
                                    // console.log('Focus.', editor);
                                }}
                            />
                           Status: <select
                                onChange={this.statusHandler}>
                                <option value="pending" selected>Pending</option>
                                <option value="inprogress">InProgress</option>
                            </select>
                            End Date: <input type="date" onChange={this.endDateHandler} />
                        </div>
                        <div className="modal-footer pb-0">
                            <button className="btn btn-danger"
                                onClick={() => { this.setState({ isModalOpen: false }) }}
                            >Cancel</button>
                            <button className="btn btn-success"
                                onClick={this.submitHandler}
                            >Create</button>
                            {/* disabled={!this.state.formValidation} */}
                        </div>
                    </div>
                </Modal>
                <div className="TasksContainer d-flex justify-content-start">
                    <div className="TaskTitle">
                        {tasks}
                    </div>
                    <div className="TaskDetails p-1">
                        {selectedTask}
                    </div>
                </div>
            </div>
        )
    }
}

export default PortalContainer;