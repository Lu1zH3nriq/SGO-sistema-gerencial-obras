import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { useUIContextController, setDarkMode } from '../../context/index.js';

export default function PermanentDrawerLeft() {
    const [controller, dispatch] = useUIContextController();
    const { darkMode } = controller;

    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleAlterTheme = ()=>{
        setDarkMode(dispatch, !darkMode);
    }
    
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: '79.5%' }}
                style={{
                    borderRadius: '10px',
                    margin: '3vh 1vw',
                    backgroundColor: darkMode ? '#171719' : '#fff',
                }}
            >
                <Toolbar >
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        icone home / nome da rota
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        <Typography variant="h6" noWrap component="div" sx={{ marginRight: 2, cursor: "pointer" }}
                        onClick={handleAlterTheme}
                        >
                            dark-theme
                        </Typography>
                        <Typography variant="h6" noWrap component="div" sx={{ marginRight: 2 }}>
                            profile
                        </Typography>
                        <Typography variant="h6" noWrap component="div">
                            logout
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                anchor="left"
                open={open}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, 
                }}
            >
                <List>
                    <ListItem button>
                        <ListItemText primary="dark-theme" onClick={handleAlterTheme} style={{color: !darkMode ? '#344767' :'white'}}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="profile" style={{color: !darkMode ? '#344767' :'white'}}/>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="logout" style={{color: !darkMode ? '#344767' :'white'}}/>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
}