import React, { Component } from "react";
import ProfilePic from "../components/ProfilePic";
const axios = require("axios");
// import { Link } from "react-router-dom";
// import GuidePreview from "../components/guidePreview";

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search:""
    };
    this.onSearch = this.onSearch.bind(this)
  }
  url = "";

  componentDidMount() {
      document.title = "Users"
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      this.url = "http://localhost:8080/getUsers";
    } else {
      this.url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getUsers";
    }
    // console.log(this.url)
    this.getAll();
  }

  getAll() {
    axios.get(this.url).then((res) => {
      this.setState({
        users: res.data,
      });
    });
  }

 onSearch(e){
    this.setState({
        search:e.target.value
    })
 } 

  render() {
    return (
      <div id="usersPage">
      <input className="userSearch" placeholder="🔎 Search Users" type="text" onChange={this.onSearch}></input>
          {this.state.users
                .filter((user) => {
                  return user.username
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase().trim());
                })
            .map((user) => (
              <div className="userPreview" key={user.username}>
                <ProfilePic username={user.username} />
              </div>
            ))}
      </div>
    );
  }
}
export default UsersPage;
