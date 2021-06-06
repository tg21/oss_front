import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { AuthState } from '../../state/auth/authTypes';
import { stateType } from '../../state/store';

export const ShopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  let { path, url } = useRouteMatch();
  const authState:AuthState = useSelector((state:stateType) => state.auth);
  // console.warn(authState);
  // console.log(path,url);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="bg-light p-3">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">OSS</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
            <Link className="nav-link" to={`${url}/Display`}>Display</Link>
            </NavItem>
            <NavItem>
            <Link className="nav-link" to={`${url}/Inventory`}>Inventory</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>{authState.first_name.toUpperCase() + " " + authState.last_name.toUpperCase()}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}
