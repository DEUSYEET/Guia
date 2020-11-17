import React, { Component } from "react";
import axios from "axios";
import { v4 } from "uuid";


class CommentBox extends Component {
  url="";
  componentDidMount(){
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //   this.url = "http://localhost:8080/uploadImage";
      } else {
        // this.url = "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/uploadImage";
      }
  }
  
  state = {
    comments: [],
    id:v4()
  };


  onUploadFile = () => {
    let formData = new FormData();
    formData.append("file", JSON.stringify());
    axios.post(this.url, formData).then((res) => {

    });
  };




  render() {
    return (
      <div className="commentBox">
        owo
      </div>
    );
  }
}
export default CommentBox;
