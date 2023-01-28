import Layout from "../components/layout";

import * as React from 'react';
import { Box } from "@mui/system";
import { 
    Table, 
    TableContainer, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell,
    Typography,
    LinearProgress, 
    Paper,
 } from "@mui/material";



type labData = {
    name: string,
    progress: number,
}

type moduleData = {
    name: string,
    progress: number,
}

const modulesDict: moduleData[] = [
    {name: 'Frozen yoghurt', progress: 0},
    {name: 'Ice cream sandwich', progress: 20},
];

const labRows: labData[] = [
    {name: 'Frozen yoghurt 1', progress: 0},
    {name: 'Frozen yoghurt 2', progress: 40},
];

const labRows2: labData[] = [
    {name: 'Ice cream sandwich 1', progress: 22},
    {name: 'Ice cream sandwich 2', progress: 22},
];

let labMap = new Map<string, labData[]>();
labMap.set(modulesDict[0].name, labRows);
labMap.set(modulesDict[1].name, labRows2);

const Modules = (): React.ReactElement => {
    const [selected, setSelected] = React.useState<string>("");
    const [labs, labModuleSelected] = React.useState<labData[] | undefined>([]);
    // let labs: labData[] = [];

    const handleClick = (name: string) => {
        selected === name ? setSelected : setSelected(name);
        // labModuleSelected;
        labModuleSelected(labMap.get(name));
    }
    console.log(selected);

    return (
        <Layout>
            <h1>{} Modules </h1>
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
                    "modules modules labs labs"
                    `,
                    }}
                >
                    <Box sx={{ gridArea: 'main', bgcolor: 'text.disabled', color: 'background.paper' }}>Main</Box>

                    {/* Lab Module Menu area */}
                    <Box sx={{ gridArea: 'modules', maxWidth: 'md' }}>    
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell align="left">Module Name</TableCell>
                                    <TableCell align="center">Progress</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {modulesDict.map((row, index) => {
                                    // const isItemSelected = isSelected(row.name);

                                    return (
                                    <TableRow
                                    hover
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={(event) => handleClick(row.name)}
                                    selected={selected === row.name}
                                    >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography>{Math.round(row.progress)}%</Typography>
                                        <LinearProgress variant="determinate" value={row.progress} color="success"/></TableCell>
                                    </TableRow>
                                );
                                })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>


                    {/* Lab Task Menu area */}
                    <Box sx={{ gridArea: 'labs', maxWidth: 'md' }}>    
                    
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell align="left">Lab Name</TableCell>
                                    <TableCell align="right">Progress</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {labs?.map((row) => (
                                    <TableRow
                                    // hover
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
        </Layout>
    )
}

export default Modules