import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({loggedIn}) {
    return (loggedIn ? <Outlet/> : <Navigate to='/login'/>);
}
export default PrivateRoute;