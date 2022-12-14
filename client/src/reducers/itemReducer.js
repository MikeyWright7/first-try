import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from '../actions/types';

const initialState = {
    items: [],
    loading: false
}

export default function(state=initialState, action) {
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case DELETE_ITEM:
            return {
                ...state
            };
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        case "LOAD_STORE":
            return {
                ...state,
                items: action.payload
            }
        case "UPDATE_STORE":
            var copyOfState = Object.assign({}, state)
            copyOfState.items.push(action.payload)
             return copyOfState
            
        case "SEED_ITEMS":
            return {
                ...state,
                items: action.payload
            }      
        default: 
            return state;
    }
}