import React, { Component, useEffect } from "react";
import FileUpload from "../components/fileUpload";
import axios from "axios";

class guideHead {
  constructor() {
    this.guideID = "";
    this.author = "";
    this.title = "";
    this.description = "";
    this.image = "";
    this.video = "";
    this.scoreUp = 0;
    this.scoreDown = 0;
  }
}

// class guideSection {
//   constructor() {
//     this.guideID = null;
//     this.title = null;
//     this.description = null;
//     this.image = null;
//     this.video = null;
//   }
// }

class CreateGuide extends Component {
//   url = "http://localhost:8080/uploadGuideHead";
  url = "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/uploadGuideHead";

  state = {
    guideHead: new guideHead(),
    guideSections: [],
  };

  componentDidMount() {}

  //   scrollOnMount = () =>{
  //     useEffect (()=>{
  //         window.scrollTo(0,0)
  //       },[])
  //   }

  onSaveGuide = () => {
    console.log(this.state.guideHead);
    let formData = new FormData();
    formData.append("file", JSON.stringify(this.state.guideHead));
    axios.post(this.url, formData).then((res) => {
      // this.props.handler(res);
    });
  };

  onAddHeadImg = (res) => {
    // console.log(res.data.Location);
    // console.log(res.data.Location);

    this.setState((prevState) => ({
      guideHead: {
        ...prevState.guideHead,
        image: res.data.Location,
      },
    }));

    console.log(this.state.guideHead);
  };

  render() {
    return (
      <div id="guideCreator">
        <div id="guideCreatorHead">
          <input
            type="text"
            className="guideCreatorHeadInput"
            placeholder="Title"
            onChange={(e) => {
              let title = e.target.value;
              this.setState((prevState) => ({
                guideHead: {
                  ...prevState.guideHead,
                  title: title,
                },
              }));
            }}
          ></input>
          <textarea
            type="text"
            className="guideCreatorHeadInput"
            placeholder="Description"
            onChange={(e) => {
              let description = e.target.value;
              this.setState((prevState) => ({
                guideHead: {
                  ...prevState.guideHead,
                  description: description,
                },
              }));
            }}
          ></textarea>
          <div className="guideCreatorHeadAddImage">
            <p>[Optional] Add Image</p>
            <p></p>
            <FileUpload handler={this.onAddHeadImg} />
          </div>
          <br />
          <br />
          <br />
          <button onClick={this.onSaveGuide}>Save</button>
        </div>
      </div>
    );
  }
}
export default CreateGuide;
