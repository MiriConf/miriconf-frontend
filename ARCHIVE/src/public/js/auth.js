function loginAuth() {
  let userName = document.getElementById("userName").value;
  let passWord = document.getElementById("passWord").value;
  globalThis.authPost = `{"username": "${userName}", "password": "${passWord}"}`
  fetch("http://localhost:8081/api/v1/login", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: authPost
  }).then(res => res.text()) 
  .then((res) => res.replace(/\"/g, ""))
  .then ((res) => {
    if (res === "{error:password is incorrect}") {
      alert("Invalid password!");
    } else {
      document.cookie = "authKey="+res;
      location.replace("http://localhost:8080/team")
    }
  });
  };