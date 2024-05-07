import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';

const SideBar = () => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (index) => {
        setSelectedButton(index);
    };

    return (
        <Box>
            <Drawer
                sx={{
                    width: '16%',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '17%',
                        boxSizing: 'border-box',
                        backgroundColor: '#171719',
                        color: 'white',
                    }
                }}
                variant="permanent"
                anchor="left"
            >
                <List style={{ padding: '2vh'}}>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} style={{padding: '0.2vh'}}>
                            <ListItemButton
                                onClick={() => handleButtonClick(index)}
                                style={{ backgroundColor: selectedButton === index ? '#358FED' : '#171719', borderRadius: '10px', padding: '2vh'}}
                            >
                                <ListItemIcon style={{ color: "white" }}>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} style={{ color: "white" }} 
                                    primaryTypographyProps={{fontSize: '15px', fontWeight: 'semi-bold'}}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
        </Box>
    );
};

export default SideBar;
