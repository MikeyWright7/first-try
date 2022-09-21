import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Alert } from 'reactstrap';
import '../css/update.css'
import { useSelector, useDispatch } from 'react-redux';
import API from '../utils/API';
import { DELETE_PROFILE } from '../actions/types';

const DeleteProfile = (userId) => {
    const dispatch = useDispatch();
    var isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    var userId = useSelector(state=> state.auth.user.id);
    var [modal, toggle] = useState(false);
    var [msg, errMessage] = useState(null);
    

    const deleteProfile = () => {
        {isAuthenticated ? 
            API.deleteProfile(userId)
            .then(res => {
                if (res.data.status === 200){
                    dispatch({
                        type: DELETE_PROFILE
                        
                    })
                }
                
            })
            : errMessage(msg)
        }
        
    }

    return (
        <div>
            <Button onClick={() => toggle(!modal)} color="danger" size="md">Delete Profile</Button>
            <Modal isOpen={modal}>
                <ModalHeader toggle={() => toggle(!modal)}>
                    <Alert color="danger">Are You Sure You Want To Delete</Alert>
                    <Button color="success" size="md" onClick={() => {
                        deleteProfile();
                        
                    }}>Delete</Button>
                </ModalHeader>
                <ModalBody>
                    Click To Delete Profile. By doing so you agree to never come back again!
                </ModalBody>
            </Modal>
        </div>
    )
}
export default DeleteProfile;