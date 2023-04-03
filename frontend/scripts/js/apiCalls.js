const apiUrl = "";

// const fetchCats = async () => {
//   const res = await fetch(apiUrl);
//   const data = await res;
//   console.log(data);
// }

// helper functions
const storeToken = (response) => {
  const token = response.headers.get("Authorization");
  window.localStorage.setItem("token", token);
};

const appendHeaders = () => {
  const token = window.localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", Authorization: token };
  return headers;
};

// helper functions end

// api calls
const signUp = (user) => {
  // sample user: {email: "olly@x.com", password:"ss"}
  return fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then((response) => {
    storeToken(response);
    return response.json();
  });
};

const Login = (loginDetails) => {
  // sample loginDetails: {email: "olly@x.com", password:"ss"}
  return fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginDetails),
  }).then((response) => {
    storeToken(response);
    return response.json();
  });
};

const fetchCurrentUser = () => {
  return fetch(`${apiUrl}/auth/current-user`, {
    headers: appendHeaders(),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const addToBlockList = (_list) => {
  // sample list item: {name:"", url:""}

  return fetch(`${apiUrl}/api/block`, {
    method: "PATCH",
    headers: appendHeaders(),
    body: JSON.stringify(_list),
  }).then((response) => {
    return response.json();
  });
};

const deleteFromBlockList = (_toRemove) => {
  // sample to remove item: {name:"", url:""}

  return fetch(`${apiUrl}/api/block`, {
    method: "DELETE",
    headers: appendHeaders(),
    body: JSON.stringify(_toRemove),
  }).then((response) => {
    return response.json();
  });
};

const logout = (event) => {
  window.localStorage.removeItem("token");
  window.location.href = "/login";
};

// utility functions
const checkAuth = () => {
  const _signInBtn = document.getElementById("sign-in-btn");

  return fetchCurrentUser()
    .then((_res) => {
      if (_signInBtn && _res) {
        _signInBtn.innerHTML = `<a href="/login" onclick="logout(event)" class="button">Log Out</a>`;
      }
      return true;
    })
    .catch((_err) => {
      console.log("err: ", _err);
      return false;
    });
};

checkAuth();
