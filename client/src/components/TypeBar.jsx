import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from '..';

const TypeBar = () => {
    const {device} = useContext(Context)

    return (
        <ListGroup className='mt-2'>
            {device.types.map(type => 
                <ListGroup.Item 
                    active={type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)}
                    style={{cursor: 'pointer'}}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>    
            )}
        </ListGroup>
    );
};

export default observer(TypeBar);