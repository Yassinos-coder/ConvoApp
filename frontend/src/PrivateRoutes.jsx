import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {

    let accessChecker = localStorage.getItem('bigKey') ? localStorage.bigKey : 'false'

    return (accessChecker === 'true' ? <Outlet /> : <Navigate to='/SignIn' />)
}

export default PrivateRoutes