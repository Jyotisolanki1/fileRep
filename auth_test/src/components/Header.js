import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../apis/authApis';
import { logoutUser } from '../slices/userSlice';


function Header() {

    const {userInfo} = useSelector(state=>state.user);
    const [logout] = useLogoutMutation();
    const  dispatch = useDispatch()
    
    const handleLogout =async()=>{
      try {
        await logout();
        await dispatch(logoutUser());

      } catch (error) {
        
      }

    }
      
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">User-auth</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">            
            {userInfo?(
              <>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>logout</NavDropdown.Item>            
            </NavDropdown>
            </>):(
              <>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </>
            )}
              
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;