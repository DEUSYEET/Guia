import "./App.scss";
import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";
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
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      username: "",
      searchValue: "",
    };
    this.onSearch = this.onSearch.bind(this);
  }
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
            this.setState({
              username: data,
            });
          });
          this.setState({
            user: true,
          });
        }
      })
      .catch((err) => console.log(err));

    // console.log(this.props.location);
  }

  onSearch(e) {
    this.setState(
      {
        searchValue: e.target.value,
      },
      () => {
        // console.log("App       ----->",this.state.searchValue);
      }
    );
  }
  render() {
    return (
      <div id="container">
        <div id="mainSidebar">
          <Link to="/">
            <img src="./assets/GuiaLogo1.svg" alt="Logo" id="mainLogo"></img>
          </Link>
          {/* <div> */}
          {this.props.location.pathname === "/" 
          //|| this.props.location.pathname === "/board"
          ? (
            <input
              id="searchBar"
              type="text"
              onChange={this.onSearch}
              placeholder="Search"
            ></input>
          ) : (
            ""
          )}
          {/* </div> */}
          {this.state.user ? (
            <div className="signedInButtons">
              <Link to="/createGuide">
                <div className="sidebarButton bold">Create Guide</div>
              </Link>
              <Link to="/board">
                <div className="sidebarButton bold">Community Board</div>
              </Link>
              <Link to={"/profile?user=" + this.state.username}>
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
              path="/board"
              render={(props) => (
                <Board {...props} searchValue={this.state.searchValue}/>
              )}
            ></Route>

            <Route
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  searchValue={this.state.searchValue}
                  Hide={(e) => this.hide(e)}
                ></Home>
              )}
            ></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
