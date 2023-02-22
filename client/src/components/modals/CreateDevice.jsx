import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { useContext } from 'react';
import { Context } from '../..';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceApi';
import { observer } from 'mobx-react-lite';

const CreateDevice = ({show, onHide}) => {
    const {device} = useContext(Context)

    const [info, setInfo] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices().then(data => device.setDevices(data.rows))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const selectedFile = e => {
        setFile(e.target.files[0])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        
        createDevice(formData).then(() => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mb-3'>
                        <Dropdown.Toggle variant='outline-dark'>{device.selectedType.name || 'Choose Type'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type => 
                                <Dropdown.Item 
                                    key={type.id}
                                    onClick={() => device.setSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>    
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mb-3'>
                        <Dropdown.Toggle variant='outline-dark'>{device.selectedBrand.name || 'Choose Brand'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand => 
                                <Dropdown.Item 
                                    key={brand.id}
                                    onClick={() => device.setSelectedBrand(brand)}
                                >
                                    {brand.name}
                                </Dropdown.Item>    
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control 
                        placeholder='Write device name...'
                        className='mt-3'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control 
                        placeholder='Write device price...'
                        className='mt-3'
                        type='number'
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                    <Form.Control 
                        className='mt-3'
                        type='file'
                        onChange={selectedFile}
                    />
                    <hr />
                    <Button variant='outline-dark' onClick={addInfo}>
                        Add Info
                    </Button>
                    {info.map(i => 
                        <Row className='mt-4' key={i.number}>
                            <Col md={4}>
                                <Form.Control 
                                    placeholder='Write name of characteristic...'
                                    value={i.title}
                                    onChange={e => changeInfo('title', e.target.value, i.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control 
                                    placeholder='Write description of characteristic...'
                                    value={i.description}
                                    onChange={e => changeInfo('description', e.target.value, i.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Button variant='outline-danger' onClick={() => removeInfo(i.number)}>Delete</Button>
                            </Col>
                        </Row>     
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Close</Button>
                <Button variant='outline-success' onClick={addDevice}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default observer(CreateDevice);