import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Cookies from 'js-cookie';
import axios from 'axios';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

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
          systemname: item.systemname,
          users: item.users,
          team: item.team,
          lastseen: item.lastseen,
          createdat: item.createdat,
        };
      });
      setData(modifiedData);
    })
    .catch(error => {
      console.log(error);
    });
}, []);

return (
  <React.Fragment>
  <Title>Systems</Title>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>System Name</TableCell>
          <TableCell>Users</TableCell>
          <TableCell>Team</TableCell>
          <TableCell>Last Seen</TableCell>
          <TableCell>Created At</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.systemname}>
            <TableCell>{item.systemname}</TableCell>
            <TableCell>{item.users}</TableCell>
            <TableCell>{item.team}</TableCell>
            <TableCell>{item.lastseen}</TableCell>'
            <TableCell>{item.createdat}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </React.Fragment>
);
}

export default DatabaseData;