import Layout from "../components/layout";

import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";

import * as React from 'react';
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import CommandParser from "../components/command-parser";

import { useAuth } from "../components/auth"
import LabList from "../components/lab-list";
import { Constants } from "../utils/constants";

// Tab Controller
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function makeApiUrl(path: string) {
    return Constants.API_BASE + path;
  }


  async function fetchLabTasks(token: string): Promise<Response> {
    const url = makeApiUrl("/lab_tasks");
    
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }   
    })
  }
  
const { getToken } = useAuth();


const LabsPage = (): React.ReactElement => {
    // const [colorMode, setColorMode] = useState(ColorMode.Dark);
    const [currentTab, setCurrentTab] = useState(0);
    const [labData, setLabData] = useState([]);

    const token = getToken();

    useEffect(() => {
        fetchLabTasks(token)
          .then((res) => res.json())
          .then((data) => {
            setLabData(data)
            })
    }, []);



    const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
        setCurrentTab(newTab);
    };

    const [terminalLineData, setTerminalLineData] = useState([
        <TerminalOutput>LabOS v0.1 - Type 'help' to print or describe usage of the command</TerminalOutput>
      ]);

    function onInput (input: string) {
        let ld = [...terminalLineData];
        let trimmedLd = input.toLocaleLowerCase().trim();

        let cmdOutput: string = CommandParser(input);
        // ld.push(<TerminalOutput>{input}</TerminalOutput>);
        // if (trimmedLd === 'rot13') {
        if (trimmedLd === 'clear') {
            ld = [];
        } else {
            ld.push(<TerminalOutput>{ cmdOutput }</TerminalOutput>);
        }
        setTerminalLineData(ld);
    } 
    // Move Terminal into its own file that creates a list of commands and imports them

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
                        <Terminal colorMode={ ColorMode.Dark }  onInput={ onInput }>
                            { terminalLineData }
                        </Terminal>
                    </Box>

                    {/* Lab Task Menu area */}
                    <Box sx={{ gridArea: 'sidebar', maxWidth: 'md', maxHeight: 'md'}}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs 
                            value={currentTab} 
                            onChange={handleTabChange} 
                            aria-label="" 
                            >
                                <Tab label="Labs" {...a11yProps(0)} />
                                <Tab label="Description" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={currentTab} index={0}>
                            <LabList></LabList>
                        </TabPanel>
                        <TabPanel value={currentTab} index={1}>
                            Item one
                        </TabPanel>
                    </Box>
                </Box>
            </Box>            
        </Layout>
    )
}

export default LabsPage