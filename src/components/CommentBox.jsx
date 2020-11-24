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
      confirmDelete: false,
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
      this.createCommentUrl =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/uploadComment";
      this.deleteUrl =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/deleteComment";
      this.getCommentsUrl =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getComments";
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
    if (this.state.confirmDelete) {
      let formData = new FormData();
      formData.append(
        "file",
        JSON.stringify({
          parentID: this.props.parentID,
          commentID: e.target.id,
          author: "[Deleted]",
          body: "[Deleted]",
          // scoreDown: -1000,
        })
      );
      // console.log(this.props.permaDelete);
      if (this.props.permaDelete) {
        axios.post(this.deleteUrl, formData).then((res) => {
          //   console.log("delete");
          this.updateComments();
        });
      } else {
        axios.post(this.createCommentUrl, formData).then((res) => {
          //   console.log("delete");
          this.updateComments();
        });
      }
          this.setState({
            confirmDelete : false
          })
    } else{
        e.target.innerHTML = "Confirm Delete"
        e.target.classList = "deleteComment confirm"
        this.setState({
          confirmDelete : true
        })
    }
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
            comments: this.props.sortNew ? res.data.reverse() : res.data,
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
              placeholder={this.props.prompt}
              id={this.state.boxID}
            />
            <div className="commentButton" onClick={this.uploadComment}>
              Submit
            </div>
          </div>
        ) : this.props.user && !this.props.deleted ? (
          <div
            className="replyButton"
            id={"reply" + this.state.boxID}
            onClick={this.onReply}
          >
            Reply
          </div>
        ) : (
          ""
        )}
        <div className={this.props.reply ? "comments replies" : "comments"}>
          {this.props.sortNew
            ? this.state.comments.map((comment) => (
                <div key={comment._id} className="commentContainer">
                  {this.props.username === comment.author ? (
                    <div
                      className="deleteComment"
                      id={comment.commentID}
                      onClick={this.onDelete}
                    >
                      [X]
                    </div>
                  ) : (
                    ""
                  )}
                  <Comment comment={comment} {...this.props} />
                </div>
              ))
            : this.state.comments
                .sort((a, b) => {
                  let aScore = a.scoreUp - a.scoreDown;
                  let bScore = b.scoreUp - b.scoreDown;
                  console.log(bScore - aScore);
                  return bScore - aScore;
                })
                .map((comment) => (
                  <div key={comment._id} className="commentContainer">
                    {this.props.username === comment.author ? (
                      <div
                        className="deleteComment"
                        id={comment.commentID}
                        onClick={this.onDelete}
                      >
                        [X]
                      </div>
                    ) : (
                      ""
                    )}
                    <Comment comment={comment} {...this.props} />
                  </div>
                ))}
        </div>
      </div>
    );
  }
}
export default CommentBox;
