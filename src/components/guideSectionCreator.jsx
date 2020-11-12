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
  url = "http://localhost:8080/uploadGuideSection";
  //   url = "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/uploadGuideHead";

  state = {
    guideSection: new guideSection(this.props.guideID),
    submitID: v4(),
  };

  componentDidMount() {}

  onSaveGuide = () => {
    console.log(this.state.guideSection);
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

    console.log(this.state.guideSection);
  };

  onNotSaved = () => {
    let button = document.getElementById(this.state.submitID);
    button.classList = "unsavedButton";
    button.innerHTML = "Save Changes";
  };

  render() {
    return (
      <div className="guideCreatorSection">
        <div className="id">{this.props.guideID}</div>
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
          <p>[Optional] Add Image</p>
          <p></p>
          <FileUpload handler={this.onAddSectionImg} />
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
