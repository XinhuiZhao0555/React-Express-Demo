import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Login({ users, setLoggedIn, setUsername }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = () => {
        setEmailError('');
        setPasswordError('');
        if (email === '') {
            setEmailError('Please enter your email');
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email');
            return;
        }

        if (password === '') {
            setPasswordError('Please enter a password');
            return;
        }

        if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer');
            return;
        }

        const user = users.filter((e) => e.email === email && e.password === password);
        if(user.length === 1){
            setUsername(user[0].username);
            setLoggedIn(true);
            navigate('/home');
        }else{
            setLoginError('account does not exist');
        }

    };

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Login</div>
            </div>
            <br />
            <div className={'inputContainer'}>
                <TextField id="outlined-basic" label="Enter your email here" variant="outlined" 
                className={'inputBox'}
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <TextField id="outlined-basic" label="Enter your password here" variant="outlined" 
                className={'inputBox'} 
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <Button className={'inputButton'} variant="contained" type="submit" onClick={handleSubmit}>Login</Button>
                <label className="errorLabel">{loginError}</label>
            </div>
        </div>
    )
}