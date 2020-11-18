import React, { Component } from "react";
import Comment from "./Comment";
import axios from "axios";
import { v4 } from "uuid";

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // box: {},
      boxID: v4(),
      comments: [],
      userComment: "",
      hide: this.props.hide,
    };
    this.onReply = this.onReply.bind(this);
    //   this.onDelete = this.onDelete.bind(this)
  }

  createCommentUrl = "";
  getCommentsUrl = "";
  deleteUrl = "";
  componentDidMount() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      this.createCommentUrl = "http://localhost:8080/uploadComment";
      this.deleteUrl = "http://localhost:8080/deleteComment";
      this.getCommentsUrl = "http://localhost:8080/getComments";
    } else {
      // this.url = "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/uploadImage";
    }
    // console.log("mounting");
    this.updateComments();
  }

  onAddComment = (e) => {
    let content = e.target.value;
    this.setState({
      userComment: content,
    });
  };

  uploadComment = () => {
    let formData = new FormData();
    formData.append(
      "file",
      JSON.stringify({
        parentID: this.props.parentID,
        commentID: v4(),
        author: this.props.username,
        body: this.state.userComment,
      })
    );
    axios.post(this.createCommentUrl, formData).then((res) => {
      this.updateComments();
      document.getElementById(this.state.boxID).value = "";
    });
  };

  onDelete = (e) => {
    let formData = new FormData();
    formData.append(
      "file",
      JSON.stringify({
        parentID: this.props.parentID,
        commentID: e.target.id,
        author: "[Deleted]",
        body: "[Deleted]",
      })
    );
    axios.post(this.createCommentUrl, formData).then((res) => {
    //   console.log("delete");
      this.updateComments();
    });
  };

  updateComments = () => {
    let formData = new FormData();
    formData.append(
      "file",
      JSON.stringify({
        parentID: this.props.parentID,
      })
    );
    axios.post(this.getCommentsUrl, formData).then((res) => {
      this.setState(
        {
          comments: [],
          hide: this.props.hide,
        },
        () => {
          this.setState({
            comments: res.data,
            hide: this.props.hide,
          });
        }
      );
    });
  };

  onReply() {
    this.setState({
      hide: false,
    });
  }

  render() {
    return (
      <div className="commentBox">
        {this.props.user && !this.state.hide ? (
          <div className="commentInput">
            <textarea
              onChange={this.onAddComment}
              className="commentTextArea"
              placeholder="Leave a comment"
              id={this.state.boxID}
            />
            <div className="commentButton" onClick={this.uploadComment}>
              Submit
            </div>
          </div>
        ) : (
          <div
            className="replyButton"
            id={"reply" + this.state.boxID}
            onClick={this.onReply}
          >
            Reply
          </div>
        )}
        <div className="comments">
          {this.state.comments
            .sort((a, b) => {
              let aScore = a.scoreUp - a.scoreDown;
              let bScore = b.scoreUp - b.scoreDown;
              return bScore - aScore;
            })
            .map((comment) => (
              <div key={comment._id}>
                {this.props.username === comment.author?
                <div
                  className="deleteComment"
                  id={comment.commentID}
                  onClick={this.onDelete}
                >[X]</div>
                :
                ""}
                <Comment comment={comment} {...this.props} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}
export default CommentBox;
