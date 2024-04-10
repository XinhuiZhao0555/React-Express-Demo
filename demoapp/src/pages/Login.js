import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import { createTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux'
import { login} from '../redux/loginSlice';

export default function Login({ setUsername }) {
    const theme = createTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassWord] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);

    const validateEmail = (value) => {
        setEmail(value);
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
            setInvalidEmail(true);
            setBtnDisabled(true);
        }
        else {
            setInvalidEmail(false);
            if (password) setBtnDisabled(false);
        }
    }

    const validatePassword = (value) => {
        setPassword(value);
        if (value === '') { 
            setInvalidPassWord(true); 
            setBtnDisabled(true);
        }
        else {
            setInvalidPassWord(false);
            if(!invalidEmail && email) setBtnDisabled(false);
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        logIn();
    };

    // Log in a user using email and password
    const logIn = () => {
        fetch('http://localhost:3080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((response) => {
                if ('success' === response.message) {
                    localStorage.setItem('user', JSON.stringify({ username: response.username, email, token: response.token }))
                    dispatch(login())
                    setUsername(response.username)
                    navigate('/')
                } else {
                    window.alert('Invalid email or password')
                }
            })
    }

    return (
        <Grid container component="main" style={{ height: "100vh" }}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={8} style={{
                backgroundImage: "url(https://source.unsplash.com/random)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} />
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                <div style={{
                    margin: theme.spacing(10, 10),
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Avatar style={{
                        margin: theme.spacing(2),
                        backgroundColor: theme.palette.secondary.main
                    }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form style={{
                        width: "100%", // Fix IE 11 issue.
                        marginTop: theme.spacing(1)
                    }}
                        onSubmit={handleSubmit}
                        noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            value={email}
                            onChange={(e) => validateEmail(e.target.value)}
                            onBlur={(e) => validateEmail(e.target.value)}
                            error={invalidEmail}
                            helperText={invalidEmail ? 'invalid email' : ''}
                            autoFocus
                        />
                        <FormControl variant="outlined" margin="normal" required fullWidth error={invalidPassword}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => validatePassword(e.target.value)}
                                onBlur={(e) => validatePassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText id="password-helper-text">{invalidPassword ? 'required' : ''}</FormHelperText>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ margin: theme.spacing(3, 0, 2) }}
                            disabled={btnDisabled}
                        >
                            Login
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    Don't have an account? Register
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                Built by Natalie.
                            </Typography>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}