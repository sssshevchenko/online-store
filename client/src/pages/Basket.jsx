import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Context } from '..';
import { getFromBasket } from '../http/basketApi';

const Basket = () => {
    const {user} = useContext(Context)
    const [devices, setDevices] = useState([])
    useEffect(() => {
        getFromBasket(user.user.id).then(data => setDevices(data))
    }, [])
    return (
        <div>
            {devices.map(device => 
                <div>{device.device.name}</div>    
            )}
        </div>
    );
};

export default Basket;