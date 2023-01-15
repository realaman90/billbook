import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import {theme} from './styles/theme'
import { PrimaryButton, OutlineButton } from "./micro.reusable.components/Buttons";
import { CssBaseline, Typography, Box, TextField} from "@mui/material";

import NavBar from "./page.components/NavBar";
import Invoice from "./pages/Invoice";
import { AppBar,Toolbar, IconButton, Tooltip } from "@mui/material";
import { Settings, } from "@mui/icons-material";
const App = () =>{
    return <ThemeProvider theme={theme}>
        
        <Box sx={{
        display:"flex",
        }}
    >
        <AppBar
            position="fixed"
            sx={{
            width: { lg: `calc(100% - 220px)` },
            ml: { lg: `220px` },           
            backgroundColor: "white",
            boxShadow:{md:'none'}
            }}
        >
            <Toolbar sx={{
                display:'flex',
                justifyContent:'flex-end',
               
                }}
            >
                <Box sx={{
                    width:{xs:240},  
                    display:"inline-flex", 
                    justifyContent:"space-around"
                    }}
                >
                    <Tooltip 
                        title='Account Settings'
                    >
                        <IconButton 
                            size="large"
                        >
                        <Settings />
                        </IconButton>
                    </Tooltip>
                    <PrimaryButton>Upgrade Now</PrimaryButton>
                </Box>
            </Toolbar>
        </AppBar>
    <Box  
        component='nav' sx={{

            width:{lg:220}
        }} 
    >
        
        <NavBar width={220}/>
        
    </Box>
    <Box 
        sx={{
            dispay:'flex', 
            flexDirection:'column',
            width:{sm:'95%',lg:`calc(100% - 220px)`, 
            lg:`calc(100% - 220px)`}, 
            justifyContent:'center', 
            alignItems:'center', 
            margin:'auto'
        }}
    >
    <Box
        
        >
            <Toolbar />      
            
            
            
            <Invoice />
        </Box>
    </Box>
   </Box>
   
    </ThemeProvider>
}

export default App;