import React, { Component } from "react";
// import YouTube from "react-youtube";
const tools = require("../tools");

class GuidePreview extends Component {
  guide = this.props.guide;
  url = this.guide.video;
  videoThumbnail = (this.url ? ("https://img.youtube.com/vi/" + tools.getVidID(this.url) + "/0.jpg") : "");

    



  render() {
    return (
      <div className="guidePreview">
        {!this.guide.image && this.url && (
          <div className="guidePreviewImgBox">
            <img
              className="guidePreviewImg"
              src={this.videoThumbnail}
              alt={this.guide.title}
            ></img>
          </div>
        )}
        {this.guide.image && (
          <div className="guidePreviewImgBox">
            <img
              className="guidePreviewImg"
              src={this.guide.image}
              alt={this.guide.title}
            />
          </div>
        )}
        <div className="guidePreviewContent">
          <div className="guidePreviewTitle">{this.guide.title}</div>
          <div className="guidePreviewAuthor">{this.guide.author || "Anonymous"}</div>
          <div className="guidePreviewDesc">{this.guide.description}</div>
          <div className="guidePreviewScore"> 👍{this.guide.scoreUp || 0} / 👎{this.guide.scoreDown || 0}</div>
          {/* <YouTube videoId={tools.getVidID(this.url)}></YouTube> */}
        </div>
      </div>
    );
  }
}
export default GuidePreview;
