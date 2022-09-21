import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Input, Form, Alert, NavLink } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../actions/authActions';
import {clearErrors} from '../actions/errorActions';


class LoginUser extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const {error, isAuthenticated} = this.props;
        if(error !== prevProps.error) {
            if(error.id === 'LOGIN_FAIL') {
                this.setState({msg: error.msg.msg});
            }else {
                this.setState({msg: null});
            }
        }
        if(this.state.modal){
            if(isAuthenticated){
                this.toggle();
            }
        }
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });

    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onSubmit = (e) => {
       e.preventDefault();

       const {email, password} = this.state;

       const user = {
           email,
           password
       }

       this.props.login(user);
       
    }
    render() {
        var {modal, msg} = this.state;
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">Login</NavLink>
                <Modal isOpen={modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login Here</ModalHeader>
                    <ModalBody>
        {msg ? <Alert color="danger">{msg}</Alert> : null}
                        <Form action="#" method="post" onSubmit={this.onSubmit}>
                            <Input type="email" name="email" id="email" placeholder="Enter Email" onChange={this.onChange} className="welcome-margin" required></Input>
                            <Input type="password" name="password" id="password" placeholder="Enter Password" onChange={this.onChange} className="welcome-margin" required></Input>
                            <Button type="submit" color="success" style={{ margin: '20px'}} onClick={this.onSubmit}>Login</Button>
                        
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
    
})

export default connect(mapStateToProps, {login, clearErrors})(LoginUser);