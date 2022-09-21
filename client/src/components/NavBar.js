import React, { Fragment, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import '../css/navbar.css';
import RegisterUser from './RegisterUserModal';
import LoginUser from './LoginUser';
import Logout from './Logout'
import { useDispatch, useSelector } from 'react-redux'
import API from '../utils/API';

const NavBar = () => {
    var [modal, toggle] = useState(false);
    var auth = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const loadStore = () => {
        API.loadStore()
            .then(res => {
                dispatch({
                    type: "STORE"
                })
            })
    }

    const loadDashboard = () => {
        dispatch({
            type: "DASHBOARD"
        })
    }

    const loadContact = () => {
        dispatch({
            type: "COMPANY_CONTACT"
        })
    }

    const loadAbout = () => {
        dispatch({
            type: "COMPANY_MISSION"
        })
    }



    const { isAuthenticated, user } = auth;


   

    const authLinks = (
        <Fragment>
            <NavItem className="nav-links">
                <span className="name-display">{user ? `Welcome ${user.name}` : ''}</span>
            </NavItem>
            <NavItem className="nav-box">
                <NavLink href="#" onClick={() => loadDashboard()} className="nav-links">Profile</NavLink>
            </NavItem>
            <NavItem className="nav-box">
                <NavLink href="#" onClick={() => loadStore()} className="nav-links">Store</NavLink>
            </NavItem>
            <NavItem className="nav-box">
                <NavLink href="#" onClick={() => loadAbout()} className="nav-links">About Us</NavLink>
            </NavItem>
            <NavItem className="nav-box">
                <NavLink href="#" onClick={() => loadContact()} className="nav-links">Contact Us</NavLink>
            </NavItem>
            <NavItem className="nav-links">
                <Logout />
            </NavItem>
        </Fragment>
    );



    const guestLinks = (
        <Fragment>
            <NavItem className="nav-links">
                <RegisterUser />
            </NavItem>
            <NavItem className="nav-links">
                <LoginUser />
            </NavItem>
        </Fragment>
    );

    return (
        <div>
            <Navbar className="col-md-12" color="dark" dark expand="md">


                <NavbarBrand>
                    <h2 className="biz-name">Time Well Wasted</h2>
                    <img src="/img/clock_logo.jpg" alt="Logo" className="nav-img img-fluid" />
                </NavbarBrand>
                <NavbarToggler onClick={() => toggle(!modal)} />
                <Collapse isOpen={modal} navbar>
                    <Nav className="ml-auto" navbar>
                        {isAuthenticated ? authLinks : guestLinks}
                        
                    </Nav>
                </Collapse>


            </Navbar>
        </div>
    )

};




export default NavBar;