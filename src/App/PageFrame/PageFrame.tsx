import * as React from 'react';
import {useContext, useState} from 'react';
import {CSSObject, styled, Theme, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TopBar from "../TopBar/TopBar";
import SensorsIcon from '@mui/icons-material/Sensors';
import {
  Collapse,
  Container,
  Drawer,
  ListItemButton,
  ListSubheader,
  SwipeableDrawer,
  useMediaQuery,
} from "@mui/material";
import {DarkModeOutlined, LightModeOutlined} from "@mui/icons-material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {useLocation, useNavigate} from "react-router-dom";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ExpandLess from '@mui/icons-material/ExpandLess';
import {ThemeModeContext} from "../Theme/Theme";

const drawerWidth = 320;

interface PageFrameProps {
  children?: React.ReactNode,
  title?: string,
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  '&::-webkit-scrollbar': {width: 0},
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {display: 'none'},
  width: `calc(${theme.spacing(8)} - 2px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 2px)`,
  },
});

const ResponsiveDrawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {},
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


const PageFrame: React.FC<PageFrameProps> = ({children, title}) => {
  const theme = useTheme();
  const {mode, setMode} = useContext(ThemeModeContext);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"))
  const [open, setOpen] = React.useState(Boolean(isLargeScreen));
  const location = useLocation();
  const [nestedListToggle, setNestedListToggle] = useState(true)


  const handlePageSelection = (path: string) => {
    if (isMobile) handleDrawerClose();
  }
  const handleDrawerToggle = () => {
    setOpen(!open)
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleThemeSwitch = () => {
    if (mode === 'light') {
      setMode('dark');
      localStorage.setItem("theme", JSON.stringify('dark'))
    } else {
      setMode('light');
      localStorage.setItem("theme", JSON.stringify('light'))
    }
  };
  const handleNestedListToggle = () => {
    if (open) {
      setNestedListToggle(!nestedListToggle)
    } else {
      setOpen(true)
      setNestedListToggle(true)
    }
  };

  const DrawerContent = () => {
    return (
      <Box p={1}>
        <List>
          <ListItemButton
            sx={{height: '57px', width: '57px'}}
            onClick={handleDrawerToggle}
            disabled={isLargeScreen}
          >
            <ListItemIcon>
              <MenuOpenIcon
                sx={{
                  transition: 'transform 0.3s ease-out',
                  transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
                }}
              />
            </ListItemIcon>
          </ListItemButton>
        </List>
        <List
          subheader={open && <ListSubheader component="div">Console</ListSubheader>}
          component="nav"
        >
          <ListItemButton
            onClick={handleNestedListToggle}
            key={1}
            sx={{height: isMobile ? '48px' : '57px'}}
            selected={location.pathname === '/home'}
          >
            <ListItemIcon>
              <SensorsIcon sx={{color: location.pathname === '/home' ? 'primary.main' : ''}}/>
            </ListItemIcon>
            <ListItemText primary="Pod"/>
            <ExpandLess sx={{
              transform: nestedListToggle ? 'rotate(180deg)' : 'none',
              transition: theme.transitions.create('all', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.standard,
              }),
            }}/>
          </ListItemButton>
          <Collapse in={nestedListToggle && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{pl: 4}} onClick={() => navigate('/home')}>
                <ListItemText primary="Sala macchine"/>
              </ListItemButton>
              <ListItemButton sx={{pl: 4}} onClick={() => navigate('/home')}>
                <ListItemText primary="Ventola Nord"/>
              </ListItemButton>
              <ListItemButton sx={{pl: 4}} onClick={() => navigate('/home')}>
                <ListItemText primary="Ventola Sud"/>
              </ListItemButton>
              <ListItemButton sx={{pl: 4}} onClick={() => navigate('/home')}>
                <ListItemText primary="Forno"/>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <List
          subheader={open && <ListSubheader component="div">App</ListSubheader>}
        >
          <ListItemButton
            onClick={() => navigate('/impostazioni')}
            key={1}
            sx={{height: isMobile ? '48px' : '57px'}}
            selected={location.pathname === '/settings'}
          >
            <ListItemIcon>
              <SettingsOutlinedIcon sx={{color: location.pathname === '/settings' ? 'primary.main' : ''}}/>
            </ListItemIcon>
            <ListItemText primary="Impostazioni"/>
          </ListItemButton>
          <ListItemButton onClick={handleThemeSwitch} key={2} sx={{height: isMobile ? '48px' : '57px'}}>
            <ListItemIcon>
              {theme.palette.mode === 'dark'
                ? <LightModeOutlined/>
                : <DarkModeOutlined/>
              }
            </ListItemIcon>
            <ListItemText
              primary={theme.palette.mode === 'dark'
                ? "Tema Chiaro"
                : "Tema Scuro"
              }
            />
          </ListItemButton>
        </List>
      </Box>
    )
  }

  return (
    <Box sx={{display: 'flex',}}>
      <CssBaseline/>
      {isMobile
        ? <SwipeableDrawer
          open={open}
          elevation={0}
          onClose={handleDrawerClose}
          onOpen={handleDrawerOpen}
          disableDiscovery
          disableSwipeToOpen
          ModalProps={{
            BackdropProps: {
              sx: {}
            }
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <DrawerContent/>
        </SwipeableDrawer>
        : isLargeScreen
          ? <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <DrawerContent/>
          </Drawer>
          : <ResponsiveDrawer variant="permanent" open={open}>
            <DrawerContent/>
          </ResponsiveDrawer>
      }
      <Box component="main" sx={{flexGrow: 1, p: 3}}>
        <TopBar isOpen={open} title={title} onMenuClick={handleDrawerToggle}/>
        <Container maxWidth="xl" disableGutters={isMobile}>
          <Box py={10}>
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default PageFrame;