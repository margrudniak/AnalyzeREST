import React, { Component } from "react";
import { NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavbarClass extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/" component={Link} to="/">
          Analyze REST API
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <NavDropdown title="Posty" id="basic-nav-dropdown">
          <NavDropdown.Item href="/getPost">Get</NavDropdown.Item>
          <NavDropdown.Item href="/postPost">Post</NavDropdown.Item>
          <NavDropdown.Item href="/deletePost">Delete</NavDropdown.Item>
          <NavDropdown.Item href="/updatePost">Update</NavDropdown.Item>
        </NavDropdown>
        {/* <NavDropdown title="Pliki" id="basic-nav-dropdown">
          <NavDropdown.Item href="/getFile">Get</NavDropdown.Item>
          <NavDropdown.Item href="/postFile">Post</NavDropdown.Item>
          <NavDropdown.Item href="/deleteFile">Delete</NavDropdown.Item>
        </NavDropdown> */}
      </Navbar>
    );
  }
}

export default NavbarClass;
