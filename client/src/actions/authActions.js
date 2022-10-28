import axios from 'axios';
import {returnErrors} from './errorActions';
import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS,  LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types';

// Check Token and Load User
export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    
    
    axios.get('/routes/auth/user', tokenConfig(getState))
    .then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: AUTH_ERROR
        });
    });
};
// Register User

export const register = ({name, email, password, passwordTwo, age}) => dispatch => {
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }
// Body request
    const body = JSON.stringify({name, email, password, passwordTwo, age});

    axios.post('/routes/user', body, config )
    .then(res =>{
        console.log(res.data)
        dispatch({
           type: REGISTER_SUCCESS,
           payload: res.data
       })

    }
    )
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
        dispatch({
            type: REGISTER_FAIL
        })
    })
}
// User Login
export const login = ({email, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

// Body request
    const body = JSON.stringify({email, password});

    axios.post('/routes/auth', body, config)
    .then(res => dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
        
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

// load user cart 

export const loadCart = (userId) => {
    axios.post('/routes/loadCart', {userId})
}
// User Logout
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}



// Set up config/headers and token
export const tokenConfig = getState => {
    //Get token from local
    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if(token) {
        config.headers['x-auth-token'] = token;
    };
    return config;
}

