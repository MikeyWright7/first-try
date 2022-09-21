const initialState = {
    location: "WELCOME"
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "STORE":
            return {
                ...state,
                location: "STORE"
            }
        case "DASHBOARD":
            return {
                ...state,
                location: "DASHBOARD"
            }
        case "COMPANY_CONTACT":
            return {
                ...state,
                location: "COMPANY_CONTACT"
            }
        case "COMPANY_MISSION":
            return {
                ...state,
                location: "COMPANY_MISSION"
            }

        default:
            return state;
    }
}