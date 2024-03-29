/*Function for drop down with team select*/
function teamSelector() {
  let auth = getCookie();
  fetch("http://localhost:8081/api/v1/teams/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      teamSelect = [];
      let i = 0;
      while (i < res.length) {
        teamSelect.push(res[i]["name"]);
        i++;
      }
      var select = document.createElement("select");
      select.name = "teams";
      select.id = "teams";

      for (const tea of teamSelect) {
        var option = document.createElement("option");
        option.value = tea;
        option.text = tea.charAt(0).toUpperCase() + tea.slice(1);
        select.appendChild(option);
      }

      var label = document.createElement("label");
      label.innerHTML = "Choose your team: ";
      label.htmlFor = "teams";

      document
        .getElementById("container")
        .appendChild(label)
        .appendChild(select);
    });
}
/*Function for creating a table of all teams available*/
function teamInfo() {
  let auth = getCookie();
  fetch("http://localhost:8081/api/v1/teams/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      teamTable = [];
      var headers = ["Name", "Department", "Created", "Source Repo"];
      var table = document.createElement("TABLE"); //makes a table element for the page
      for (var i = 0; i < res.length; i++) {
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = res[i].name;
        row.insertCell(1).innerHTML = res[i].department;
        row.insertCell(2).innerHTML = res[i].createdat;
        row.insertCell(3).innerHTML = res[i].source_repo;
      }
      var header = table.createTHead();
      var headerRow = header.insertRow(0);
      for (var i = 0; i < headers.length; i++) {
        headerRow.insertCell(i).innerHTML = headers[i];
      }
      document.getElementById("teamList").append(table);
    });
}
/*Function for deleting a team*/
function deleteTeam() {
  var teamDel = document.getElementById("tdel").value;
  let userName = "testuser";
  let passWord = "testing";
  let auth = getCookie();
  authPost = `{"username": "${userName}", "password": "${passWord}"}`;
  fetch(`http://localhost:8081/api/v1/teams/${teamDel}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  });
  setTimeout(pageRefresh, 1000);
  function pageRefresh() {
    window.location.reload();
  }
}
/*function for creating a team via Alert*/
function createTeamAlert() {
  alert("Welcome to the create a team GUI, click Ok to continue.");
  let teamName = prompt("Please enter your team name:", "");
  let teamDep = prompt("Please enter your department name:", "");
  let sRepo = prompt("Please enter your source repo:", "");
  let sPat = prompt("Please enter your source PAT:", "");
  let tApps = "1111";
  let auth = getCookie();
  teamDatPost = `{"name": "${teamName}", "department": "${teamDep}", "source_repo": "${sRepo}", "source_pat": "${sPat}", "apps": "${tApps}"}`;
  fetch("http://localhost:8081/api/v1/teams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
    body: teamDatPost,
  }).then((res) => console.log(res));
  setTimeout(pageRefresh, 2000);
  function pageRefresh() {
    window.location.reload();
   }
}
/*Function to pull applications from backend and store them in local storage*/
async function pullApps() {
  if (localStorage.getItem("applications") === null) {
    let auth = getCookie();
    let appResponse = await fetch("http://localhost:8081/api/v1/apps/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    });
    let data = await appResponse.json();
    localStorage.setItem("applications", JSON.stringify(data));
  } else {
    console.log("Local data found...");
  }
}
/*Function to search localstorage for available applications*/
function searchApps() {
  let asearch = document.getElementById("aSearch").value;
  importApps = localStorage.getItem("applications");
  parseApps = JSON.parse(importApps);
  for (var i = 0; i < parseApps.length; i++) {
    if (parseApps[i]["name"] === asearch) {
      resultName = parseApps[i]["name"];
      resultDesc = parseApps[i]["description"];
      resultId = parseApps[i]["_id"]
      document.getElementById("appName").innerHTML = `Name: ${resultName}`;
      document.getElementById("appDesc").innerHTML = `Description: ${resultDesc}`;
      document.getElementById("appId").innerHTML = `App ID: ${resultId}`;
      break;
    } else {
      document.getElementById("appName").innerHTML = `App not found!`;
      document.getElementById("appDesc").innerHTML = ``;
      document.getElementById("appId").innerHTML = ``;
    }
  }
}
/*Function to check cookie value*/
function getCookie() {
  let name = "authKey";
  var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) {
    return match[2];
  } else {
    console.log("--something went wrong---");
  }
}
