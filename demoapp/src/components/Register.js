import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Register() {
    const theme = createTheme();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidPassword2, setInvalidPassword2] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const validateUsername = (value) => {
        setUsername(value);
        if (!value) { setInvalidUsername(true); setBtnDisabled(true); }
        else {
            setInvalidUsername(false);
            if (!invalidEmail && email && !invalidPassword && password && !invalidPassword2 && password2) setBtnDisabled(false);
        }
    }
    const validateEmail = (value) => {
        setEmail(value);
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) { setInvalidEmail(true); setBtnDisabled(true); }
        else {
            setInvalidEmail(false);
            if (username && !invalidPassword && password && !invalidPassword2 && password2) setBtnDisabled(false);
        }
    }
    const validatePassword = (value) => {
        setPassword(value);
        if (value.length < 8) { setInvalidPassword(true); setBtnDisabled(true); }
        else {
            setInvalidPassword(false);
            if ( value !== password2 ) { setInvalidPassword2(true); setBtnDisabled(true); }
            else if (username && !invalidEmail && email ) setBtnDisabled(false);
        }
    }
    const validatePassword2 = (value) => {
        setPassword2(value);
        if (password !== value || value.length < 8) { setInvalidPassword2(true); setBtnDisabled(true); }
        else {
            setInvalidPassword2(false);
            if(username && !invalidEmail && email && !invalidPassword && password) setBtnDisabled(false);
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [showPassword2, setShowPassword2] = useState(false);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register();
    };

    // Log in a user using email and password
    const register = () => {
        fetch('http://localhost:3080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
            .then((response) => response.json())
            .then((response) => {
                if ('register success' === response.message) {
                    navigate('/login')
                } else {
                    window.alert('exist email')
                }
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={{
                marginTop: theme.spacing(10),
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
                    Register
                </Typography>
                <form style={{
                    width: "100%", // Fix IE 11 issue.
                    margin: theme.spacing(3)
                }}
                    noValidate
                    onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="userame"
                                label="Username"
                                name="username"
                                value={username}
                                onChange={(e) => validateUsername(e.target.value)}
                                onBlur={(e) => validateUsername(e.target.value)}
                                error={invalidUsername}
                                helperText={invalidUsername ? 'invalid username' : ''}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" required fullWidth error={invalidPassword}>
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
                                <FormHelperText id="password-helper-text">{invalidPassword ? 'password must be 8 characters or longer' : ''}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" required fullWidth error={invalidPassword2} >
                                <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="password2"
                                    type={showPassword2 ? 'text' : 'password'}
                                    value={password2}
                                    onChange={(e) => validatePassword2(e.target.value)}
                                    onBlur={(e) => validatePassword2(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword2}
                                                onMouseDown={handleMouseDownPassword2}
                                                edge="end"
                                            >
                                                {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                />
                                <FormHelperText id="password2-helper-text">{invalidPassword2 ? 'please enter same password again' : ''}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ margin: theme.spacing(3, 0, 2) }}
                        disabled={btnDisabled}
                    >
                        Register
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Typography variant="body2" color="textSecondary" align="center">
                    Built by Natalie.
                </Typography>
            </Box>
        </Container>
    )
}