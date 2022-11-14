/*Function for drop down with team select*/
function teamSelector() {
  let userName = "testuser";
  let passWord = "testing";
  globalThis.authPost = `{"username": "${userName}", "password": "${passWord}"}`;
  fetch("http://localhost:8081/api/v1/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: authPost,
  })
    .then((res) => res.text())
    .then((res) => res.replace(/\"/g, ""))
    .then((res) => {
      fetch("http://localhost:8081/api/v1/teams/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${res}`,
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
    });
}
/*Function for creating a table of all teams available*/
function teamInfo() {
  let userName = "testuser";
  let passWord = "testing";
  globalThis.authPost = `{"username": "${userName}", "password": "${passWord}"}`;
  fetch("http://localhost:8081/api/v1/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: authPost,
  })
    .then((res) => res.text())
    .then((res) => res.replace(/\"/g, ""))
    .then((res) => {
      fetch("http://localhost:8081/api/v1/teams/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${res}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          teamTable = [];
          var headers = ["Name", "Department", "Created", "ID"];
          var table = document.createElement("TABLE"); //makes a table element for the page
          for (var i = 0; i < res.length; i++) {
            var row = table.insertRow(i);
            row.insertCell(0).innerHTML = res[i].name;
            row.insertCell(1).innerHTML = res[i].department;
            row.insertCell(2).innerHTML = res[i].createdat;
            row.insertCell(3).innerHTML = res[i]._id;
          }
          var header = table.createTHead();
          var headerRow = header.insertRow(0);
          for (var i = 0; i < headers.length; i++) {
            headerRow.insertCell(i).innerHTML = headers[i];
          }
          document.getElementById("teamList").append(table);
        });
    });
}
/*Function for creating a new team*/
function createTeam() {
  var teamName = document.getElementById("tname").value;
  var teamDep = document.getElementById("tdepartment").value;
  console.log(teamName, teamDep);
  let userName = "testuser";
  let passWord = "testing";
  authPost = `{"username": "${userName}", "password": "${passWord}"}`;
  teamDatPost = `{"name": "${teamName}", "department": "${teamDep}"}`;
  fetch("http://localhost:8081/api/v1/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: authPost,
  })
    .then((res) => res.text())
    .then((res) => res.replace(/\"/g, ""))
    .then((res) => {
      fetch("http://localhost:8081/api/v1/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${res}`,
        },
        body: teamDatPost,
      });
    });
  setTimeout(pageRefresh, 1000);
  function pageRefresh() {
    window.location.reload();
  }
}
/*Function for deleting a team*/
function deleteTeam() {
  var teamDel = document.getElementById("tdel").value;
  console.log(teamDel);
  let userName = "testuser";
  let passWord = "testing";
  authPost = `{"username": "${userName}", "password": "${passWord}"}`;
  fetch("http://localhost:8081/api/v1/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: authPost,
  })
    .then((res) => res.text())
    .then((res) => res.replace(/\"/g, ""))
    .then((res) => {
      fetch(`http://localhost:8081/api/v1/teams/${teamDel}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${res}`,
        },
      });
    });
  setTimeout(pageRefresh, 1000);
  function pageRefresh() {
    window.location.reload();
  }
}
