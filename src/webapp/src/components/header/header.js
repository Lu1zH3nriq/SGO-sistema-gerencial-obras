import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


export default function PermanentDrawerLeft() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: '82%' }}
                style={{
                    borderRadius: '10px',
                    margin: '3vh 1vw',
                    backgroundColor: 'gray',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        icone home / nome da rota
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h6" noWrap component="div" sx={{ marginRight: 2 }}>
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
                sx={{
                    width: '16%',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '15%',
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Typography paragraph style={{ color: "white" }}>
                    renderizar o componente da rota
                </Typography>
            </Box>
        </Box>
    );
}