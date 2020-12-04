import React, { Component } from "react";
import YouTube from "react-youtube";
import DeleteButton from "../components/deleteButton";
import VoteButtons from "../components/voteButtons";
import CommentBox from "../components/CommentBox";
import { session, getUserDataFromEmail } from "../components/Authentication";
import { Link } from "react-router-dom";
import ProfilePic from "../components/ProfilePic";
import { getVidID } from "../tools";


class Guide extends Component {
  id = new URLSearchParams(this.props.location.search).get("guideID");
  url = "";

  state = {
    guideHead: {},
    guideSections: [],
    user: false,
    username: "",
    image:"",
    userToken: "",
  };



  getSections() {
    // console.log(this.url);
    fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          guideHead: data[0],
          guideSections: data[1],
        });
        // console.log(this.state);
      });
  }

  componentDidMount() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      this.url = "http://localhost:8080/getGuide?guideId=" + this.id;
    } else {
      this.url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getGuide?guideId=" +
        this.id;
    }
    // console.log(this.url)
    // console.log(this.props.history)
    this.getSections();
    session()
      .then((val) => {
        if (val) {
          let { Value } = val.Attributes[2];
          let  token  = val.Session.idToken;
          getUserDataFromEmail(Value).then((data) => {
            this.setState({
              username: data.username,
              user: true,
              image:data.image,
              userToken: token,
            });
            // console.log(this.state.username);
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div id="guide">
        <div id="guideHead">
          {this.state.user &&
          this.state.username === this.state.guideHead.author ? (
            <div className="selfButtons">
              <Link to={"/edit?guideID=" + this.id}>
                <div className="editButton">Edit Guide</div>
              </Link>
              
              <DeleteButton id={this.id} token={this.state.userToken} />
            </div>
          ) : (
            ""
          )}
          <div id="guideTitle">{this.state.guideHead.title}</div>
          <div id="guideAuthor">
            <ProfilePic username={this.state.guideHead.author} test={true} key={this.state.guideHead.author} />
          </div>
          {this.state.user ? (
            <VoteButtons
              guide={this.state.guideHead}
              user={this.state.username}
            />
          ) : (
            <div className="guideVoteButtons">
              <div>
                <span role="img" aria-label="up" className="up">
                  👍
                  {this.state.guideHead.scoreUp || 0}
                </span>
              </div>
              <div>
                <span role="img" aria-label="down" className="down">
                  👎
                  {this.state.guideHead.scoreDown || 0}
                </span>
              </div>
            </div>
          )}

          {!this.state.guideHead.image && this.state.guideHead.video && (
            <YouTube
              id="guideHeadVideo"
              videoId={getVidID(this.state.guideHead.video)}
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
              <div className="guideSectionTitle">{section.title}</div>

              {!section.image && section.video && (
                <YouTube
                  className="guideSectionVideo"
                  videoId={getVidID(section.video)}
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
        <CommentBox
          parentID={this.id}
          user={this.state.user}
          username={this.state.username}
          hide={false}
          submit={false}
          prompt="Leave a comment"
        />
      </div>
    );
  }
}

export default Guide;
