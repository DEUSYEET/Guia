import "./App.scss";
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Guide from "./pages/Guide";
import CreateGuide from "./pages/CreateGuide";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EditGuide from "./pages/EditGuide";
import { logout, session, getUsername } from "./components/Authentication";
import Board from "./pages/Board";
import Profile from "./pages/Profile";

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
          // console.log("USER",val);
          let { Value } = val.Attributes[2];
          getUsername(Value).then((data) => {
            // console.log(data);
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
                <div className="sidebarButton bold">Create Guide</div>
              </Link>
              <Link to="/board">
                <div className="sidebarButton bold">Community Board</div>
              </Link>
              <Link to="/profile">
                <div className="sidebarButton bold">Profile</div>
              </Link>
              <div className="sidebarButton signOutButton" onClick={logout}>
                Sign Out
              </div>
            </div>
          ) : (
            <div className="signInButtons">
              <Link to="/login">
                <div className="sidebarButton bold">Login</div>
              </Link>
              <Link to="/signup">
                <div className="sidebarButton bold">Sign Up</div>
              </Link>
            </div>
          )}
        </div>
        <div id="mainContainer">
          <Switch>
            {/* <Route
              path="/testUpload"
              render={(props) => <FileUpload {...props}></FileUpload>}
            ></Route> */}
            <Route
              path="/profile"
              render={(props) => <Profile {...props} />}
            ></Route>
            <Route
              path="/board"
              render={(props) => <Board {...props} />}
            ></Route>
            <Route
              path="/edit"
              render={(props) => <EditGuide {...props} />}
            ></Route>
            <Route
              path="/login"
              render={(props) => <LoginPage {...props}></LoginPage>}
            ></Route>
            <Route
              path="/signup"
              render={(props) => <SignUpPage {...props}></SignUpPage>}
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
