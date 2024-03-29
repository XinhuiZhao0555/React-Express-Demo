import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export default function NavigationBar({ username, loggedIn, setLoggedIn }) {
    const navigate = useNavigate();
    const onClickLogin = () => {
        if (loggedIn) {
            localStorage.removeItem('user');
            setLoggedIn(false);
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    const handleNavToHome = () => {navigate('/')};
    const handleNavToStock = () => {navigate('/stock')};
    const handleNavToContact = () => {navigate('/contact')};

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={handleNavToHome}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        > 
                        Home
                        </Button>
                        <Button
                            onClick={handleNavToStock}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        > 
                        Stock
                        </Button>
                        <Button
                            onClick={handleNavToContact}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        > 
                        Contact
                        </Button>
                    </Box>
                    <Box style={{margin:'auto'}}>{loggedIn ? <div>Welcome! {username}</div> : <div />}</Box>
                    <Button color="inherit" onClick={onClickLogin}>{loggedIn ? 'Logout' : 'Login'}</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}