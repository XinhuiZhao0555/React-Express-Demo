import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({ username, loggedIn, setLoggedIn }) {
    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
            //localStorage.removeItem('user');
            setLoggedIn(false);
        } else {
            navigate('/login');
        }
    }

    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Welcome!{loggedIn ? <div> {username}</div> : <div />}</div>
            </div>
            <div>This is the home page.</div>
            <div className={'buttonContainer'}>
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={onButtonClick}
                    value={loggedIn ? 'Log out' : 'Log in'}
                />
            </div>
        </div>
    )
}