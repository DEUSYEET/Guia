import React, { Component } from "react";
import { Link } from "react-router-dom";
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
