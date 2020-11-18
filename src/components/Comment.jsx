import React, { Component } from "react";
import CommentBox from "../components/CommentBox";


class Comment extends Component {
  comment = this.props.comment;
  render() {
    return (
      <div className="comment">
        <div className="commentAuthor">
            {this.comment.author}
        </div>
        <div className="commentBody">
            {this.comment.body}
        </div>
        <CommentBox
          parentID={this.comment.commentID}
          user={this.props.user}
          username={this.props.username}
          hide = {true}
        />
      </div>
    );
  }
}
export default Comment;
