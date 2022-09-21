import Axios from 'axios';

const API = {
    loadStore: () => {
        return Axios.get('routes/products/')
    },
    loadCart: (userId) => {
        return Axios.post('routes/auth/loadCart/', {userId})
    },
    createStoreItem: (item) => {
        return Axios.post('routes/products/addNewItem/', item)
    },
    loadSeed: (item) => {
        return Axios.post('routes/products/seed/', item)
    },
    addToCart: (userId, itemId) => {
        return Axios.post('routes/products/addItem/', {userId, itemId})
    },
    removeCartItem: (userId, itemId) => {
        return Axios.post('routes/products/removeItem/', {userId, itemId})
    },
    deleteStoreItem: (itemId) => {
        return Axios.post('routes/products/delete/', {itemId})
    },
    updateProfile: (user) => {
        return Axios.post('routes/update/', user)
    },
    deleteProfile: (userId) => {
        return Axios.post('routes/update/delete-user/', {userId})
    },
    purchaseItems: (userId) => {
        return Axios.post('routes/update/purchase/', {userId})
    }
}

export default API;