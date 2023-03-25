import React, { useState, useEffect } from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SystemsData from './GetSystems';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  DialogContentText
} from '@mui/material';
import { useSnackbar } from 'notistack';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface FormData {
  systemname: string;
  users: string;
  team: string;
}

const mdTheme = createTheme();

// Read in cookie data 
function getCookie() {
  const myCookie = Cookies.get("authKey")
  return myCookie
}

function DashboardContent() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(true);
  function toggleDrawer() {
    setOpen(!open);
  };

  const cookie = getCookie();

  const [inputValue, setInputValue] = React.useState("");
  console.log("selected", inputValue);

  const [formData, setFormData] = useState<FormData>({
    systemname: '',
    users: '',
    team: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const [joinCodeOpen, setJoinCodeOpen] = React.useState(false);

  function handleJoinOpen() {
    setJoinCodeOpen(true);
  };

  function handleJoinClose() {
    setJoinCodeOpen(false);
  };

  const [joinToken, setJoinToken] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/v1/systems', formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`, // send the cookie as a Bearer token
        },
      });
      console.log(response.data);
      if (response.data.hasOwnProperty("error")) {
        enqueueSnackbar('Invalid system, try again');
      } else {
        setJoinToken(response.data)
        handleJoinOpen()
      }  
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  function refresh() {
    location.replace("/systems")
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8081/api/v1/users/list', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`, // send the cookie as a Bearer token
      },
    })
    .then(response => {
      const modifiedData = response.data.map(item => {
        return {
          ID: item._id,
          username: item.username,
        };
      });
      setData(modifiedData);
    })
    .catch(error => {
      console.log(error);
    });
}, []);

const [teamData, setTeamData] = useState([]);
useEffect(() => {
  axios.get('http://localhost:8081/api/v1/teams/list', {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie}`, // send the cookie as a Bearer token
    },
  })
  .then(response => {
    const modifiedData = response.data.map(item => {
      return {
        ID: item._id,
        name: item.name,
      };
    });
    setTeamData(modifiedData);
  })
  .catch(error => {
    console.log(error);
  });
}, []);

const handleSelectUsers = (event: any, selectedUsers: any) => {
  const selectedUserIDs = selectedUsers.map(user => user.ID);
  setFormData({ ...formData, users: selectedUserIDs })
};

const handleSelectTeams = (event: any, selectedTeams: any) => {
  setFormData({ ...formData, team: selectedTeams.ID })
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
                  <SystemsData></SystemsData>
                  <Button variant="contained" onClick={handleOpen} sx={{ mt: 3, mb: 2 }} >Add System</Button>
                </Paper>
              </Grid>
              <Dialog open={dialogOpen} onClose={handleClose}>
                  <DialogTitle>Create System</DialogTitle>
                  <form onSubmit={handleSubmit}>
                    <DialogContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControl>
                            <TextField
                              fullWidth
                              sx={{ width: 400 }}
                              label="System Name"
                              value={formData.systemname}
                              onChange={(event) => setFormData({ ...formData, systemname: event.target.value })}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Autocomplete
                            multiple                       
                            options={data}
                            getOptionLabel={(item) => item.username}
                            sx={{ width: 400 }}
                            onChange={handleSelectUsers}
                            renderInput={(params) => <TextField {...params} label="Select Users..." />}
                          />                        
                        </Grid>
                        <Grid item xs={12}>
                          <Autocomplete
                            options={teamData}
                            sx={{ width: 400 }}
                            getOptionLabel={(item) => item.name}
                            onChange={handleSelectTeams}
                            renderInput={(params) => {
                              return (
                                <TextField
                                  {...params}
                                  label={"Team"}
                                  variant="outlined"
                                  value={params}
                                />
                              );
                            }}
                          />
                        </Grid>
                      </Grid>  
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit" variant="contained">Create</Button>
                    </DialogActions>
                  </form>
                </Dialog>
                <Dialog
                  open={joinCodeOpen}
                  onClose={handleJoinClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Your Join Token
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      This is the token you will use to join your system to the server, make sure you copy this down somewhere because you won't be able to generate a new one.
                    </DialogContentText>
                    <br></br>
                    <TextField
                      id="join-code"
                      label="Agent Join Code:"
                      defaultValue="token"
                      sx={{ width: 400 }}
                      value={joinToken}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={refresh}>Close</Button>
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
