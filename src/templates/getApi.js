function httpGet(theUrl) {
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", theUrl, false); 
    xmlHttpReq.send(null);
    return xmlHttpReq.responseText;
  }
   console.log(httpGet('http://localhost:8081/api/v1/teams/list'));

function getTeam(member) {
    let xmlHttpReq = new XMLHttpRequest();
    teamUrl = 'http://localhost:8081/api/v1/teams/get/' + member;
    xmlHttpReq.open("GET", teamUrl, false); 
    xmlHttpReq.send(null);
    return xmlHttpReq.responseText;
  }

  function getTeam(member) {
    let xmlHttpReq = new XMLHttpRequest();
    teamUrl = 'http://localhost:8081/api/v1/groups/get/' + member;
    xmlHttpReq.open("GET", teamUrl, false); 
    xmlHttpReq.send(null);
    return xmlHttpReq.responseText;
  }