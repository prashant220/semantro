import React from "react";
import "../css/Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Sem from "../img/logo.png";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home" >
          <Link to="/">
          <img
            alt=""
            src={Sem}
            width="200"
            className="d-inline-block align-top"
          />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="justify-content-end">
            <Nav.Link 
              className="ml-auto"
    
              style={{ fontSize: "20px", marginRight: "10px",color:'white' }}
            >
                <Link to="/" style={{color:'white'}}>  <a>  Home</a> </Link>
         
            </Nav.Link>
            <Nav.Link
              eventKey={2}
              style={{ fontSize: "20px", marginRight: "10px",color:'white' ,}}
            >
                    <Link to="/about" style={{color:'white'}}>  <a>  About Us</a></Link>
            
            </Nav.Link>
            <Nav.Link
              eventKey={2}
              style={{ fontSize: "20px", marginRight: "10px",color:'white' }}
            >
              <Link to="/contact" style={{color:'white'}}> <a>Contact Us</a></Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
