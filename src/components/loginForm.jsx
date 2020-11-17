import React, { Component } from "react";
import {auth} from './Authentication'

class LogInForm extends Component {
  state = {
    username: "",
    password: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    auth(this.state.username,this.state.password).then(data=>{
      // console.log("login",data)
    window.location.href= "/"

    }).catch(err=>{
      console.error("error",err)
    })
  };

  render() {
    return (
      <div id="signUpForm">
      <div id="signInHead">
        Log In
      </div>
      <div className="signInLabel">
        Username
      </div>
        <input
          type="text"
          className="signUpFormInput"
          placeholder="Username"
          onChange={(e) => {
            let username = e.target.value;
            this.setState((prevState) => ({
              ...prevState,
              username: username,
            }));
          }}
        ></input>
              <div className="signInLabel">
        Password
      </div>
        <input
          type="password"
          className="signUpFormInput"
          placeholder="Password"
          onChange={(e) => {
            let password = e.target.value;
            this.setState((prevState) => ({
              ...prevState,
              password: password,
            }));
          }}
        ></input>
        <div id="submitButton" onClick={this.onSubmit}>Submit</div>
      </div>
    );
  }
}

export default LogInForm;
