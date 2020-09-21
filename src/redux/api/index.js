import axios from 'axios'

export default {
    user: {
        login: credential => axios.post('/users/login', credential, { headers: { 'Content-Type': 'application/json' }}),
        register: async credential => await axios.post('/users/register', credential, { headers: { 'Content-Type': 'application/json' }}),
        logout: async () => await axios.get('/users/session-delete', { headers: { 'Content-Type': 'application/json' }}),
    }
}