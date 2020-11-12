import { CognitoUserPool } from "amazon-cognito-identity-js";
import React, { Component } from "react";
import axios from "axios";

// const tools = require("../tools");

class SignUpForm extends Component {
  url = "http://localhost:8080/createUser";
  //   url = "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/createUser";
  userPool = new CognitoUserPool({
    UserPoolId: "us-east-2_r9mOSgn28",
    ClientId: "4id2vq725vkn530cdcj355d0dt",
  });

  state = {
    email: "",
    username: "",
    password: "",
    invalid: false,
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.userPool.signUp(
      this.state.username,
      this.state.password,
      [
        {
          Name: "email",
          Value: this.state.email,
        },
      ],
      null,
      (err, data) => {
        if (err) {
          // invalid = true;
          console.error(err);
        } else {
          // invalid = false;

          let user = {
            username:this.state.username,
            email:this.state.email
          }
          let formData = new FormData();
          formData.append("file", JSON.stringify(user));
          axios.post(this.url, formData).then((res) => {
            console.log(data);
            window.location.href = "/";
          });
        }
      }
    );
  };

  render() {
    return (
      <div id="signUpForm">
        <input
          type="email"
          className="signUpFormInput"
          placeholder="Email"
          onChange={(e) => {
            let email = e.target.value;
            this.setState((prevState) => ({
              ...prevState,
              email: email,
            }));
          }}
        ></input>
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
        <div onClick={this.onSubmit}>Submit</div>
      </div>
    );
  }
}

export default SignUpForm;
