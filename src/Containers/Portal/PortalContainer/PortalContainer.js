import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PortalHeader from "../../../Components/PortalHeader/PortalHeader";
import Modal from "../../../Components/UI/Modal/Modal";

import Input from "../../../Components/UI/FormElements/Input";

import "./PortalContainer.css";

const modalTitle = 'Create Task';
class PortalContainer extends Component {
    state = {
        isModalOpen: false,
        createTaskForm: {
            taskTitle: {
                inputElementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Title',

                }
            }
        }
    }

    openModalHandler = () => {
        this.setState({ isModalOpen: true })
    }
    render() {
        return (
            <div className="container-wrapper">
                <PortalHeader />
                <div className="container">
                    <div>
                        <button className="btn btn-primary" onClick={this.openModalHandler}>Create New Task</button>
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
                            <div class="form-group">
                                <label for="exampleInputEmail1">Title</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title" />
                            </div> 
                            <label for="exampleInputEmail1">Description</label>
                                <CKEditor
                                editor={ClassicEditor}
                                // data="<p>Hello from CKEditor 5!</p>"
                                onInit={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log('Editor is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log({ event, editor, data });
                                }}
                                onBlur={(event, editor) => {
                                    console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log('Focus.', editor);
                                }}
                            />
                        </div>
                        {/* <hr /> */}
                        <div className="modal-footer pb-0">
                            <button className="btn btn-danger" onClick={()=> {this.setState({ isModalOpen: false })}}>Cancel</button>
                            <button className="btn btn-success" onClick={this.submitHandler}>Create</button>
                            {/* disabled={!this.state.formValidation} */}
                        </div>


                    </div>
                </Modal>
            </div>
        )
    }
}

export default PortalContainer;