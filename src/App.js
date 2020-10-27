import "./App.scss";
import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

class App extends Component {
  state = {
    test: true,
  };

  hide(e) {
    this.setState({
      homeLinks: true,
    });
  }

  // //RESET STATE ON BACK
  // //or on load ... i think?
  // componentDidMount(){
  //   window.onpopstate = () =>{
  //     this.setState({
  //       test:true
  //     })
  //   }
  // }

  render() {
    return (
      <div id="container">
        <div id="mainSidebar">
          <Link to="/">
            <img src="./assets/GuiaLogo1.svg" alt="Logo" id="mainLogo"></img>
          </Link>
        </div>
        <div id="mainContainer">
          <Route
            path="/"
            render={(props) => (
              <Home {...props} Hide={(e) => this.hide(e)}></Home>
            )}
          ></Route>
        </div>
      </div>
    );
  }
}

export default App;
