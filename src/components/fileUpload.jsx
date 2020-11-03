import React, { Component } from "react";
import axios from "axios";

class FileUpload extends Component {
  // url = "http://localhost:8080/uploadImage";
  url = "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/uploadImage";

  state = {
    file: null,
  };

  onChooseFile = (evt) => {
    this.setState({
      file: evt.target.files[0],
    });
  };

  onUploadFile = () => {
    let file = new FormData();
    file.append("file",this.state.file,this.state.file.name)
    axios.post(this.url,file).then(res=>{
        this.props.handler(res);
    });
  };

  render() {
    return (
      <div className="fileUpload">
        <input type="file" accept="image" onChange = {this.onChooseFile}></input>
        <button onClick={this.onUploadFile}>Submit</button>
      </div>
    );
  }
}
export default FileUpload;
