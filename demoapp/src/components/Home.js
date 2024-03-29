import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({ username, loggedIn, setLoggedIn }) {
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

    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Welcome!</div>
                {loggedIn ? <div>{username}</div> : <div />}
            </div>
            <div>This is the home page.</div>
            <div className={'buttonContainer'}>
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={onClickLogin}
                    value={loggedIn ? 'Log out' : 'Log in'}
                />
            </div>
        </div>
    )
}