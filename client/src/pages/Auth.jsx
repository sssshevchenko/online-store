import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userApi';
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const Auth = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const isLogin = location.pathname === LOGIN_ROUTE
    const {user} = useContext(Context)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if(isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setIsAuth(true)
            user.setUser(data)

            navigate(SHOP_ROUTE)
        } catch(e) {
            alert(e.response.data.message)
        }   
    }

    return (
        <Container 
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card className='p-5' style={{width: 600}}>
                <h2 className='m-auto'>{isLogin ? 'Authorization' : 'Registration'}</h2>
                <Form className='d-flex flex-column'> 
                    <Form.Control 
                        className='mt-4' 
                        placeholder='Write your email...'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control 
                        className='mt-4'
                        placeholder='Write your password...'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Form className='d-flex justify-content-between align-items-center mt-3 pr-3 pl-3'>
                        {isLogin
                            ? <div>
                                Don't have an account? 
                                <NavLink to={REGISTRATION_ROUTE} style={{textDecoration: 'none', marginLeft: 5}}>
                                    Create!
                                </NavLink>
                            </div>
                            : <div>
                                Already have an account? 
                                <NavLink to={LOGIN_ROUTE} style={{textDecoration: 'none', marginLeft: 5}}>
                                    Log In!
                                </NavLink>
                            </div>
                        }
                        <Button
                            variant='outline-success' 
                            style={{width: 100}}
                            onClick={click}
                        >
                            {isLogin ? 'Log In' : 'Create'}
                        </Button>
                    </Form>
                </Form>
            </Card>
        </Container>
    );
};

export default observer(Auth);