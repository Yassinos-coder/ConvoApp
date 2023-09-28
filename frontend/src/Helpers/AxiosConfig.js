import axios from 'axios'

const AxiosConfig = axios.create({
    baseURL: 'http://571rc2t5-8009.uks1.devtunnels.ms/',
})

AxiosConfig.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('bigKey') ? localStorage.bigKey : ''
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default AxiosConfig