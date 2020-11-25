import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
// import { session, getUserData } from "../components/Authentication";

class ProfilePic extends Component {
  url = "";
  state = {
    image: "",
  };
  componentDidMount() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      this.url = "http://localhost:8080/getUserImage";
    } else {
      this.url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getUserImage";
    }
    this.getImage();
    if(this.props.test){
        console.log(this.props.username)
    }
  }

  getImage = () => {
    if (this.props.username) {
      let formData = new FormData();
      formData.append("file", JSON.stringify(this.props.username));
      axios.post(this.url, formData).then((res) => {
        this.setState({
          image: res.data
            ? res.data.image
            : "https://guia-images.s3-us-west-1.amazonaws.com/Full-Green-Tree-984x1024.png",
        });
      });
    }
  };

  defaultImage =
    "https://guia-images.s3-us-west-1.amazonaws.com/Full-Green-Tree-984x1024.png";

  render() {
    return (
      // <div onClick={this.getImage}>{this.props.username}</div>
      //   <Link to="/profile">
      <div id="profilePic">
        <img
          src={this.state.image || this.defaultImage}
          className="userImage"
          alt={this.props.username}
          onClick={this.getImage}
        ></img>
      </div>
      //   </Link>
    );
  }
}

export default ProfilePic;
