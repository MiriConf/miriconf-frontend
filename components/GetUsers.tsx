import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Button, ButtonGroup } from '@mui/material';
import Title from './common/Title';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

// Read in cookie data 
function getCookie() {
  const myCookie = Cookies.get("authKey")
  return myCookie
}

function DatabaseData() {
  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditClickOpen = () => {
    setEditOpen(true);
  };
 const handleEditClose = () => {
    setEditOpen(false);
  };

  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const handleDeleteClickOpen = (username: string, id: string) => {
    setDeleteOpen(true);
    setSelectedUsername(username);
    setSelectedId(id);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const [data, setData] = useState([]);
  const cookie = getCookie();
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
          ID: item.ID,
          username: item.username,
          fullname: item.fullname,
          email: item.email,
          createdat: item.createdat,
        };
      });
      setData(modifiedData);
    })
    .catch(error => {
      console.log(error);
    });
}, []);

const handleDeleteUser = async () => {
  try {
    const response = await axios.delete(`http://localhost:8081/api/v1/users/${selectedId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`, // send the cookie as a Bearer token
      },
    });
    console.log(response.data);
    location.replace("/users")
  } catch (error) {
    console.error(error); 
  }
};

return (
  <React.Fragment>
    <Title>Users</Title> 
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Username</TableCell>
          <TableCell>Full Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.ID}>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.fullname}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.createdat}</TableCell>
            <TableCell>
              <ButtonGroup disableElevation variant="contained" color="primary" sx={{ marginLeft: 'auto' }}>
                <Tooltip title="Edit">
                  <IconButton aria-label="edit" onClick={handleEditClickOpen}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Dialog open={editOpen} onClose={handleEditClose} >
                  <DialogTitle>
                    Feature not available yet.
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Sorry, this feature is coming soon...
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleEditClose}>Close</Button>
                  </DialogActions>
                </Dialog>
                <Tooltip title="Delete">
                  <IconButton aria-label="delete" onClick={() => handleDeleteClickOpen(item.username, item.ID)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Dialog open={deleteOpen} onClose={handleDeleteClose} >
                  <DialogTitle>
                    Are you sure?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to delete {selectedUsername}?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                  <Button color="error" onClick={handleDeleteUser}>Confirm</Button>
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