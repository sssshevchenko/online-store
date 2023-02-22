import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { check } from './http/userApi';
import Spinner from 'react-bootstrap/Spinner';

const App = () => {
  const {user} = useContext(Context)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('token')) {
      check().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
      }).finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  if(isLoading) {
    return (
      <div 
        className='d-flex justify-content-center align-items-center'
        style={{height: '100vh'}}
      >
        <Spinner animation='grow' />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default observer(App);