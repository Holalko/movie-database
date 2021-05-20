import React, { FC } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface ApplicationOverlayProps {}

const ApplicationOverlay: FC<ApplicationOverlayProps> = ({ children }) => {
  return (
    <>
      <Navbar bg="dark" variant={"dark"} expand="lg">
        <Navbar.Brand href="#home">Movie database</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <NavLink to={"/movies"}>Movies</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to={"/movies/favourites"}>Favourites</NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <section className={"bg-light vh-100 py-5"}>{children}</section>
    </>
  );
};

export default ApplicationOverlay;
