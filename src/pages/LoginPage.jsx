import React, { Component } from "react";
import SignUpForm from '../components/signUpForm'
// const tools = require("../tools");

class LoginPage extends Component {

  // url = "http://localhost:8080/getGuide?guideId=" + this.id;
  //   url =
  //     "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getGuide?guideId=" +
  //     this.id;

  state = {};

  //   getSections() {
  //     console.log(this.url);
  //     fetch(this.url)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // console.log(data);
  //         this.setState({
  //           guideHead: data[0],
  //           guideSections: data[1],
  //         });
  //         console.log(this.state);
  //       });
  //   }

  componentDidMount() {
    // this.getSections();
    // console.log(this.props.history)
  }

  render() {
    return (
      <div id="loginPage">
        <div id="loginPageForm">
            <SignUpForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
