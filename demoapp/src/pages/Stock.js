import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Stock() {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const socket = new WebSocket("wss://ws.finnhub.io?token=cnppip1r01qgjjvqtr8gcnppip1r01qgjjvqtr90");
        socket.onopen = () => {
            console.log("Connection Established!");
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'AAPL' }))
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'BINANCE:BTCUSDT' }))
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'IC MARKETS:1' }))
        };
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            setStocks(response.data);
        };
        socket.onclose = () => {
            console.log("Connection Closed!");
            //initWebsocket();
        };

        socket.onerror = () => {
            console.log("WS Error");
        };

        return () => {
            socket.close();
        };
    }, []);

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
                            <TableCell>Symbol</TableCell>
                            <TableCell align="right">Last Price</TableCell>
                            <TableCell align="right">Timestamp</TableCell>
                            <TableCell align="right">Volumn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stocks?.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.s}</TableCell>
                                <TableCell align="right">{row.p}</TableCell>
                                <TableCell align="right">{new Date(row.t).toLocaleString()}</TableCell>
                                <TableCell align="right">{row.v}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};