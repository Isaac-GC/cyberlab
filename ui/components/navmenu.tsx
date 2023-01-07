import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Login from '@mui/icons-material/Login';
import SvgIcon from '@mui/material/SvgIcon';
import AccountBox from '@mui/icons-material/AccountBox';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ScienceIcon from '@mui/icons-material/Science';
import Avatar from '@mui/material/Avatar';

// import { useAuth } from "./auth";
import Link from "next/link";



const NavMenu = (): React.ReactElement => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selected, setSelected] = React.useState<-1 | HTMLElement>(-1);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    interface ICustomMenuItem {
        text: string;
        icon: typeof SvgIcon;
        url: string;
    }

    // const { isAuthenticated, isAdmin, authorized, user } = useAuth();
    
    let profile: ICustomMenuItem  = { text: "Profile", icon: AccountBox, url: "/profile" }
    let settings: ICustomMenuItem = { text: "Settings", icon: Settings, url: "/settings" }
    let logout: ICustomMenuItem = { text: "Logout", icon: Logout, url: "/logout" }
    let login: ICustomMenuItem = { text: "Login", icon: Login, url: "/login" }
    let modules: ICustomMenuItem = { text: "Modules", icon: ViewModuleIcon, url: "/modules" }
    let labs: ICustomMenuItem = { text: "Labs", icon: ScienceIcon, url: "/labs" }
    let admin: ICustomMenuItem = { text: "Admin", icon: ScienceIcon, url: "/admin" }

    const authdMenu = [profile, settings, logout];
    const unAuthdMenu = [login];
    const authdMenuItems = [modules, labs];

    let menuOptions: Array<ICustomMenuItem>;

    let optionalMenuOptions: Array<ICustomMenuItem> = [];
    // if (isAuthenticated) {
         menuOptions = authdMenu;
    //      console.log("Authenticated", isAuthenticated);
    //      console.log("authorized", authorized);
    //      console.log("Admin(b)", isAdmin);
    //     if (isAdmin) {
    //         optionalMenuOptions = [admin].concat(authdMenuItems);
    //         console.log("isAdmin");
    //     } else {
            optionalMenuOptions = authdMenuItems;
    //         console.log("isNotAdmin");
    //     }
    // } else {
    //      menuOptions = unAuthdMenu;
    // }

    return (
        <div>
            <Box sx={{
                display: 'flex', 
                alignItems: 'center',
                textAlign: 'center',
                alignContent: 'center',
                justifyContent: 'flex-end',
                m: 0.5
                }}>
                {optionalMenuOptions.map(({text, icon, url}, index) => (
                    <MenuItem key={index}>
                        <Link href={url}>
                            <Typography sx={{ minWidth: 100}} variant="inherit" color="text.secondary"  >
                                {text}
                            </Typography>
                        </Link>
                    </MenuItem>
                ))}
                {/* { isAuthenticated ? (
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        </IconButton>
                    </Tooltip>
                ) : 
                ( */}
                    <MenuItem>
                        <Link href={login.url}>
                            <Typography sx={{ minWidth: 100 }}>
                                {login.text}
                            </Typography>
                        </Link>
                    </MenuItem>
                {/* )
                } */}
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                { menuOptions.map(({text, icon, url}, index) => (
                    <MenuItem key={index}>
                        <Link href={url}>
                            <Typography variant="inherit" color="text.secondary">
                                {text}
                            </Typography>
                        </Link>
                    </MenuItem> 
                    ))} 
            </Menu>
        </div>
    );

}

export default NavMenu;
