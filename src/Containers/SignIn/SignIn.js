import React, { Component, Profiler } from "react";
import { Route, Redirect } from 'react-router-dom'
import FirebaseDB from "../../Services/FireBase";
import firebase from 'firebase';
import { Alert } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import "./SignIn.css";

// Firebase.initializeApp();
// var Firebase = require('firebase/app');
let id;
class SignIn extends Component {

    constructor(props) {
        super(props);
        this.logIn = this.logIn.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.signUpHandler = this.signUpHandler.bind(this);
        this.state = {
            email: '',
            password: '',
            redirect: false,
            errorMessage: '',
            show: false,
            loader: false
        };

        this.redirectToDashboard = this.redirectToDashboard.bind(this);
    }

    googleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        let user = {};
        this.setState({ loader: true });
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                let userId = result.user;
                id = result.user;
                let credentials = result.additionalUserInfo.profile;
                if (result != null) {
                    user = {
                        email: credentials.email,
                        firstName: credentials.given_name,
                        lastName: credentials.family_name,
                        profile_picture: credentials.picture
                    }
                }
                console.log(user, 'user');
                this.addUserToFirebase(userId.uid, user);
                var token = result.credential.accessToken;
            })
            .catch((err) => {
                console.log(err);
                this.setState({ show: true });
                this.setState({ errorMessage: err.message });
                this.setState({ loader: false });
            })
    }

    loginWithFacebook = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        this.setState({ loader: true });
        let user = {};
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                let userId = result.user;
                id = result.user;
                let credentials = result.additionalUserInfo.profile;
                if (result != null) {
                    user = {
                        email: credentials.email,
                        firstName: credentials.given_name,
                        lastName: credentials.family_name,
                        profile_picture: credentials.picture
                    }
                }
                console.log(user, 'user');
                this.addUserToFirebase(userId.uid, user);
                var token = result.credential.accessToken;
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loader: false });
                this.setState({ show: true });
                this.setState({ errorMessage: err.message });
            })
    }
    addUserToFirebase = (id, user) => {
        FirebaseDB.db.collection('users')
            .doc(id)
            .set(user)
            .then(() => { this.setState({ redirect: true }); this.setState({ loader: false }); });
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    logIn = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                console.log(u, 'email login')
                this.setState({ loader: true });
            }).catch((err) => {
                console.log(err);
                this.setState({ loader: false });
                this.setState({ show: true });
                this.setState({ errorMessage: err.message });
            })
    }

    signUpHandler = (e) => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                console.log(u, 'email login');
                this.setState({ loader: true });
            }).catch((err) => {
                console.log(err);
                this.setState({ loader: false });
                this.setState({ show: true });
                this.setState({ errorMessage: err.message });
            })
    }

    redirectToDashboard = () => {
        console.log('redirecting');
    }
    toggle = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        let alertMessage = null;
        if (this.state.redirect) {
            return <Redirect to={`/user-details/${id.uid}`} />;
            // /user-details/:id
        }
        if (this.state.show) {
            alertMessage = (
                <Alert className="container" variant="danger" onClose={() => this.setState({ show: false })} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        {this.state.errorMessage}
                    </p>
                </Alert>
            );
        }
        return (
            <div className='main'>
                {/* <div style={loaderMain}>
                    <BeatLoader css={loaderStyle} size={48} color='black' loader={this.state.loader} />
                </div> */}
                {alertMessage}
                <div className="signBlock">
                    <h2 className="mb-5">Log in</h2>
                    <h5 className="signUp">New to Mentorship Portal <span className="color-orange" onClick={this.signUpHandler}>SIGN UP FOR FREE</span></h5>
                    <div className="login-section">
                        <form>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Email address"
                                    name="email"
                                    onChange={this.changeHandler}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.changeHandler}
                                    value={this.state.password}
                                />
                            </div>
                            <label className="text-right">Forget Password</label>
                            <button type="button" className="btn btn-secondary btn-lg" onClick={this.logIn}>LOG IN</button>
                            <label className="text-center">OR</label>
                            <button
                                type="button"
                                className="btn btn-secondary btn-lg mb-3 gmail"
                                onClick={this.googleSignIn}
                            >
                                LOG IN WITH GOOGLE
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary btn-lg mb-5 facebook"
                                onClick={this.loginWithFacebook}
                            >
                                LOG IN WITH FACEBOOK
                            </button>
                        </form>
                    </div>
                </div>
                {/* <Alert color="danger" isOpen={this.state.show} toggle={this.toggle.bind(this)}>{this.state.errorMessage}</Alert> */}
            </div>
        )
    }
}

export default SignIn;