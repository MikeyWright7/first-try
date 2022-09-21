import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, Alert, Container } from 'reactstrap';
import API from '../utils/API';
import { useDispatch } from 'react-redux';
import '../css/admin.css'


const Admin = () => {
    const dispatch = useDispatch();
    var [modal, toggle] = useState(false);
    var [name, nameChange] = useState('');
    var [description, descriptionChange] = useState('');
    var [price, priceChange] = useState('');
    var [image, imageChange] = useState('');
    var [category, categoryChange] = useState('');
    var [message, messageHandle] = useState(null)
    const createItem = () => {
        if (!name || !description || !price || !image || !category) {
            messageHandle('you must fill in all fields to create a new item.')
        } else {
            var item = { name, description, price, image, category };
            API.createStoreItem(item)
                .then(res => {
                    dispatch({
                        type: "UPDATE_STORE",
                        payload: res.data
                    })
                    API.loadStore()
                    .then(res => {
                        dispatch({
                            type:"LOAD_STORE",
                            payload: res.data
                        })
                    })
                })
                toggle(!modal)
        }
        
    }

    return (
        <div>
            
            <Container className="btn-position">
                
            <Button onClick={() => toggle(!modal)} href="#" color="danger" className="btn-position">ADMIN</Button>
            </Container>
            
            

            <Modal isOpen={modal} toggle={() => toggle(!modal)}>
                <ModalHeader toggle={() => toggle(!modal)}>Create new item</ModalHeader>
                <ModalBody>
                    {message !== null ? (
                        <Alert color="danger">{message}</Alert>
                    ) : ''}
                    <Input type="text" name="name" id="name" placeholder="Product Name" onChange={(e) => nameChange(e.target.value)} ></Input>
                    <Input type="text" name="description" id="description" placeholder="Product Description" onChange={(e) => descriptionChange(e.target.value)} ></Input>
                    <Input type="text" name="category" id="category" placeholder="Product Category" onChange={(e) => categoryChange(e.target.value)} ></Input>
                    <Input type="number" name="price" id="price" placeholder="Product Price" onChange={(e) => priceChange(e.target.value)} ></Input>
                    <Input type="text" name="image" id="image" placeholder="Product Image ** must start with /img/" onChange={(e) => imageChange(e.target.value)} ></Input>
                    <Button type="submit" color="success" style={{ margin: '20px' }} onClick={() => createItem()}>Create Item</Button>

                </ModalBody>
            </Modal>
        </div>
    )

}


export default Admin;