import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Context } from '..';
import { adminRoutes, authRoutes, publicRoutes } from '../routes';
import {SHOP_ROUTE} from '../utils/consts';

const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, element}) => 
                <Route path={path} element={element} key={path} />      
            )}
            {user.user.role === 'ADMIN' && adminRoutes.map(({path, element}) => 
                <Route path={path} element={element} key={path} />
            )}
            {publicRoutes.map(({path, element}) => 
                <Route path={path} element={element} key={path} />      
            )}
            <Route path='*' element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>
    );
};

export default observer(AppRouter);