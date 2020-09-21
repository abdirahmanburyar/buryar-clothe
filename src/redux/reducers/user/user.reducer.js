import {
    USER_REGISTER, USER_LOGIN, USER_LOGOUT
} from '../../types'

const INITIAL_STATE = {
    user: null,
    isAuthenticated: false,
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch(type){
        case USER_REGISTER:
            return {
            ...state,
            isAuthenticated: !state.isAuthenticated,
            user: payload,
        }
        case USER_LOGIN:
            return {
            ...state,
            isAuthenticated: !state.isAuthenticated,
            user: payload
        }
        case USER_LOGOUT:
            return {
            ...state,
            isAuthenticated: false,
            user: payload
        }
        default: {
            return state
        }
    }
}