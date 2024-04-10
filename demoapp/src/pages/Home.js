import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material';
//import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/clerk-react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/loginSlice';

export default function Home({ username }) {
    //const { user } = useUser()
    const theme = createTheme();
    const navigate = useNavigate();
    const loggedIn = useSelector((state) => state.loggedIn.value)
    const dispatch = useDispatch()

    const handleClickLogin = () => {
        if (loggedIn) {
            localStorage.removeItem('user');
            dispatch(logout());
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    return (
        <Grid container component="main" style={{ height: "100vh" }}>
            <CssBaseline />
            <Grid item xs={false} sm={12} md={12} style={{
                backgroundImage: "url(https://source.unsplash.com/random)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "linear-gradient(to right bottom, #B947DF , #55076F)",
                    margin: theme.spacing(20, 0),
                    width: "50%"
                }}>
                    <Typography component="h1" variant="h4" style={{ margin: theme.spacing(6, 0, 0), fontWeight: "bold", color: 'white' }}>
                        Welcome {loggedIn ? username : ''}!
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: "#55076F", margin: theme.spacing(3, 0, 3) }}
                        onClick={handleClickLogin}
                    >
                        {loggedIn ? 'Logout' : 'Login'}
                    </Button>

                    {/* authe button with Clerk
                    <SignedOut>
                        <SignInButton>
                            <input className={'inputButton'} type="button" value={'Log in'} />
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <SignOutButton>
                            <input className={'inputButton'} type="button" value={'Log out'} />
                        </SignOutButton>
                    </SignedIn> */}

                    <Box mt={5} style={{ margin: theme.spacing(10, 0, 3) }}>
                        <Typography variant="body2" color="textSecondary" align="center" >
                            Built by Natalie.
                        </Typography>
                    </Box>
                </div>
            </Grid>
        </Grid>
    )
}