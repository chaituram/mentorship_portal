import React, { Component } from "react";

import Axios from "../../Axios/axios";
import Input from "../UI/FormElements/Input";
import Modal from "../UI/Modal/Modal";
import firebase from "../../Services/FireBase";
// import Input from "../UI/FormElements/Input";


import './Header.css';
// import firebaseConfig from "../../Services/FireBase";

class Header extends Component {



  render() {
    return (
      <div className="mb-7">
        <nav className="navbar navbar-light justify-content-between">
          <div>
            <a className="navbar-brand">
              <div className="title">
                <span className="title-1">MENTORSHIP</span>
         &nbsp; <em>PORTAL</em>
              </div>
            </a>
          </div>
          <div className="">
            <button type="button" className="btn btn-outline-primary">SIGN UP FOR FREE</button>
          </div>
        </nav>
      </div>

    )
  }
}


export default Header;