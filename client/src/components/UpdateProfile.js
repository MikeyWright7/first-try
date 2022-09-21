import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Form, FormGroup, Alert, Button } from 'reactstrap';
import '../css/update.css'
import { useSelector, useDispatch } from 'react-redux';
import API from '../utils/API';
import DeleteProfile from './DeleteProfile';
import { UPDATE_PROFILE } from '../actions/types';



const UpdateProfile = (props) => {
    const dispatch = useDispatch();
    var isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    var userId = useSelector(state => state.auth.user.id);
    var [modal, toggle] = useState(false);
    var [msg, errMessage] = useState(null);
    var [newEmail, emailChange] = useState('');
    var [password, currentPassword] = useState('');
    var [newpassword, passwordChange] = useState('');
    var [newpassword2, password2Change] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            return errMessage('Login to access profile options')
        }
        else if (!newEmail && !password && !newpassword && !newpassword2) {
            return errMessage('Please choose something weirdo')
        }
        else if (newpassword !== newpassword2) {
            return errMessage('New password entries must match')
        }
        else {
            const user = {
                userId,
                newEmail,
                password,
                newpassword
            }
            API.updateProfile(user)
                .then(res => {
                    
                    dispatch({
                        type: UPDATE_PROFILE,
                        payload: res.data
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div>
            <Button color="primary" size="md" onClick={() => toggle(!modal)}>Update</Button>
            <Modal isOpen={modal} toggle={() => toggle(!modal)}>
                <ModalHeader toggle={() => toggle(!modal)}>
                    Update Profile</ModalHeader>
                <ModalBody className="update-modal">
                    {msg ? (<Alert color="danger">{msg}</Alert>) : null}
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <FormGroup>
                            <Input
                                type="email"
                                name="newEmail"
                                id="newEmail"
                                placeholder="New Email"
                                className="mb-3"
                                onChange={(e) => emailChange(e.target.value)}
                            />
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Current Password"
                                className="mb-3"
                                onChange={(e) => currentPassword(e.target.value)}
                            />
                            <Input
                                type="password"
                                name="newpassword"
                                id="newpassword"
                                placeholder="Enter New Password"

                                className="mb-3"
                                onChange={(e) => passwordChange(e.target.value)}
                            />
                            <Input
                                type="password"
                                name="newpassword2"
                                id="newpassword2"
                                placeholder="Verify Password"
                                className="mb-3"
                                onChange={(e) => password2Change(e.target.value)}
                            />
                            <Button className="mb-3" color="primary" size="md">
                                Update
                                </Button>
                        </FormGroup>
                    </Form>
                    <DeleteProfile />
                </ModalBody>
            </Modal>
        </div>
    )
}
export default UpdateProfile;