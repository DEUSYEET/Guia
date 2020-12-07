import React, { Component } from "react";
import FileUpload from "../components/fileUpload";
import axios from "axios";
import { v4 } from "uuid";
import { session } from "./Authentication";

class Section {
  constructor(
    id,
    sectionID = v4(),
    title = "",
    description = "",
    image = "",
    video = ""
  ) {
    this.guideID = id;
    this.sectionID = sectionID;
    this.title = title;
    this.description = description;
    this.image = image;
    this.video = video;
  }
}

class EditGuideSection extends Component {
  state = {
    guideSection: this.props.section.sectionID
      ? this.props.section
      : new Section(this.props.guideID),
    submitID: v4(),
    userToken: "",
  };

  url = "";
  deleteUrl = "";
  componentDidMount() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      this.url = "http://localhost:8080/uploadGuideSection";
      this.deleteUrl = "http://localhost:8080/deleteGuideSection";
    } else {
      this.url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/uploadGuideSection";
      this.deleteUrl =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/deleteGuideSection";
    }
    console.log(this.state.guideSection.sectionID);

    if (!this.props.section.sectionID) {
      this.props.unsaved();
    }
    session()
      .then((val) => {
        if (val) {
          let token = val.Session.idToken;
          this.setState({
            userToken: token,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  onSaveGuide = () => {
    if (this.state.guideSection.title) {
      let button = document.getElementById(this.state.submitID);
      button.innerHTML = "Saving...."
      // console.log(this.state.guideSection);
      let formData = new FormData();
      formData.append("file", JSON.stringify(this.state.guideSection));
      axios.post(this.url, formData).then((res) => {
        button.classList = "saveButton";
        button.innerHTML = "Saved";
      });
      this.props.saved();
    }
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
    this.props.unsaved();
  };

  onDeleteSection = () => {
    let formData = new FormData();
    formData.append(
      "file",
      JSON.stringify({
        guideID: this.state.guideSection.guideID,
        sectionID: this.state.guideSection._id,
        token: this.state.userToken.jwtToken,
      })
    );
    axios.post(this.deleteUrl, formData).then((res) => {this.props.saved()});
  };

  render() {
    return (
      <div className="guideCreatorSection">
        <div className="deleteSection" onClick={this.onDeleteSection}>
          ✖
        </div>
        <div className="guideSectionCreatorLabel">Add Section Title</div>
        <input
          type="text"
          className="guideCreatorSectionInput"
          placeholder="Section Title"
          value={this.state.guideSection.title}
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
            rows="10"
          value={this.state.guideSection.description || ""}
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
          {this.state.guideSection.image ? (
            <img
              className="guideCreatorSectionAddImagePreview"
              src={this.state.guideSection.image}
              width="100px"
              height="100px"
              alt="Preview"
            ></img>
          ) : (
            ""
          )}
          <FileUpload handler={this.onAddSectionImg} />

          <div className="guideSectionCreatorLabel">
            [Optional] Add Video (takes place of image)
          </div>
          <input
            type="text"
            className="guideCreatorSectionInput"
            placeholder="Youtube URL"
            value={this.state.guideSection.video || ""}
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
export default EditGuideSection;
