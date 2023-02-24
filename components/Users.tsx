import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
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
import Cookies from 'js-cookie';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  TextField
} from '@mui/material';
import { useSnackbar } from 'notistack';


interface FormData {
  username: string;
  fullName: string;
  email: string;
  password: string;
}

const mdTheme = createTheme();

function DashboardContent() {
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [formData, setFormData] = useState<FormData>({
    username: '',
    fullName: '',
    email: '',
    password: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/v1/users', formData);
      console.log(response.data);
      if (response.data.hasOwnProperty("error")) {
        enqueueSnackbar('Invalid user, try again');
      } else {
        location.replace("/users")
      }  
    } catch (error) {
      console.error(error);
    }

    handleClose();
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
                  <Button variant="contained" onClick={handleOpen} sx={{ mt: 3, mb: 2 }} >Add User</Button>
                </Paper>
              </Grid>
                <Dialog open={dialogOpen} onClose={handleClose}>
                  <DialogTitle>Create User</DialogTitle>
                  <form onSubmit={handleSubmit}>
                    <DialogContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControl>
                            <TextField
                              fullWidth
                              sx={{ width: '200%' }}
                              label="Username"
                              value={formData.username}
                              onChange={(event) => setFormData({ ...formData, username: event.target.value })}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl>
                            <TextField
                              fullWidth
                              sx={{ width: '200%' }}
                              label="Full Name"
                              value={formData.fullName}
                              onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl>
                            <TextField
                              fullWidth
                              sx={{ width: '200%' }}                              
                              label="Email"
                              value={formData.email}
                              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl>
                            <TextField
                              fullWidth
                              sx={{ width: '200%' }}                              
                              label="Password"
                              type="password"
                              value={formData.password}
                              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>  
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit" variant="contained">Create</Button>
                    </DialogActions>
                  </form>
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
