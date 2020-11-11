import { v4 } from "uuid";
import React, { Component } from "react";
import FileUpload from "../components/fileUpload";
import CreateGuideSection from "../components/guideSectionCreator";
import axios from "axios";

class guideHead {
  constructor() {
    this.guideID = v4();
    this.author = "";
    this.title = "";
    this.description = "";
    this.image = "";
    this.video = "";
    this.scoreUp = 0;
    this.scoreDown = 0;
  }
}

class CreateGuide extends Component {
    url = "http://localhost:8080/uploadGuideHead";
  // url = "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/uploadGuideHead";

  state = {
    guideHead: new guideHead(),
    guideSections: [],
  };

  onSaveGuide = () => {
    console.log(this.state.guideHead);
    let formData = new FormData();
    formData.append("file", JSON.stringify(this.state.guideHead));
    axios.post(this.url, formData).then((res) => {
      let button = document.getElementById('saveHeadButton');
      button.classList = "saveButton";
      button.innerHTML = "Saved"
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

  onNotSaved = () =>{
    let button = document.getElementById('saveHeadButton');
    button.classList = "unsavedButton";
    button.innerHTML = "Save Changes"
  }


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
        <div className="id">{this.state.guideHead.guideID}</div>
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
              this.onNotSaved();
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
              this.onNotSaved();
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
        <div className="saveButton" id="saveHeadButton" onClick={this.onSaveGuide}>Saved</div>

        </div>
        <div className="guideCreatorSections">
          {this.state.guideSections.map((section) => (
            <CreateGuideSection key={section.key} guideID={section.guideID} />
          ))}
        </div>
        <button onClick={this.addSection}>Add Section</button>
      </div>
    );
  }
}
export default CreateGuide;
