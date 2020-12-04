import React, { Component } from "react";
import FileUpload from "../components/fileUpload";
import axios from "axios";
import { v4 } from "uuid";

class guideSection {
  constructor(id) {
    this.guideID = id;
    this.sectionID = v4();
    this.title = null;
    this.description = null;
    this.image = null;
    this.video = null;
  }
}

class CreateGuideSection extends Component {
  url = "";
  componentDidMount() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      this.url = "http://localhost:8080/uploadGuideSection";
    } else {
      this.url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/uploadGuideSection";
    }
  }
  state = {
    guideSection: new guideSection(this.props.guideID),
    submitID: v4(),
  };

  onSaveGuide = () => {
    // console.log(this.state.guideSection);
    let formData = new FormData();
    formData.append("file", JSON.stringify(this.state.guideSection));
    axios.post(this.url, formData).then((res) => {
      let button = document.getElementById(this.state.submitID);
      button.classList = "saveButton";
      button.innerHTML = "Saved";
    });
  };

  onAddSectionImg = (res) => {
    this.setState((prevState) => ({
      guideSection: {
        ...prevState.guideSection,
        image: res.data.Location,
      },
    }));

    // console.log(this.state.guideSection);
  };

  onNotSaved = () => {
    let button = document.getElementById(this.state.submitID);
    button.classList = "unsavedButton";
    button.innerHTML = "Save Changes";
  };

  render() {
    return (
      <div className="guideCreatorSection">
        <div className="guideSectionCreatorLabel">Add Section Title</div>
        <input
          type="text"
          className="guideCreatorSectionInput"
          placeholder="Section Title"
          onChange={(e) => {
            let title = e.target.value;
            this.setState((prevState) => ({
              guideSection: {
                ...prevState.guideSection,
                title: title,
              },
            }));
            this.onNotSaved();
          }}
        ></input>
        <div className="guideSectionCreatorLabel">Add Section Description</div>
        <textarea
          type="text"
          className="guideCreatorSectionInput"
          placeholder="Description"
          onChange={(e) => {
            let description = e.target.value;
            this.setState((prevState) => ({
              guideSection: {
                ...prevState.guideSection,
                description: description,
              },
            }));
            this.onNotSaved();
          }}
        ></textarea>
        <div className="guideCreatorSectionAddImage">
          <div className="guideSectionCreatorLabel">[Optional] Add Image</div>
          {this.state.guideSection.image ? <img
              className="guideCreatorSectionAddImagePreview"
              src={this.state.guideSection.image}
              width="100px"
              height="100px"
              alt="Preview"
            ></img> : ""}
          <FileUpload handler={this.onAddSectionImg} />

          <div className="guideSectionCreatorLabel">[Optional] Add Video (takes place of image)</div>
          <input
            type="text"
            className="guideCreatorSectionInput"
            placeholder="Youtube URL"
            onChange={(e) => {
              let url = e.target.value;
              this.setState((prevState) => ({
                guideSection: {
                  ...prevState.guideSection,
                  video: url,
                },
              }));
              this.onNotSaved();
            }}
          ></input>

        </div>
        <div
          className="saveButton"
          id={this.state.submitID}
          onClick={this.onSaveGuide}
        >
          Section Saved
        </div>
      </div>
    );
  }
}
export default CreateGuideSection;
