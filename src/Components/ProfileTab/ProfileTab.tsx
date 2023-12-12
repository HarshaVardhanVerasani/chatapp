import { Avatar, IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import AppContext from '../../Context/AppContext';
import { auth } from '../../Pages/auth/Config';

export default function ProfileTab() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const {currentUser,clearAllStates} = React.useContext(AppContext)

    const logOutCurrentUser = async () => {
        await auth.signOut();
        clearAllStates();
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar src={currentUser.photoUrl} alt={currentUser.name}></Avatar>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    {currentUser.name}
                </MenuItem>
                <MenuItem onClick={logOutCurrentUser}>Logout</MenuItem>
            </Menu>
        </div>
    );
}