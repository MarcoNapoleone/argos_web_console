import React, {FC, useContext, useState} from "react";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  Typography,
  useMediaQuery
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {DarkModeOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {StandardCSSProperties} from "@mui/system/styleFunctionSx/StandardCssProperties";
import {ThemeModeContext} from "../../../Components/Providers/Theme/Theme";
import MainPage from "../../../Components/MainPage/MainPage";
import PageFrame from "../../../Components/PageFrame/PageFrame";

export interface SelectedPalette {
  p: {
    color: number,
    gradient: number,
  },
  s: {
    color: number,
    gradient: number,
  }
}

const SettingsPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {mode, setMode, palette, setPalette} = useContext(ThemeModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openPaletteMenu, setOpenPaletteMenu] = useState(false);

  return (
    <PageFrame>
      <MainPage
        title={"Settings"}
      >
        <Card variant="outlined">
          <Box px={2} py={1}>
            <List
              sx={{width: '100%', bgcolor: 'background.paper'}}
            >
              <ListItem>
                <ListItemIcon>
                  <DarkModeOutlined/>
                </ListItemIcon>
                <ListItemText id="theme-switch" primary="Tema scuro"/>
                <Switch
                  edge="end"
                  onChange={() => {
                  }}
                  checked={theme.palette.mode === 'dark'}
                />
              </ListItem>
              <ListItemButton onClick={() => {
              }}>
                <ListItemIcon>
                  <PaletteOutlinedIcon/>
                </ListItemIcon>
                <ListItemText id="theme-switch" primary="Palette"/>
                <Stack direction="row" spacing={1}>
                  <PaletteColorBox selected title="P" color={theme.palette.primary.main}/>
                  <PaletteColorBox selected title="S" color={theme.palette.secondary.main}/>
                </Stack>
              </ListItemButton>
            </List>
          </Box>
        </Card>
        <SettingCard
          title="Utenti"
          primary="Gestione degli utenti"
          secondary="Utenti, accessi, permessi, email e password"
          icon={<GroupOutlinedIcon/>}
          onClick={() => navigate('/impostazioni/utenti')}
        />
        <SettingCard
          title="Ruoli"
          primary="Gestione dei ruoli"
          secondary="Ruoli, autorizzazioni, pagine"
          icon={<AdminPanelSettingsOutlinedIcon/>}
          onClick={() => navigate('/impostazioni/ruoli')}
        />
        <SettingCard
          title="Profilo"
          primary="Gestione del tuo profilo"
          secondary="Nome, cognome, email e password"
          icon={<AccountCircleOutlinedIcon/>}
          onClick={() => navigate('/account')}
        />
        <Dialog
          open={openPaletteMenu}
          onClose={() => {
          }}
          disableEscapeKeyDown
          scroll="paper"
          TransitionComponent={Fade}
          PaperProps={{
            sx: {
              boxShadow: 0,
              borderRadius: theme.spacing(4),
            }
          }}
          fullScreen={isMobile}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <Box px={!isMobile && 1} pt={!isMobile && 2}>

            </Box>
          </DialogContent>
          <Box pr={2} pb={2}>
            <DialogActions>
              <Button color="inherit" onClick={() => {
              }}>annulla</Button>
              <Button color="inherit" onClick={() => {
              }}>reset</Button>
              <Button
                color="primary"
                onClick={() => {
                }}
              >
                salva
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </MainPage>
    </PageFrame>
  );
}

type SettingCardType = {
  title: string,
  primary: string,
  secondary: string,
  icon: any,
  onClick: () => void,
}

const SettingCard: FC<SettingCardType> = (
  {
    title,
    primary,
    secondary,
    icon,
    onClick
  }
) => {
  return (
    <Grid container direction="column" spacing={1} pt={3}>
      <Grid item>
        <Box px={2}>
          <Typography variant="h6">
            {title}
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Card variant="outlined">
          <CardActionArea onClick={onClick}>
            <Box px={2}>
              <List>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end">
                      <ArrowForwardIcon/>
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={primary}
                    secondary={secondary}
                  />
                </ListItem>
              </List>
            </Box>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}


const PaletteColorBox = (
  props: {
    title: string | number,
    color: StandardCSSProperties['backgroundColor'],
    square?: boolean,
    selected?: boolean,
    onClick?: () => void,
  }
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Avatar
      variant="square"
      onClick={props.onClick}
      sx={{
        width: isMobile ? '9vw' : '38px',
        height: isMobile ? '9vw' : '38px',
        bgcolor: props.color,
        transition: theme.transitions.create(['all', 'transform'], {
          duration: theme.transitions.duration.standard,
        }),
        border: `solid 1px ${theme.palette.background.default}`,
        borderRadius: props.selected ? theme.spacing(4) : 0,
        "&:hover": {
          borderRadius: props.selected ? theme.spacing(4) : '8px',
        }
      }}
    >
      <Typography variant="body1" color="contrast"
                  sx={{fontWeight: 600}}>{Boolean(props.title) && props.title}</Typography>
    </Avatar>
  )
}

export default SettingsPage;