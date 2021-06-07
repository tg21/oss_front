import { Console } from 'console';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
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
  const authState: AuthState = useSelector((state: stateType) => state.auth);
  // console.warn(authState);
  const history = useHistory();
  if (authState.role == undefined || authState.role == null || authState.role == "") {
    history.replace('/auth');
  }
  // console.log(path,url);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="bg-warning p-3">
      <Navbar color="waring text-dark font-wight-bold" light expand="md">
        <Link className="ms-2 navbar-brand" to="/home"><h3>OSS</h3></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="w-100" navbar>
            {authState.role == 'seller' && <NavItem>
            <Link className="nav-link me-auto" to={`${url}/store`}>Store</Link>
            </NavItem>}
            <UncontrolledDropdown className='ms-auto' nav inNavbar>
              <DropdownToggle nav caret>
              {authState.first_name?.toUpperCase() + " " + authState.last_name?.toUpperCase()}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  My Orders
                </DropdownItem>
                <DropdownItem>
                  My Cart
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={()=>alert('bye')}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
