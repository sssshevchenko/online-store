import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Context } from '..';

const BrandBar = () => {
    const {device} = useContext(Context)

    return (
        <Form className='d-flex'>
            {device.brands.map(brand => 
                <Card
                    className='p-3 mt-2'
                    border={device.selectedBrand.id === brand.id ? 'danger' : 'gray'}
                    onClick={()  => device.setSelectedBrand(brand)}
                    key={brand.id}
                    style={{cursor: 'pointer'}}
                >
                    {brand.name}
                </Card>    
            )}
        </Form>
    );
};

export default observer(BrandBar);