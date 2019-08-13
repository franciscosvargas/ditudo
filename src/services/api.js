import axios from 'axios'

const api = axios.create({
    baseURL: 'https://ditudo-backend.herokuapp.com'
})

export default api