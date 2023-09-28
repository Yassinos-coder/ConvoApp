import axios from 'axios'

const AxiosConfig = axios.create({
    baseURL: 'httpd://apis.yassinoscoder.codes/',
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