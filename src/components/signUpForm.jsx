import React, { Component } from "react";
const tools = require("../tools");

class SignUpForm extends Component {



  // url = "http://localhost:8080/getGuide?guideId=" + this.id;
  //   url =
  //     "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getGuide?guideId=" +
  //     this.id;

  state = {
      email:'',
      username:'',
      password:'',
  };

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

//   componentDidMount() {}

    onSubmit = e =>{
        e.preventDefault();
        tools.userPool.signUp(this.state.username,this.state.password,[{
            "Name":'email',
            "Value":this.state.email
        }],null,(err,data)=>{
            if(err){
                console.error(err)
            }
            console.log(data);
        })
    }

  render() {
    return <div id="signUpForm">
            <input
            type="email"
            className="signUpFormInput"
            placeholder="Email"
            onChange={(e) => {
              let email = e.target.value;
              this.setState((prevState) => ({
                ...prevState,
                email:email
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
                username:username
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
                password:password
              }));
            }}
          ></input>
            <div onClick={this.onSubmit}>Submit</div>
    </div>;
  }
}

export default SignUpForm;
