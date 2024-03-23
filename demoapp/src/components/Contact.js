import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Contact() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                if (response.ok) return response.json();
                else throw new Error(response.status);
            })
            .then((json) => setContacts(json))
            .catch(error => console.log(error))
    }, []);

    const addContact = (c) => {
        setContacts([...contacts, c])
    }

    const tableStyle = {
        margin:"auto",
        padding:"20px",
        width:"70%"
    }

    return (
        <div className="container" style={tableStyle}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Contact Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Website</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.website}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Form addContact={addContact} />
        </div>
    )
}