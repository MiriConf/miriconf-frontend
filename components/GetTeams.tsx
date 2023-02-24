import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './common/Title';
import Cookies from 'js-cookie';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';
import UploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Button, ButtonGroup } from '@mui/material';
import { useSnackbar } from 'notistack';

// Read in cookie data 
function getCookie() {
  const myCookie = Cookies.get("authKey")
  return myCookie
}

function TeamsData() {
  const { enqueueSnackbar } = useSnackbar();

   const [data, setData] = useState([]);

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

    const cookie = getCookie();
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
            department: item.department,
            createdat: item.createdat,
            source_repo: item.source_repo,
          };
        });
        setData(modifiedData);
      })
      .catch(error => {
        console.log(error);
      });}, []);

    const handleDeleteTeam = async (name: string, id: string) => {
      try {
        const response = await axios.delete(`http://localhost:8081/api/v1/teams/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie}`, // send the cookie as a Bearer token
          },
        });
        console.log(response.data);
        location.replace("/teams")
      } catch (error) {
        console.error(error); 
      }
    };

    const handleBuild = async (name: string, id: string) => {
      try {
        const response = await axios.get(`http://localhost:8081/api/v1/template/build/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie}`, // send the cookie as a Bearer token
          },
        });
        console.log(response.data);
        if (response.data.hasOwnProperty("error")) {
          enqueueSnackbar('Invalid team, try again');
        } else {
          enqueueSnackbar(`Successful build on ${name}`);
        }  
      } catch (error) {
        console.error(error); 
      }
    };

  return (
    <React.Fragment>
      <Title>Teams</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Source Repo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.ID}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.createdat}</TableCell>
                <TableCell>{item.source_repo}</TableCell>
                <TableCell>
                  <ButtonGroup disableElevation variant="contained" color="primary" sx={{ marginLeft: 'auto' }}>
                    <IconButton aria-label="edit" onClick={handleEditClickOpen}>
                      <EditIcon />
                    </IconButton>
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
                    <IconButton aria-label="build" onClick={() => handleBuild(item.name, item.ID)}>
                      <BuildIcon />
                    </IconButton>
                    <IconButton aria-label="push" onClick={() => handleDeleteClickOpen(item.username, item.ID)}>
                      <UploadIcon />
                    </IconButton>
                    <Dialog open={deleteOpen} onClose={handleDeleteClose} >
                      <DialogTitle>
                        Are you sure you want to publish your configuration?
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Are you sure you want to publish?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button color="error" onClick={() => handleDeleteClickOpen(item.username, item.ID)}>Confirm</Button>
                        <Button onClick={handleDeleteClose}>Cancel</Button>
                      </DialogActions>
                    </Dialog>
                    <IconButton aria-label="delete" onClick={() => handleDeleteClickOpen(item.username, item.ID)}>
                      <DeleteIcon />
                    </IconButton>
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
                      <Button color="error" onClick={() => handleDeleteTeam(item.name, item.ID)}>Confirm</Button>
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

export default TeamsData;