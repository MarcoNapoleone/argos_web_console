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
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import {Container, Drawer, ListItemButton, ListSubheader, SwipeableDrawer, useMediaQuery,} from "@mui/material";
import {DarkModeOutlined, LightModeOutlined} from "@mui/icons-material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {ThemeModeContext} from "../Theme/Theme";
import {DrawerElements} from "../../utils/DrawerItems";

const drawerWidth = 320;

type PageParamsType = {
  pagePath: string;
};

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
  const {pagePath} = useParams<PageParamsType>();

  const [nestedListToggle, setNestedListToggle] = useState(true)

  const handlePageSelection = (path: string) => {
    navigate(`/app/${path}`)
    handleDrawerClose();
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
  const handleNestedListToggle = (event: any) => {
    const element = document.getElementById("drawer-content-id");
    if (open) {
      setNestedListToggle(!nestedListToggle)
    } else {
      setOpen(true)
      element.scrollTo(0, element.scrollHeight);
      setNestedListToggle(true)
    }
  };

  const DrawerContent = () => {
    return (
      <Box px={1} id="drawer-content-id">
        <List>
          <ListItemButton
            sx={{height: '57px', width: '57px'}}
            key={0}
            onClick={handleDrawerToggle}
            disabled={isLargeScreen}
          >
            <ListItemIcon>
              <KeyboardArrowLeftOutlinedIcon
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
          {DrawerElements.map((el) => (
            <Box pb={1} key={el.index}>
              <ListItemButton
                sx={{height: isMobile ? '48px' : '57px', py: '8px'}}
                onClick={() => handlePageSelection(el.path)}
                selected={el.path === pagePath}
              >
                <ListItemIcon>
                  {el.icon}
                </ListItemIcon>
                <ListItemText
                  primary={el.label}
                  primaryTypographyProps={{
                    color: el.path === pagePath ? 'primary' : '',
                    fontWeight: el.path === pagePath ? 'bold' : '',
                  }}
                />
              </ListItemButton>
            </Box>
          ))}
          {/*<ListItemButton
            onClick={(event) => handleNestedListToggle(event)}
            key={1}
            sx={{height: isMobile ? '48px' : '57px', py: '8px'}}
            selected={location.pathname === 'app/pod'}
          >
            <ListItemIcon>
              <SensorsIcon sx={{color: location.pathname === '/home' ? 'primary.main' : ''}}/>
            </ListItemIcon>
            <ListItemText primary="Pod"/>
            <ExpandLess sx={{
              transform: !nestedListToggle ? 'rotate(180deg)' : 'none',
              transition: theme.transitions.create('all', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.standard,
              }),
            }}/>
          </ListItemButton>
          <Collapse in={nestedListToggle && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Box pb={1}>
              <ListItemButton sx={{pl: 4}} onClick={() => navigate('/app/pod')}>
                <ListItemText primary="Sala macchine"/>
              </ListItemButton>
              </Box>
              <Box pb={1}>
              <ListItemButton sx={{pl: 4}} onClick={() => navigate('/app/pod')}>
                <ListItemText primary="Ventola Nord"/>
              </ListItemButton>
              </Box>
              <Box pb={1}>
              <ListItemButton sx={{pl: 4}} onClick={() => navigate('/app/pod')}>
                <ListItemText primary="Ventola Sud"/>
              </ListItemButton>
              </Box>
            </List>
          </Collapse>*/}
        </List>
        <List
          subheader={<ListSubheader component="div">App</ListSubheader>}
        >
          <Box pb={1}>
            <ListItemButton
              onClick={() => navigate('/settings')}
              key={2}
              sx={{height: isMobile ? '48px' : '57px', py: '8px'}}
              selected={location.pathname === 'app/settings'}
            >
              <ListItemIcon>
                <SettingsOutlinedIcon sx={{color: location.pathname === '/settings' ? 'primary.main' : ''}}/>
              </ListItemIcon>
              <ListItemText primary="Impostazioni"/>
            </ListItemButton>
          </Box>
          <Box pb={1}>
            <ListItemButton onClick={handleThemeSwitch} key={3} sx={{height: isMobile ? '48px' : '57px'}}>
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
          </Box>
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