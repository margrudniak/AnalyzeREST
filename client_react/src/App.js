import React, { Component } from "react";
import NavbarClass from "./components/Navbar";
import "./App.css";
//Components
import GetPost from "./components/GetPost";
import PostPost from "./components/PostPost";
import DeletePost from "./components/DeletePost";
import UpdatePost from "./components/UpdatePost";
import Home from "./components/Home";
//Router stuff
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Bootstrap stuff

class App extends Component {
  render() {
    return (
      <Router>
        <NavbarClass />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/getPost" component={GetPost} />
            <Route exact path="/postPost" component={PostPost} />
            <Route exact path="/deletePost" component={DeletePost} />
            <Route exact path="/updatePost" component={UpdatePost} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
