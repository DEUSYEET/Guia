import React, { Component } from "react";
import SignUpForm from '../components/signUpForm'
import LogInForm from '../components/loginForm'
// import {Account} from '../components/Authentication'
// const tools = require("../tools");

class LoginPage extends Component {

  state = {};

  render() {
    return (
      <div id="loginPage">
        <div id="loginPageForm">
        {/* <Account> */}
            <SignUpForm />
            <LogInForm />
        {/* </Account> */}
        </div>
      </div>
    );
  }
}

export default LoginPage;
