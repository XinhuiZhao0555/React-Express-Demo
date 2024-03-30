import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';

export default function Form({ addContact }) {
    const theme = createTheme();
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={{
                marginTop: theme.spacing(2),
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography component="h1" variant="h5">
                    Add Contact
                </Typography>
                <form style={{
                    width: "100%", // Fix IE 11 issue.
                    margin: theme.spacing(3)
                }}
                    noValidate
                    onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Name" variant="outlined" value={name}
                                onChange={e => setName(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Email" variant="outlined" value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Website" variant="outlined" value={website}
                                onChange={e => setWebsite(e.target.value)} />
                        </Grid>
                    </Grid>
                    <Button 
                    variant="contained" 
                    type="submit" 
                    fullWidth 
                    color="primary"
                    style={{ margin: theme.spacing(3, 0, 2) }} >
                        ADD
                    </Button>
                </form>
            </div>
        </Container>
    )
}