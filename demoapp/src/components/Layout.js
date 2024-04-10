import { Outlet } from "react-router-dom";
import NavBar from './NavBar.js';

export default function Layout ({ username }) {
    /**
     * NOTE: Typically includes common UI elements such as headers,
     * footers, and navigation menus.
     */
    return (
        <>
            <NavBar username={username}/>
            {/* Outlet is a placeholder for the child components of the current route */}
            <Outlet />
        </>
    );
};