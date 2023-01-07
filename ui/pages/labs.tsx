import Layout from "../components/layout";

import Router, { useRouter } from "next/router";

import * as React from 'react';
import { Box } from "@mui/system";
import { LinearProgress, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Script from "next/script";

function createData(
    name: string,
    progress: number,
  ) {
    return { name, progress };
  }
  
const rows = [
    createData('Frozen yoghurt', 0),
    createData('Ice cream sandwich', 20),
    createData('Eclair', 53),
    createData('Cupcake', 72),
    createData('Gingerbread', 100),
];

const LabsPage = (): React.ReactElement => {

    return (
        <Layout>
            <h1>{} Module Labs</h1>
                <Box
                sx={{
                    width: '100%',
                    height: '140px',
                    color: '#fff',
                    '& > .MuiBox-root > .MuiBox-root': {
                    p: 1,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    },
                }}
                >
                <Box
                    sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `"header header header header"
                    "sidebar main main main"
                    `,
                    }}
                >
                    <Box sx={{ gridArea: 'main', bgcolor: 'text.disabled',  color: 'background.paper' }}>
                        {/* <DynamicTerminal /> */}
                        <div id="terminal"></div>
                    </Box>

                    {/* Lab Task Menu area */}
                    <Box sx={{ gridArea: 'sidebar', maxWidth: 'md', maxHeight: 'md'}}>    
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell align="left">Module Name</TableCell>
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
                    </Box>
                </Box>
            </Box>
            {/* <Script src="scripts/jquery-3.1.1.slim.min.js" strategy="lazyOnload" /> */}
            
        </Layout>
    )
}

export default LabsPage