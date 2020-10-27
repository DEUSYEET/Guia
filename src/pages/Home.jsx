import React, { Component } from "react";
import GuidePreview from "../components/guidePreview";

// let url = "http://localhost:8080/getAll";
let url = "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getAll";

class Home extends Component {
  state = {
    guides: [],
  };

  getAll() {
    // console.log(url)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({
          guides: data,
        });
        console.log(this.state.guides);
      });
  }

  componentDidMount() {
    this.getAll();
  }

  render() {
    return (
      <div id="homePage">
        <div id="homeTitle">Featured Guides</div>
        <div id="homeGuideContainer">
          {this.state.guides.map((guide) => (
            <GuidePreview guide={guide} key={guide.guideID} />
          ))}
        </div>
      </div>
    );
  }
}
export default Home;
