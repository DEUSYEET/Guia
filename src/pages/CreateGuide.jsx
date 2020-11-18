import { v4 } from "uuid";
import React, { Component } from "react";
import FileUpload from "../components/fileUpload";
import CreateGuideSection from "../components/guideSectionCreator";
import axios from "axios";
import { session, getUsername } from "../components/Authentication";

let user = "";
session()
  .then((val) => {
    if (val) {
      let { Value } = val.Attributes[2];
      getUsername(Value).then((data) => {
        user = data;
      });
    }
  })
  .catch((err) => console.log(err));

class guideHead {
  constructor() {
    this.guideID = v4();
    this.author = user;
    this.title = "";
    this.description = "";
    this.image = "";
    this.video = "";
    this.scoreUp = 0;
    this.scoreDown = 0;
  }
}

class CreateGuide extends Component {
  state = {
    guideHead: new guideHead(),
    guideSections: [],
  };

  url = "";
  componentDidMount() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      this.url = "http://localhost:8080/uploadGuideHead";
    } else {
      this.url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/uploadGuideHead";
    }
    // console.log(this.url)
  }

  onSaveGuide = () => {
    console.log(this.state.guideHead);
    let formData = new FormData();
    formData.append("file", JSON.stringify(this.state.guideHead));
    axios.post(this.url, formData).then((res) => {
      let button = document.getElementById("saveHeadButton");
      button.classList = "saveButton";
      button.innerHTML = "Section Saved";
    });
  };

  onAddHeadImg = (res) => {
    this.setState((prevState) => ({
      guideHead: {
        ...prevState.guideHead,
        image: res.data.Location,
      },
    }));

    console.log(this.state.guideHead);
  };

  onNotSaved = () => {
    let button = document.getElementById("saveHeadButton");
    button.classList = "unsavedButton";
    button.innerHTML = "Save Changes";
  };

  sectionIndex = 0;
  addSection = () => {
    this.setState((prevState) => ({
      guideHead: {
        ...prevState.guideHead,
      },
      guideSections: [
        ...prevState.guideSections,
        { key: this.sectionIndex, guideID: this.state.guideHead.guideID },
      ],
    }));
    this.sectionIndex++;
  };

  render() {
    return (
      <div id="guideCreator">
        {/* <div className="id">{this.state.guideHead.guideID}</div> */}
        <div id="guideCreatorHead">
          <div className="guideCreatorLabel">Add Title</div>
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
              this.onNotSaved();
            }}
          ></input>
          <div className="guideCreatorLabel">Add Description</div>
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
              this.onNotSaved();
            }}
          ></textarea>
          <div className="guideCreatorHeadAddImage">
            <div className="guideCreatorLabel">[Optional] Add Image</div>
            <FileUpload handler={this.onAddHeadImg} />
            <div className="guideCreatorLabel">[Optional] Add Video (takes place of image)</div>
          <input
            type="text"
            className="guideCreatorHeadInput"
            placeholder="Youtube URL"
            onChange={(e) => {
              let url = e.target.value;
              this.setState((prevState) => ({
                guideHead: {
                  ...prevState.guideHead,
                  video: url,
                },
              }));
              this.onNotSaved();
            }}
          ></input>
          </div>
          <div
            className="saveButton"
            id="saveHeadButton"
            onClick={this.onSaveGuide}
          >
            Section Saved
          </div>
        </div>
        <div className="guideCreatorSections">
          {this.state.guideSections.map((section) => (
            <CreateGuideSection key={section.key} guideID={section.guideID} />
          ))}
        </div>
        <div className="addSectionButton" onClick={this.addSection}>
          Add Section
        </div>
      </div>
    );
  }
}
export default CreateGuide;
