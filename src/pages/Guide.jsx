import React, { Component } from "react";
import YouTube from "react-youtube";
import DeleteButton from '../components/deleteButton'
const tools = require("../tools");

class Guide extends Component {
  id = new URLSearchParams(this.props.location.search).get("guideID");

  // url = "http://localhost:8080/getGuide?guideId=" + this.id;
  url =
    "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getGuide?guideId=" +
    this.id;

  state = {
    guideHead: {},
    guideSections: [],
  };


  getSections() {
    console.log(this.url);
    fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          guideHead: data[0],
          guideSections: data[1],
        });
        console.log(this.state);
      });
  }

  componentDidMount() {
    this.getSections();
    console.log(this.props.history)
  }



  render() {
    return (
      <div id="guide">
        <div id="guideHead">
          <div id="guideTile">{this.state.guideHead.title}</div>

          {!this.state.guideHead.image && this.state.guideHead.video && (
            <YouTube
              id="guideHeadVideo"
              videoId={tools.getVidID(this.state.guideHead.video)}
            ></YouTube>
          )}
          {this.state.guideHead.image && (
            <img
              id="guideHeadImg"
              src={this.state.guideHead.image}
              alt={this.state.guideHead.title}
            />
          )}

          <div id="guideHeadDesc">{this.state.guideHead.description}</div>
        </div>

        <div id="guideSectionContainer">
          {this.state.guideSections.map((section) => (
            <div className="guideSection" key={section._id}>
              <div className="guideSectionTile">{section.title}</div>

              {!section.image && section.video && (
                <YouTube
                  className="guideSectionVideo"
                  videoId={tools.getVidID(section.video)}
                ></YouTube>
              )}
              {section.image && (
                <img
                  className="guideSectionImg"
                  src={section.image}
                  alt={section.title}
                />
              )}

              <div className="guideSectionDesc">{section.description}</div>
            </div>
          ))}
        </div>
      <DeleteButton id={this.id}/>
      </div>
    );
  }
}



export default Guide;
