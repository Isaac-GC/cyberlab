import * as React from 'react';

import { LinearProgress, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';


// Placeholder data
type tempData = {
    name: string;
    progress: number;
}
  
const rows: tempData[] = [
    {name: 'Frozen yoghurt', progress: 0},
    {name: 'Ice cream sandwich', progress: 20},
    {name: 'Eclair', progress: 53},
    {name: 'Cupcake', progress: 72},
    {name: 'Gingerbread', progress: 100},
];


const LabList = (): React.ReactElement => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left">Lab Name</TableCell>
                    <TableCell align="center">Progress</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    hover
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">
                        <Typography>{Math.round(row.progress)}%</Typography>
                        <LinearProgress variant="determinate" value={row.progress} color="success"/></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default LabList