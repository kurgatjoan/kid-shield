// alert("The test extension is up and running");
const apiUrl = "http://localhost:3200";
const list = ["https://www.betika.com", "https://www.facebook.com/",""];
// const list = [];

// helper functions
const appendHeaders = () => {
  const token = window.localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", Authorization: token };
  return headers;
};

const fetchCurrentUser = () => {
  return fetch(`${apiUrl}/auth/current-user`, {
    headers: appendHeaders(),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// apiCalls
fetchCurrentUser().then((_res) => {
  console.log(_res);
});

if (list.includes(window.location.origin)) {
  window.location.href = apiUrl + "/blocked";
} else {
  // alert("allowed location");
}
