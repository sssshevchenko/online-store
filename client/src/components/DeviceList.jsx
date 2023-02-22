import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { Context } from '..';
import Row from 'react-bootstrap/Row';
import DeviceItem from './DeviceItem';

const DeviceList = () => {
    const {device} = useContext(Context)

    return (
        <Row className='d-flex'>
            {device.devices.map(device => 
                <DeviceItem device={device} key={device.id} />
            )}
        </Row>
    );
};

export default observer(DeviceList);