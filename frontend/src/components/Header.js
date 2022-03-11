import React from 'react';
import {Badge, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/user/userActions";
import { useHistory } from 'react-router';
import Search from "./search/Search";
import logo from './logo.png'
import cart from './carts.png'
const Header = () => {
    const dispatch  =useDispatch();
    const history = useHistory()
    const {cartItems} =useSelector(state=>state.cart)

    const userLogin = useSelector((state) => state.userLogin);
    const {userData} = userLogin;

    const logoutHandler = () => {
       dispatch(logout());
    }
    return (
        <>
            <header>
                <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary p-2" expand="lg" collapseOnSelect style={{ height:'auto',padding:'inherit' }}>
                    <Container>
                        <LinkContainer to='/'>
                            <Navbar.Brand>
                                <img 
                                    alt=""
                                    src={logo}
                                    width="100px"
                                    className="d-inline-block align-top" />
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                           <div className="ms-auto">
                               <Search />
                           </div>
                            <Nav className="ms-auto">
                                <LinkContainer to='/cart'>

                                    <Nav.Link> <i class="fab fa-opencart" > </i><Badge style={{ backgroundColor:"green",borderRadius:"50%",position:"relative",top:"-20px",left:"-10px",width:"18px"}}> {cartItems.length}</Badge> </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/login'>

                                    {(userData && userData.name) ? (
                                        <>
                                            <NavDropdown  style={{ textTransform:"capitalize" }}
                                                id="nav-dropdown-dark-"
                                                title={`hello , ${userData.name}`}

                                            >
                                                <NavDropdown.Item onClick={()=>{ history.push('/profile')}}>
                                                   Profile
                                                </NavDropdown.Item>

                                                <NavDropdown.Item onClick={logoutHandler}>
                                                 Logout
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>):
                                        <Nav.Link> <i className='fas fa-user'></i> Sign in</Nav.Link>
                                        
                                    }
                                </LinkContainer>
                                {
                                    userData && userData.isAdmin &&(
                                        <NavDropdown
                                        id="nav-dropdown-dark"
                                        title='admin'           
                                    >
                                        <LinkContainer to='/admin/userslist'>
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        
                                        <LinkContainer to='/admin/products'>
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        
                                        <LinkContainer to='/admin/orders'>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                            
                                        </NavDropdown>
                                    )
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default Header;