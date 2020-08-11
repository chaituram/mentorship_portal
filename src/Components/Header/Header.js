import React, { Component } from "react";

import Axios from "../../Axios/axios";
import Input from "../UI/FormElements/Input";
import Modal from "../UI/Modal/Modal";
import firebase from "../../Services/FireBase";
// import Input from "../UI/FormElements/Input";


import './Header.css';
// import firebaseConfig from "../../Services/FireBase";
const modalTitle = 'Create user';
class Header extends Component {

  state = {
    isModalOpen: false,
    userForm: {
      firstname: {
        inputElementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'User Name',
        },
        value: '',
        label: 'User Name'
      },
      lastname: {
        inputElementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Last Name',
        },
        value: '',
        label: 'Last Name'
      },
      email: {
        inputElementType: 'email',
        elementConfig: {
          type: 'email',
          placeholder: 'E-Mail',
        },
        value: '',
        label: 'E-Mail'
      },
      mobile: {
        inputElementType: 'number',
        elementConfig: {
          type: 'text',
          placeholder: 'Phone Number',
        },
        value: '',
        label: 'Phone Number'
      },
    }

  }

  createUserHandler = (e) => {
    e.preventDefault();
    console.log('was clicked !');
    this.setState({ isModalOpen: true });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedUserForm = {
      ...this.state.userForm
    }
    const updatedUserFormValue = {
      ...updatedUserForm[inputIdentifier] = event.target.value
    }
    updatedUserFormValue.value = event.target.value;
    updatedUserForm[inputIdentifier] = updatedUserFormValue;
    this.setState({ userForm: updatedUserForm });
    console.log(updatedUserForm, 'updatedUserForm');
  }

  submitHandler = (event) => {
    event.preventDefault();
    const user = {};
    for (let inputElementIdentifier in this.state.userForm) {
      user[inputElementIdentifier] = this.state.userForm[inputElementIdentifier].value;
      console.log(user, 'user');
    }
    this.setState({ isModalOpen: false });
    console.log(user, 'savingUser');
    firebase.db.collection('users').add(user);
  }
  modalHandler = (e) => {
    e.preventDefault();
    this.setState({ isModalOpen: false });
  }

  closeModalHandler = (e) => {
    e.preventDefault();
    this.setState({ isModalOpen: false });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.userForm) {
      formElementsArray.push({
        id: key,
        config: this.state.userForm[key]
      })
    }
    console.log(formElementsArray);
    return (
      <div className="mb-7">
        <nav className="navbar navbar-light justify-content-between">
          <a className="navbar-brand">
            <div className="title">
              <span className="title-1">MENTORSHIP</span>
         &nbsp; <em>PORTAL</em>
            </div>
          </a>
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.createUserHandler}>Create user</button>
            <Modal
              show={this.state.isModalOpen}
              modalClosed={this.modalHandler}
            >
              <div
                style={{ color: 'black' }}
              >
                <div className="modal-title">
                  <h4>{modalTitle}</h4>
                </div>
                <hr />
                <div className="modal-body pt-0">
                  <form>
                    {formElementsArray.map(form =>
                      <Input
                        elementConfig={form.config.elementConfig}
                        label={form.config.label}
                        value={form.config.value}
                        inputtype={form.config.inputElementType}
                        id={form.id}
                        changed={(event)=> {this.inputChangedHandler(event, form.id)}}
                      />
                    )}
                  </form>
                </div>
                {/* <hr /> */}
                <div className="modal-footer pb-0">
                  <button className="btn btn-danger" onClick={this.closeModalHandler}>Cancel</button>
                  <button className="btn btn-success" onClick={this.submitHandler}>Save</button>
                </div>


              </div>
            </Modal>
          </form>
        </nav>
      </div>

    )
  }
}


export default Header;