import api from '../../api'
import { USER_REGISTER, USER_LOGIN, USER_LOGOUT } from '../../types'
export  const register = credential => async dispatch =>
    await api.user.register(credential).then(res => {
        dispatch({ type: USER_REGISTER, payload: res.data.user })
    })
export  const login = credential => async dispatch =>
    await api.user.login(credential).then(res => {
        dispatch({ type: USER_LOGIN, payload: res.data.user })
    })
    
export  const logout = () => async dispatch =>
    await api.user.logout().then(res => {
        if(res.status === 200) return dispatch({ type: USER_LOGOUT, payload: null })
        return;
    })
