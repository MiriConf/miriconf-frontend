function loginAuth() {
  let userName = document.getElementById("userName").value;
  let passWord = document.getElementById("passWord").value;
  globalThis.authPost = `{"username": "${userName}", "password": "${passWord}"}`
  fetch("http://localhost:8081/api/v1/login", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: authPost
  }).then(res => res.text()) 
  .then ((res) => {
    console.log(res);
    document.cookie = "authKey="+res;
  });
  };