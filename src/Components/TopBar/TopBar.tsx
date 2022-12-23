import React, {useRef, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import {useTheme} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/SearchRounded';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import AddIcon from '@mui/icons-material/Add';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {
  alpha,
  Avatar,
  Badge,
  Box,
  Button,
  ButtonBase,
  Card, CircularProgress,
  Container,
  Divider,
  Grid,
  Grow,
  InputBase,
  ListItemIcon,
  ListItemText,
  Menu, Skeleton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  Zoom
} from "@mui/material";
import {AccountCircleOutlined, Logout} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import {useAuth} from "../Providers/Authorization/Authorization.provider";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {deleteCookie, setCookie} from "../../services/connectors/cookies";
import {useCurrentCompany} from "../Providers/Company/Company.provider";
import {defaultCompanies, getAllCompanies} from "../../services/companies.services";
import {getReasonAlert} from "../../utils/requestAlertHandler";
import {useAlert} from "../Providers/Alert/Alert.provider";
import CompanyCard from "../../Routes/Private/Companies/CompanyCard";
import {Id} from "../../services/entities";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
}));

const SearchBar = () => {
  let textInput = useRef(null);
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: alpha(theme.palette.text.secondary, 0.10),
        transition: 'all 0.5s ease',
        '&:hover': {
          backgroundColor: alpha(theme.palette.text.secondary, 0.15),
        }
      }}
    >
      <ButtonBase onClick={() => {
        setTimeout(() => { // @ts-ignore
          textInput.current.focus()
        }, 100)
      }}>
        <Container>
          <Grid container alignItems="center">
            <Grid item>
              <InputBase
                placeholder="Cerca…"
                inputRef={textInput}
                fullWidth
                classes={{
                  root: classes.inputRoot,
                }}
                endAdornment={
                  <SearchIcon/>
                }
                inputProps={{'aria-label': 'search'}}
              />
            </Grid>
          </Grid>
        </Container>
      </ButtonBase>
    </Card>
  );
}

type TopBarProps = {
  onMenuClick: () => void,
  isOpen: boolean,
  title?: string,
}

