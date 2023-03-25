import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Button, ButtonGroup } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Title from './common/Title';
import Cookies from 'js-cookie';
import axios from 'axios';

// Read in cookie data 
function getCookie() {
  const myCookie = Cookies.get("authKey")
  return myCookie
}

function DatabaseData() {
  const [data, setData] = useState([]);
  const cookie = getCookie();
  useEffect(() => {
    axios.get('http://localhost:8081/api/v1/systems/list', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`, // send the cookie as a Bearer token
      },
    })
    .then(response => {
      const modifiedData = response.data.map(item => {
        return {
          ID: item._id,
          systemname: item.systemname,
          users: item.users,
          team: item.team,
          lastseen: item.lastseen !== -1 ? getRelativeTime(item.lastseen) : "Never",
          createdat: item.createdat,
        };
      });
      setData(modifiedData);
    })
    .catch(error => {
      console.log(error);
    });
}, []);

// Convert Unix timestamp to relative time
function getRelativeTime(unixTimestamp) {
  const now = new Date();
  const timestamp = new Date(unixTimestamp * 1000);
  const secondsAgo = (now.getTime() - timestamp.getTime()) / 1000;

  // Check how long ago the timestamp was and return a string accordingly
  if (secondsAgo < 60) {
    return `${Math.floor(secondsAgo)} seconds ago`;
  } else if (secondsAgo < 3600) {
    return `${Math.floor(secondsAgo / 60)} minutes ago`;
  } else if (secondsAgo < 86400) {
    return `${Math.floor(secondsAgo / 3600)} hours ago`;
  } else {
    return `${Math.floor(secondsAgo / 86400)} days ago`;
  }
}

const [deleteOpen, setDeleteOpen] = React.useState(false);
const [selectedSystemname, setSelectedSystemname] = useState('');
const [selectedId, setSelectedId] = useState('');
const handleDeleteClose = () => {
  setDeleteOpen(false);
};

const handleDeleteClickOpen = (systemname: string, id: string) => {
  setDeleteOpen(true);
  setSelectedSystemname(systemname);
  setSelectedId(id);
};

const handleDeleteTeam = async (name: string, id: string) => {
  try {
    const response = await axios.delete(`http://localhost:8081/api/v1/systems/${selectedId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`, // send the cookie as a Bearer token
      },
    });
    console.log(response.data);
    location.replace("/systems")
  } catch (error) {
    console.error(error); 
  }
};


return (
  <React.Fragment>
  <Title>Systems</Title>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>System Name</TableCell>
          <TableCell>Last Seen</TableCell>
          <TableCell>Created At</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.ID}>
            <TableCell>{item.systemname}</TableCell>
            <TableCell>{item.lastseen}</TableCell>
            <TableCell>{item.createdat}</TableCell>
            <TableCell>
              <ButtonGroup disableElevation variant="contained" color="primary" sx={{ marginLeft: 'auto' }}>
                <Tooltip title="Delete">
                  <IconButton aria-label="delete" onClick={() => handleDeleteClickOpen(item.systemname, item.ID)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Dialog open={deleteOpen} onClose={handleDeleteClose} >
                  <DialogTitle>
                    Are you sure?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to delete {selectedSystemname}?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                  <Button color="error" onClick={() => handleDeleteTeam(item.systemname, item.ID)}>Confirm</Button>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                  </DialogActions>
                </Dialog>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </React.Fragment>
);
}

export default DatabaseData;