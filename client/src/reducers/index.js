import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userCartReducer from './userCartReducer';
import locationReducer from './locationReducer'
export default combineReducers({
    cart: userCartReducer,
    item: itemReducer,
    auth: authReducer,
    error: errorReducer,
    location: locationReducer
})