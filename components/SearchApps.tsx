import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const mdTheme = createTheme();

// Read in cookie data 
function getCookie() {
  const myCookie = Cookies.get("authKey")
  return myCookie
}

function AppData() {
    
    const [data, setData] = useState([]);
    const cookie = getCookie();
    useEffect(() => {
      axios.get('http://localhost:8081/api/v1/apps/list', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`, // send the cookie as a Bearer token
        },
      })
      .then(response => {
        const modifiedData = response.data.map(item => {
          return {
            name: item.name,
            department: item.description,
            createdat: item.version,
            source_repo: item._id,
          };
        });
        setData(modifiedData);
      })
      .catch(error => {
        console.log(error);
      });}, []);

      return (
        <ThemeProvider theme={mdTheme}>
        <Autocomplete
        multiple
          disablePortal
          id="Select Apps"
          options={data.map(item => item.name)}
          sx={{ width: 600 }}
          renderInput={(params) => <TextField {...params} label="Apps" />}
        />
        </ThemeProvider>
      );
}

export default AppData;