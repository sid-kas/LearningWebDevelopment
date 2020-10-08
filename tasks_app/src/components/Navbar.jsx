import { AppBar, Toolbar, IconButton, Avatar, Typography, Box } from "@material-ui/core";
import React from 'react';
import icon from "../assets/icon.png"

export default function Navbar() {
    return (
        <div>
            <Box component="nav">
            <AppBar position="static" style={{background:"#bbd4ce"}}>
            <Toolbar>
                <IconButton>
                    <Avatar src={icon} alt="random icon" />
                </IconButton>
                <Typography variant="h5" style={{color:"#222"}}> Tasks App </Typography>
            </Toolbar>
            </AppBar>
            </Box>
            
        </div>
    )
}


