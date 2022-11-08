import { useReducer } from "react";

const initialState = {
    cart: null
}

export default function cart(state = initialState, action) {
    switch (action.type) {
        
        case "REMOVE_CART":
            return {
                cart: action.payload
            };
        case "ADD_CART":
            return {
                ...state,
                cart: action.payload
            };
        case "UPDATE_CART":
            return {
                ...state,
                cart: action.payload
            }
        case "PURCHASED":
            return {
                ...state,
                cart: action.payload
            }
        default:
            return state;
    }
}