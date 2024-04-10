import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function PrivateRoute() {
    const loggedIn = useSelector((state) => state.loggedIn.value)
    return (loggedIn ? <Outlet/> : <Navigate to='/login'/>);
}
export default PrivateRoute;