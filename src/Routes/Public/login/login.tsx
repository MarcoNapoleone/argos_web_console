import * as React from 'react';
import {useContext, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../Components/Providers/Authorization/Authorization.provider";
import {Alert, alpha, Card, Checkbox, CircularProgress, Collapse, FormControlLabel, Zoom} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useAlertContext} from "../../../Components/Providers/Alert/Alert.provider";
import {login} from "../../../services/auth.services";


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://google,com/">
        Argos
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LogIn() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [error, setError] = useState({status: false, message: 'error'});
  const [loading, setLoading] = useState(false);
  const {loggedUser, setLoggedUser} = useAuth();
  const {setAlertEvent} = useContext(useAlertContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      setLoading(true)
      login(data.get('username') as string, data.get('password') as string)
        .then(() => navigate('/app/companies'))
    } catch (e) {
      setLoading(false)
      setError({
        status: true,
        message: e.message
      });
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Card variant="outlined" sx={{marginTop: 8, borderRadius: '32px'}}
      >
        <Box
          p={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              backgroundColor: alpha(theme.palette.secondary.main, 0.2),
            }}
          >
            {loading
              ? <Zoom in key={1}><CircularProgress color="secondary" size={24}/></Zoom>
              : <Zoom in key={2}><LockOutlinedIcon color="secondary"/></Zoom>
            }
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary"/>}
              label="Ricordami"
            />
            <Collapse in={error.status} sx={{my: 1}}>
              <Alert sx={{borderRadius: '8px'}} severity="error">{error.message}</Alert>
            </Collapse>
            <Button
              color="primary"
              type="submit"
              fullWidth
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.25),
                },
              }}
            ><Box mx={2}>
              Log In
            </Box>
            </Button>
          </Box>
        </Box>
      </Card>
      <Copyright sx={{mt: 8, mb: 4}}/>
    </Container>
  );
}
