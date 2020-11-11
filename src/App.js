import "./App.scss";
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Guide from "./pages/Guide";
import CreateGuide from './pages/CreateGuide'
import LoginPage from './pages/LoginPage'

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
          <Link to="/createGuide">
            <div className="sidebarButton">Create Guide</div>
          </Link>
          <Link to="/login">
            <div className="sidebarButton">Login</div>
          </Link>
        </div>
        <div id="mainContainer">
          <Switch>
            {/* <Route
              path="/testUpload"
              render={(props) => <FileUpload {...props}></FileUpload>}
            ></Route> */}

            <Route
              path="/login"
              render={(props) => <LoginPage {...props}></LoginPage>}
            ></Route>
            <Route
              path="/createGuide"
              render={(props) => <CreateGuide {...props}></CreateGuide>}
            ></Route>
            <Route
              path="/guide"
              render={(props) => <Guide {...props}></Guide>}
            ></Route>

            <Route
              path="/"
              render={(props) => (
                <Home {...props} Hide={(e) => this.hide(e)}></Home>
              )}
            ></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
