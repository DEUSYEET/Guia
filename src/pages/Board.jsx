import React, { Component } from "react";
import CommentBox from "../components/CommentBox";
import { session, getUsername } from "../components/Authentication";

class Board extends Component {
  state = {
    user: false,
    username: "",
    searchValue: "",
  };

  componentDidMount() {
    document.title = "Community Board";
    session()
      .then((val) => {
        if (val) {
          // console.log("USER",val);
          let { Value } = val.Attributes[2];
          getUsername(Value).then((data) => {
            this.setState({
              username: data,
              user: true,
            });
          });
        }
      })
      .catch((err) => console.log(err));
    // console.log("Board      ----->",this.props.searchValue)
    this.setState({
      searchValue: this.props.searchValue ? this.props.searchValue : "",
    });
  }

  render() {
    return (
      <div id="board">
        <CommentBox
          parentID={this.id}
          user={this.state.user}
          username={this.state.username}
          hide={false}
          submit={false}
          sortNew={true}
          permaDelete={true}
          prompt="Start a discussion"
          searchValue={this.props.searchValue}
        />
      </div>
    );
  }
}

export default Board;
