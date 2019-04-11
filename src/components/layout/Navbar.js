import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

const NavBar = () => {
  return (
    <Navbar dark className="mb-5">
        <NavbarBrand href="/">LyricsFinder</NavbarBrand>
    </Navbar>
  )
}

export default NavBar;
