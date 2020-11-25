import React, { Component } from "react";
import { session, getUserData } from "../components/Authentication";
import FileUpload from "../components/fileUpload";
import axios from "axios";


class Profile extends Component {


  state = {
    user: "",
  };
  url="";
  componentDidMount(){
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.url = "http://localhost:8080/createUser";
      } else {
        this.url = "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/createUser";
      }
    session()
      .then((val) => {
        if (val) {
          let { Value } = val.Attributes[2];
          getUserData(Value).then((data) => {
            this.setState({
              user: data,
            });
            // console.log(this.state);
          });
        }
      })
      .catch((err) => console.log(err));
  }

  onImageChange = (res) =>{
    let user = {
      username:this.state.user.username,
      email:this.state.user.email,
      image: res.data.Location,
    }
    let formData = new FormData();
    formData.append("file", JSON.stringify(user));
    axios.post(this.url, formData).then((res) => {
      this.setState({
        user:res.data
      })
    });
  }

  defaultImage =
    "https://guia-images.s3-us-west-1.amazonaws.com/Full-Green-Tree-984x1024.png";

  render() {
    return (
      <div id="profile">
        <img
          className="profileImage"
          src={this.state.user.image || this.defaultImage}
          alt={this.state.user.username}
        ></img>
        <FileUpload handler={this.onImageChange} />
        <div className="profileUsername">{this.state.user.username}</div>
        <div className="profileEmail">{this.state.user.email}</div>
      </div>
    );
  }
}

export default Profile;
