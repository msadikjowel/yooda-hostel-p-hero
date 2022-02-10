import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Toolbar } from '@mui/material';
import { NavLink } from 'react-router-dom';


export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Yooda Hostel
                    </Typography>
                    <NavLink className="navlink" to="/"><Button color="inherit">Home</Button></NavLink>
                    <NavLink className="navlink" to="/addFood"><Button color="inherit">Add Food</Button></NavLink>
                    <NavLink className="navlink" to="/addStudent"><Button color="inherit">Add Student</Button></NavLink>
                </Toolbar>
            </AppBar>
        </Box>
    );
}