import "./App.scss";
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Guide from "./pages/Guide";
import CreateGuide from "./pages/CreateGuide";
import LoginPage from "./pages/LoginPage";
import { logout, session, getUsername } from "./components/Authentication";

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

class App extends Component {
  state = {
    user: false,
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

  componentDidMount() {
    session()
      .then((val) => {
        if (val) {
          console.log("USER",val);
          let {Value} = val.Attributes[2];
          getUsername(Value).then(data=>{
            console.log(data);
          });
          this.setState({
            user: true,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div id="container">
        <div id="mainSidebar">
          <Link to="/">
            <img src="./assets/GuiaLogo1.svg" alt="Logo" id="mainLogo"></img>
          </Link>
          {this.state.user ? (
            <div className="signedInButtons">
              <Link to="/createGuide">
                <div className="sidebarButton">Create Guide</div>
              </Link>
              <div className="sidebarButton" onClick={logout}>
                Sign Out
              </div>
            </div>
          ) : (
            <Link to="/login">
              <div className="sidebarButton">Login</div>
            </Link>
          )}
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
