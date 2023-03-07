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

function AppData(props: any) {
    
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
            desc: item.description,
            vers: item.version,
            id: item._id,
          };
        });
        setData(modifiedData);
      })
      .catch(error => {
        console.log(error);
      });}, []);

      const [formData, setFormData] = useState<FormData>({
        name: '',
        department: '',
        apps: '',
        source_repo: '',
        source_pat: ''
      });

      const { onSelectApps } = props;

      const handleSelectApps = (event: any, selectedApps: any) => {
        onSelectApps(selectedApps);
      };
        
      return (
        <ThemeProvider theme={mdTheme}>
        <Autocomplete
        multiple
          disablePortal
          id="apps"
          options={data.map(item => item.name)}
          sx={{ width: '100%' }}
          onChange={handleSelectApps}
          renderInput={(params) => <TextField {...params} label="Apps to Install" />}
        />
        </ThemeProvider>
      );
}

export default AppData;