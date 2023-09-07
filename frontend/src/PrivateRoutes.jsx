import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {

    let accessChecker = localStorage.getItem('user_status') ? localStorage.user_status : 'disconnected'

    return (accessChecker === 'connected' ? <Outlet /> : <Navigate to='/TheGate' />)
}

export default PrivateRoutes