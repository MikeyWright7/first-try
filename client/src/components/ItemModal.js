import React, {Component, useReducer} from 'react';
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, Alert } from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
import PropTypes from 'prop-types';


class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });

    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            name: this.state.name
        }

        this.props.addItem(newProduct);
        this.toggle();
    }
    onDeleteItem = (e) => {
        e.preventDefault();

        const item = {
            name: this.state.name
        }
        this.props.deleteItem(item)
    }
    render() {
        const {isAuthenticated, user} = this.props;
        return(
            <div>
                {isAuthenticated && user.admin ? <Button color="primary" style={{margin: "20px"}} onClick={this.toggle}>
                    Add Item
                </Button> : <h3 className="mb-3 ml-4">You Must Have Adminstative Privledges To Use This Function</h3>}

                
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Add To Shopping List
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <Input onChange={this.onChange}></Input>
                            <Button></Button>
                        </Form>
                    </ModalBody>
                </Modal>

                
            </div>
        )
    }
}

