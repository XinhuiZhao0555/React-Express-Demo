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

    const handleNavToHome = () => { navigate('/') };
    const handleNavToStock = () => { navigate('/stock') };
    const handleNavToContact = () => { navigate('/contact') };
    const handleNavToFeedback = () => { navigate('/feedback') };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: "#B947DF" }}>
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
                        <Typography component="h1" variant="h6" 
                            style={{ fontWeight: "bold", color: 'white', marginRight: "20px" }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            onClick={handleNavToHome}>
                            Home
                        </Typography>
                        <Typography component="h1" variant="h6"
                            style={{ fontWeight: "bold", color: 'white', marginRight: "20px" }}
                            onClick={handleNavToStock}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Stock
                        </Typography>
                        <Typography component="h1" variant="h6"
                            style={{ fontWeight: "bold", color: 'white', marginRight: "20px" }}
                            onClick={handleNavToContact}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Contact
                        </Typography>
                        <Typography component="h1" variant="h6"
                            style={{ fontWeight: "bold", color: 'white', marginRight: "20px" }}
                            onClick={handleNavToFeedback}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Feedback
                        </Typography>
                    </Box>
                    <Box style={{ marginRight: '20px' }}>
                        <Typography style={{ fontWeight: "bold", color: 'white'}}>
                            {loggedIn ? <div>Welcome {username}!</div> : <div />}
                        </Typography>
                    </Box> 
                    <Box>
                        <Button color="inherit" onClick={onClickLogin} style={{backgroundColor: "#55076F"}}>{loggedIn ? 'Logout' : 'Login'}</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}