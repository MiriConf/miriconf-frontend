'use client';

import axios from "axios";

export default function ListTeam() {
    function getCookie(name:string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts?.pop()?.split(';').shift();
    }
    
    let authKey = undefined;
    authKey = getCookie("authKey");
    let result = undefined;
    if (authKey) {
      result = authKey.replace(/['"]/g, '');
    }
 
    const config = {
      headers: { Authorization: `Bearer ${result}` }
    };
    


    async function doGetRequest() {
    
      let res = await axios.get('http://localhost:8081/api/v1/teams/list', config);
    
      let data = res.data;

      return data
    }
    
    let responseData = doGetRequest();

    return responseData
  }
  