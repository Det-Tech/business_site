import { LOGIN, BUSINESS_INFO_ARRAY, BUSINESS_EMAIL, GET_BUSINESS_APPOINTMENT, GET_CUSTOMER_APPOINTMENT } from '../actions/types';

const initState = {
    userInfo: {},
    businessInfoArray: {},
    businessEmail: '',
    businessAppointment: {},
    customerAppointment: {},
}

const UserReducer = (state = initState, actions) => {
    switch (actions.type) {
        case LOGIN:
            return { ...state, userInfo: actions.payload };
        case BUSINESS_INFO_ARRAY:
            return { ...state, businessInfoArray: actions.payload }
        case BUSINESS_EMAIL:
            return { ...state, businessEmail: actions.payload }
        case GET_BUSINESS_APPOINTMENT:
            return { ...state, businessAppointment: actions.payload }
        case GET_CUSTOMER_APPOINTMENT:
            return { ...state, customerAppointment: actions.payload }
        default:
            return state;
    }
}

export default UserReducer;