const TopBar: React.FC<TopBarProps> = ({onMenuClick, isOpen, title}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"))
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {company, setCompany} = useCurrentCompany();
  const [companies, setCompanies] = useState(defaultCompanies);
  const {loggedUser, setLoggedUser} = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElCompany, setAnchorElCompany] = React.useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorElUser);
  const {setAlertEvent} = useAlert();
  const openCompanyMenu = Boolean(anchorElCompany);

  const logout = async () => {
    deleteCookie("token")
    navigate("/login")
    setLoggedUser(null)
  }

  const handleClick = async (id: Id) => {
    setLoading(true)
    const company = companies.find(c => c.id === id);
    setCompany(company);
    await setCookie('company', JSON.stringify(company), 1).then(() =>
      navigate(`/app/companies/${id}`)
    )
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenCompanyMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCompany(event.currentTarget);
    setLoading(true)
    const fetchData = async () => {
      const res = await getAllCompanies()
      setCompanies(res);
    }

    fetchData()
      .then(() => setLoading(false))
      .catch((err) => {
        setAlertEvent(getReasonAlert(err));
        setLoading(false)
      })
  };

  const handleCloseCompanyMenu = () => {
    setAnchorElCompany(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const trigger = useScrollTrigger(
    {
      disableHysteresis: true,
      threshold: 20,
    }
  );

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        py={1} px={2}
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          borderBottom: theme.palette.mode === 'light' ? '#f0f0f0' : '#303030',
          bgcolor: alpha(theme.palette.background.default, 0.8),
          backdropFilter: 'blur(40px)',
          zIndex: theme => theme.zIndex.appBar,
        }}
      >
        <Grid item xs={6} container justifyContent="flex-start" alignItems="center" spacing={2}>
          <Grid item>
            <Zoom in={!isOpen} style={{transitionDelay: '200ms'}}>
              <IconButton
                sx={{borderRadius: '8px'}}
                size="small"
                value="check"
                onClick={onMenuClick}
              >
                <KeyboardArrowLeftOutlinedIcon sx={{transform: 'rotate(180deg)'}}/>
              </IconButton>
            </Zoom>
          </Grid>
          <Grid
            item
            sx={{
              transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
            ml={
              isMobile
                ? theme.spacing(0)
                : isLargeScreen
                  ? theme.spacing(40)
                  : isOpen
                    ? theme.spacing(40)
                    : theme.spacing(9)
            }>
            <Grow in style={{transformOrigin: '50% 0 0', transitionDelay: '50ms'}}>
              <Typography variant="h6" sx={{fontWeight: 600}}>
                <Box>
                  {!isMobile && <Button
                      color="inherit"
                      endIcon={<ExpandMoreIcon/>}
                      onClick={handleOpenCompanyMenu}
                      sx={{textTransform: 'none'}}
                  >
                    <Typography>
                      Alphabet Inc.
                    </Typography>
                  </Button>
                  }
                </Box>
              </Typography>
            </Grow>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
            <Grid item>
              {isMobile
                ? <Tooltip TransitionComponent={Zoom} title="Cerca" arrow>
                  <IconButton onClick={() => {
                  }}>
                    <SearchIcon/>
                  </IconButton>
                </Tooltip>
                : <SearchBar/>
              }
            </Grid>
            <Grid item>
              {isMobile &&
                  <Tooltip TransitionComponent={Zoom} title="Aziende" arrow>
                    <IconButton onClick={handleOpenCompanyMenu}>
                      <MoreVertOutlinedIcon/>
                    </IconButton>
                  </Tooltip>
              }
            </Grid>
            <Grid item>
              <IconButton sx={{borderRadius: '16px'}} disableRipple>
                <Badge variant="dot" overlap="rectangular" color="secondary">
                  <Avatar variant="rounded" sx={{borderRadius: '8px'}} onClick={handleOpenUserMenu}
                          alt="User profile picture"
                          src="https://mui.com/static/images/avatar/1.jpg"/>
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Menu
        anchorEl={anchorElUser}
        open={openUserMenu}
        onClose={handleCloseUserMenu}
        TransitionComponent={Zoom}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem key={1} onClick={() => navigate('/Account')}>
          <ListItemIcon>
            <AccountCircleOutlined
              fontSize="small"/>
          </ListItemIcon>
          <ListItemText>{loggedUser?.name + ' ' + loggedUser?.surname}</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <NotificationsOutlinedIcon/>
          </ListItemIcon>
          <ListItemText>Notifications</ListItemText>
        </MenuItem>
        <Divider/>
        <MenuItem key={3} onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small"/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorElCompany}
        open={openCompanyMenu}
        onClose={handleCloseCompanyMenu}
        onClick={handleCloseCompanyMenu}
        TransitionComponent={Zoom}
        anchorOrigin={{vertical: 'top', horizontal: 'left',}}
        transformOrigin={{vertical: 'top', horizontal: 'left',}}
      >
        {
          loading
            ? <Stack sx={{width: '194px', height: '164px'}} justifyContent="center" alignItems="center" px={2}>
              <CircularProgress size={32}/>
            </Stack>
            : <>
              {companies.map((c, index) => (
                <MenuItem
                  key={index}
                  selected={c.id === company.id}
                  onClick={()=>{handleClick(c.id)}}
                >
                  <ListItemIcon/>
                  <ListItemText primary={c.name}/>
                </MenuItem>
              ))}
              <Divider/>
              <MenuItem onClick={() => navigate('/app/companies')}>
                <ListItemIcon>
                  <MoreVertOutlinedIcon/>
                </ListItemIcon>
                <ListItemText>
                  All Companies
                </ListItemText>
              </MenuItem>
            </>
        }
      </Menu>
    </>
  );
};

const Logo = () => {
  return (
    <svg style={{marginTop: '7px'}} width="50" height="50" viewBox='0 0 177 100' fill='none'
         xmlns='http://www.w3.org/2000/svg'>
      <circle cx='72' cy='50' r='30' fill='#68DBFF'/>
      <ellipse cx='104.647' cy='50' rx='29.7059' ry='30' fill='#FF7917'/>
      <path fill-rule='evenodd' clip-rule='evenodd'
            d='M88.4039 75.1221C96.5911 69.7652 102 60.5143 102 50C102 39.4858 96.5911 30.2348 88.4039 24.878C80.2971 30.2348 74.9412 39.4858 74.9412 50C74.9412 60.5143 80.2971 69.7652 88.4039 75.1221Z'
            fill='#5D2C02'/>
    </svg>
  );
}

export default TopBar;