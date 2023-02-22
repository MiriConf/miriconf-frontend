import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './common/Shelf';
import AppBar from './common/AppBar';
import Drawer from './common/Drawer';
import UsersData from './GetUsers';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Cookies from 'js-cookie';
import axios from 'axios';

//function SubmitUser() {
//  const cookie = getCookie();
//  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//    const formData = new FormData(event.currentTarget);
//    const data = {"username": formData.get('username'), "password": formData.get('password')};
//    axios.post('http://localhost:8081/api/v1/users', {
//      headers: {
//        "Content-Type": "application/json",
//        Authorization: `Bearer ${cookie}`, // send the cookie as a Bearer token
//      },
//      firstName: 'Fred',
//      lastName: 'Flintstone'
//    })
//    .then(function (response) {
//      console.log(response);
//      location.replace("/users");
//    })
//    .catch(function (error) {
//      console.log(error);
//    });
//  }
//}

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [openCreate, setOpenCreate] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClickOpen = () => {
    setOpenCreate(true);
  };

  const handleClose = () => {
    setOpenCreate(false);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Miriconf
            </Typography>
            <Button color="inherit" href="/login">Login</Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Users */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <UsersData></UsersData>
                  <Button variant="contained" onClick={handleClickOpen} sx={{ mt: 3, mb: 2 }} >Add User</Button>
                </Paper>
              </Grid>
              <Dialog open={openCreate} onClose={handleClose}>
                <DialogTitle>Create a new user</DialogTitle>
                <DialogContent>
                  <FormControl fullWidth sx={{ mr: 2, mt: 1, mb: 1 }}>
                    <InputLabel>Username</InputLabel>
                    <Input
                      required
                      id="username"
                      type="text"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mr: 2, mt: 1, mb: 1 }}>
                    <InputLabel>Full Name</InputLabel>
                    <Input
                      required
                      id="fullname"
                      type="text"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mr: 2, mt: 1, mb: 1 }}>
                    <InputLabel>Email</InputLabel>
                    <Input
                      required
                      id="email"
                      type="text"
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mr: 2, mt: 1, mb: 1 }}>
                    <InputLabel>Password</InputLabel>
                    <Input
                      required
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" onClick={handleClose}>Submit</Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
