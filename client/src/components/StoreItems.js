import React, { useEffect, useState } from 'react';
import { Container, Row, Card, CardHeader, CardImg, CardBody, CardTitle, CardText, CardFooter, Modal, ModalHeader, ModalBody, Button, ListGroup, ListGroupItem } from 'reactstrap';
import '../css/storeItems.css';
import { DELETE_ITEM } from '../actions/types';
import API from '../utils/API';
import Admin from './Admin'
import { useDispatch, useSelector } from 'react-redux';
import Welcome from './Welcome';


const StoreItems = () => {
    const dispatch = useDispatch();
    var [modal, toggle] = useState(false)
    var user = useSelector(state => state.auth.user)
    var isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    var store = useSelector(state => state.item.items);
    var cart = useSelector(state => state.cart.cart);
    console.log(store)
    
    useEffect(() => {
        API.loadSeed(store)
        .then(res => {
            dispatch({
                type: "SEED_ITEMS",
                payload: res.data
            })
        })
        .catch(err => console.log(err))
    }, [])    


    useEffect(() => {
        API.loadCart(user.id)
            .then(res => {
                dispatch({
                    type: "UPDATE_CART",
                    payload: res.data.cart
                })
            })
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        API.loadStore()
            .then(res => {
                dispatch({
                    type: "LOAD_STORE",
                    payload: res.data
                })
            })
    }, [dispatch])



    const addItem = (itemId) => {
        API.addToCart(user.id, itemId)
            .then(res => {
                dispatch({
                    type: "ADD_CART",
                    payload: res.data.cart
                });
                dispatch({
                    type: "UPDATE_CART",
                    payload: res.data.cart
                })
            });
    };

    const removeItem = (itemId) => {

        API.removeCartItem(user.id, itemId)
            .then(res => {
                if (res.data.status === 200) {
                    API.loadCart(user.id)
                        .then(res => {
                            dispatch({
                                type: "UPDATE_CART",
                                payload: res.data.cart
                            })
                        })
                        .catch(err => console.log(err))
                }
            });
    };

    const deleteItem = (itemId) => {

        API.deleteStoreItem(itemId)
            .then(res => {
                if (res.data.status === 200) {
                    dispatch({
                        type: DELETE_ITEM,
                        payload: res.data
                    })
                    API.loadStore()
                        .then(res => {
                            dispatch({
                                type: "LOAD_STORE",
                                payload: res.data
                            })
                        })
                }


            })
    }
    const purchaseItems = (userId) => {
        
        API.purchaseItems(userId)
            .then(res => {
                dispatch({
                    type: "PURCHASED",
                    payload: res.data.cart
                })
                if (res.data.status === 200) {
                    API.loadCart(user.id)
                        .then(res => {
                            dispatch({
                                type: "UPDATE_CART",
                                payload: res.data.cart
                            })
                        })
                        .catch(err => console.log(err))
                } else {
                    alert('There was an error with your purchase');
                }
            })
            .catch(err => console.log(err))
        toggle(!modal)
    }


    if(isAuthenticated){

    
     return (

        <div className="store_container container-fluid">
            <div>{isAuthenticated && user.admin ? <Admin /> : ''}</div>

            <Button color="success" size="md" onClick={() => toggle(!modal)} ><i className="fas fa-shopping-cart fa-5x shop-cart"></i></Button>

            <Container className="container-fluid">
                <Row className="col-md-12">
                     
                    {store.length > 0 ? store.map((item, i) => {
                        return <Card className="store-item" key={i}>
                            <CardHeader>
                                <CardTitle>{item.category}</CardTitle>
                                <CardImg src={item.image} className="img-size" />
                            </CardHeader>
                            <CardBody>
                                <CardText className="input-bg">{item.name}</CardText>
                                <CardText className="input-bg">{item.description}</CardText>
                                <CardText className="input-bg">${item.price}</CardText>
                            </CardBody>
                            <CardFooter>
                                {isAuthenticated && user.admin ? <Button className="delete-item" color="danger" size="md" onClick={() => deleteItem(item._id)}>Delete</Button> : ''}
                                {isAuthenticated ? <Button
                                    className="addItem-btn"
                                    size="md"
                                    onClick={(_id) => addItem(item._id)}
                                >+</Button> : null}
                                {isAuthenticated ? <Button
                                    color="danger"
                                    size="md"
                                    onClick={(_id) => removeItem(item._id)}
                                >&minus;</Button> : null}
                            </CardFooter>
                        </Card>
                        
                    }): null}
                    </Row>
                    </Container>
            <Modal isOpen={modal} toggle={() => toggle(!modal)}>
                <ModalHeader toggle={() => toggle(!modal)}>Your Cart Items</ModalHeader>
                <ModalBody>
                    <ListGroup>

                        {cart > 0 ? (cart.map((item, i) => {
                            return (<ListGroupItem key={i}>{item.name}</ListGroupItem>)
                        })) : (null)}
                    </ListGroup>
                    <Button color="success" size="md" onClick={() => purchaseItems(user.id)}>Purchase</Button>
                </ModalBody>
            </Modal>
        </div>
    )
} else {
        return (
            <div>
                <Welcome />
            </div>
        )
    }

}

export default StoreItems;