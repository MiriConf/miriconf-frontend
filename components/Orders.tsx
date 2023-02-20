import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
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
    axios.get('http://localhost:8081/api/v1/teams/list', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`, // send the cookie as a Bearer token
      },
    })
    .then(response => {
      const modifiedData = response.data.map(item => {
        return {
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
    });
}, []);

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
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.department}</TableCell>
            <TableCell>{item.createdat}</TableCell>
            <TableCell>{item.source_repo}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more Teams
      </Link>
    </React.Fragment>
);
}

export default DatabaseData;