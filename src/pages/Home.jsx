import React, { Component } from "react";
import { Link } from "react-router-dom";
import GuidePreview from "../components/guidePreview";

class Home extends Component {
  state = {
    guides: [],
  };

  url = "";

  componentDidMount() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      this.url = "http://localhost:8080/getAll";
    } else {
      this.url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getAll";
    }
    // console.log("Mounted")
    this.getAll();
  }

  getAll() {
    // console.log(url)
    fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          guides: data,
        });
        // console.log(this.state.guides);
      });
  }

  render() {
    return (
      <div id="homePage">
        <div id="homeTitle">Featured Guides</div>
        <div id="homeGuideContainer">
          {this.state.guides
            .sort((a, b) => {
              let aScore = a.scoreUp - a.scoreDown;
              let bScore = b.scoreUp - b.scoreDown;
              return bScore - aScore;
            })
            .map((guide) => (
              <Link to={"/guide?guideID=" + guide.guideID} key={guide.guideID}>
                <GuidePreview guide={guide} />
              </Link>
            ))}
        </div>
      </div>
    );
  }
}
export default Home;
