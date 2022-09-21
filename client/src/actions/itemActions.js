import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import Axios from 'axios';
import { tokenConfig } from './authActions';
import {returnErrors} from './errorActions';


export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    Axios.get('/routes/products/loadStore')
        .then(res =>{
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })})
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};

export const addItem = (item) => (dispatch, getState) => {
    Axios.post('/routes/products/addNewItem', item, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })})
            .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};
export const deleteItem = (id) => (dispatch, getState) => {
    Axios.delete(`/routes/products/deleteItem${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
            type: DELETE_ITEM,
            payload: id
        })})
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
};
export const addCartItem = (id) => (dispatch, getState) => {
    Axios.post(`/routes/products/addItem${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
            type: "ADD_CART",
            payload: id
        })})
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};
export const deleteCartItem = (id) => (dispatch, getState) => {
    Axios.delete(`/routes/products/removeItem${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
            type: "REMOVE_CART",
            payload: id
        })})
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};