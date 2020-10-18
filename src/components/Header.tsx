import React from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { SIDEBAR_WIDTH } from './Sidebar';


const useStyle = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2)
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    menuIcon: {
        color: 'white'
    },
    appBarShift: {
        width: `calc(100% - ${SIDEBAR_WIDTH})`,
        marginLeft: SIDEBAR_WIDTH
    }
}))

const Header = ({open, handleSidebarOpen}: {open: boolean, handleSidebarOpen: () => void}) => {
    const classes = useStyle();

    return (
        <AppBar position="sticky" 
            className={open ? classes.appBarShift : classes.appBar}>
            <Toolbar>
                <IconButton onClick={handleSidebarOpen}>
                    <MenuIcon 
                        className={classes.menuIcon} 
                        style={{ display: open ? 'none' : 'flex'}} />
                </IconButton>
                <PhotoCameraIcon className={classes.icon} />
                <Typography 
                    variant="h6">Fancy Gallery</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
