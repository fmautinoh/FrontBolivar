import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/ControlWeb">Pasteleria Bolivar</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/ControlWeb/FormClients">
            Clientes
          </Nav.Link>
          <NavDropdown title="Producto" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/ControlWeb/ProductForm">
              Registrar Producto
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="">
              Añadir Stock
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
