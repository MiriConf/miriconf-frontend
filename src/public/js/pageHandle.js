/*function showTeam() {
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
          var ul = document.createElement("ul");
          ul.setAttribute("id", "teamList");

          teamList = [];
          let i = 0;
          while (i < res.length) {
            teamList.push(res[i]["name"]);
            i++;
          }
          document.getElementById("container2").appendChild(ul);
          teamList.forEach(renderTeamList);
          function renderTeamList(element) {
            var li = document.createElement("li");
            li.setAttribute("class", "item");

            ul.appendChild(li);

            li.innerHTML = li.innerHTML + element;
          }
        });
    });
}*/

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

          teamData = [];
          let i = 0;
          while (i < res.length) {
            teamData.push(res[i]);
            i++;
          }
          console.log(teamData);
          var select = document.createElement("div");
          select.name = "teamsInfo";
          select.id = "teamsInfo";

          for (const tea of teamSelect) {
            var option = document.createElement("p");
            option.value = tea;
            option.text = tea.charAt(0).toUpperCase() + tea.slice(1);
            select.appendChild(option);
          }

          var label = document.createElement("teamInfoLabel");
          label.innerHTML = "Teamsinformation ";
          label.htmlFor = "teams";

          document
            .getElementById("teamInfoContainer")
            .appendChild(label)
            .appendChild(select);
        });
    });
}
