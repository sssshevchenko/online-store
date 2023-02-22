import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import bigStar from '../assets/bigStar.png';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchDeviceById } from '../http/deviceApi';
import { addToBasket } from '../http/basketApi';
import { useContext } from 'react';
import {Context} from '..';

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {user} = useContext(Context)

    const {id} = useParams()

    useEffect(() => {
        try {
            fetchDeviceById(id).then(data => setDevice(data))
        } catch(e) {
            console.log(e.response.data.message)
        }
    }, [])

    const basketDevice = () => {
        try {
            addToBasket(user.user.id, Number(id)).then(data => console.log(data))
        } catch(e) {
            console.log(e.response.data.message)
        }
    }

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + '/' + device.img} />
                </Col>
                <Col md={4}>
                    <Form className='d-flex flex-column align-items-center'>
                        <h2>{device.name}</h2>
                        <div
                            className='d-flex justify-content-center align-items-center'
                            style={
                                {
                                    background: `url(${bigStar}) no-repeat center center`, 
                                    width: 240, 
                                    height: 240, 
                                    backgroundSize: 'cover', 
                                    fontSize: 54
                                }
                            }
                        >
                            {device.rating}
                        </div>
                    </Form>
                </Col>
                <Col md={4}>
                    <Card 
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid ightgray'}}
                    >
                        <div>От: {device.price} грн.</div>
                        <Button variant='outline-dark' onClick={basketDevice}>Add to Cart</Button>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-column mt-5'>
                <h2>Characteristics</h2>
                {device.info.map((d, index) => 
                    <Row key={d.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {d.title}: {d.description}
                    </Row>    
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;