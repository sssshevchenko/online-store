import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';

const NavBar = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
    }

    const adminRole = () => {
        if(user.user.role === 'ADMIN') {
            navigate(ADMIN_ROUTE)
        } else {
            alert('Access denied')
        }
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink style={{color: 'white', textDecoration: 'none'}} to={SHOP_ROUTE}>OnlineStore</NavLink>
                    {user.isAuth 
                        ? <Nav className="ml-auto" >
                        <Button onClick={() => navigate(BASKET_ROUTE)}>Basket</Button>
                        <Button 
                            variant='outline-light'
                            onClick={() => adminRole()}
                        >
                            Admin
                        </Button>
                        <Button 
                            variant='outline-light' 
                            style={{marginLeft: '10px'}}
                            onClick={logout}
                        >
                            Logout
                        </Button>
                        </Nav>

                        : <Nav className="ml-auto" >
                        <Button 
                            variant='outline-light'
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Authorization
                        </Button>
                        </Nav>
                        }
                </Container>
            </Navbar>
        </>
    );
};

export default observer(NavBar);