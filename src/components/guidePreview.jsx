import React, { Component } from "react";
import { getVidID } from "../tools";


class GuidePreview extends Component {
  guide = this.props.guide;
  url = this.guide.video;
  videoThumbnail = (this.url ? ("https://img.youtube.com/vi/" + getVidID(this.url) + "/0.jpg") : "");

    



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
          <div className="guidePreviewScore"> <span role="img" aria-label="up">👍</span>{this.guide.scoreUp || 0} /<span role="img" aria-label="down"> 👎</span>{this.guide.scoreDown || 0}</div>
        </div>
      </div>
    );
  }
}
export default GuidePreview;
