import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
    axios.get('http://localhost:8081/api/v1/users/list', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`, // send the cookie as a Bearer token
      },
    })
    .then(response => {
      const modifiedData = response.data.map(item => {
        return {
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
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.username}>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.fullname}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.createdat}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </React.Fragment>
);
}

export default DatabaseData;