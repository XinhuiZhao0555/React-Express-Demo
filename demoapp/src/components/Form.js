import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Form({ addContact }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || website === '') {
            alert('field cannot be empty');
            return;
        }

        addContact({ name, email, website });
        setName('');
        setEmail('');
        setWebsite('');
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                boxShadow: 1,
                mt: 4
            }}
            noValidate
            autoComplete="off"
        >
            <h2>Contact Form</h2>
            <TextField id="outlined-basic" label="Name" variant="outlined" value={name}
                onChange={e => setName(e.target.value)} />

            <TextField id="outlined-basic" label="Email" variant="outlined" value={email}
                onChange={e => setEmail(e.target.value)} />

            <TextField id="outlined-basic" label="Website" variant="outlined" value={website}
                onChange={e => setWebsite(e.target.value)} />
            <br/>
            <Button variant="contained" type="submit" onClick={handleSubmit} >ADD</Button>
        </Box>
    )
}