import React from 'react';
import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import CakeIcon from '@material-ui/icons/Cake';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import AppleIcon from '@material-ui/icons/Apple';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const menuItems = [
    {label: 'Cats', query: 'Cats', icon: <PetsIcon />},
    {label: 'Cake', query: 'Cake', icon: <CakeIcon />},
    {label: 'Tea', query: 'Tea', icon: <EmojiFoodBeverageIcon />},
    {label: 'Apple', query: 'Apple', icon: <AppleIcon />},
    {label: 'Random', icon: <AllInclusiveIcon />},
]

export const SIDEBAR_WIDTH = 200;

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: theme.spacing(1)
    },
    sidebarOpen: {
        width: SIDEBAR_WIDTH
    },
    sidebarClose: {
        width: theme.spacing(7) + 1,
    }
}));

const Sidebar = ({open, handleSidebarClose, handleClick}:{open: boolean, handleSidebarClose: () => void, handleClick: (query?: string) => void}) => {
    const classes = useStyles();
    const drawerClass = open ? classes.sidebarOpen : classes.sidebarClose;
    
    return (
        <Drawer 
            variant="permanent" 
            className={drawerClass}
            classes={{ paper: drawerClass}}>
            <div className={classes.toolbar}>
                <IconButton onClick={handleSidebarClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {menuItems.map((item, index) => (
                    <ListItem 
                        key={`${item.label}-${index}`}
                        button 
                        onClick={() => handleClick(item.query)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.label}</ListItemText>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default Sidebar;
