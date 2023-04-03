// helper functions
const appendHeaders = () => {
  const token = window.localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", Authorization: token };
  return headers;
};

const blockLink = (list) => {
  console.log("object");
  if (list.includes(window.location.origin)) {
    window.location.href = apiUrl + "/blocked";
  }
}

const fetchCurrentUser = async () => {
  try {
    const response = await fetch(`${apiUrl}/auth/current-user`, {
      headers: appendHeaders(),
    });
    const data = await response.json()
    const listOfBlocked = await data.restricted;
    
    const l = await listOfBlocked.map((item) => JSON.parse(item));
    return l;
  } catch (err) {
    return console.log(err);
  }
};
// console.log("List of blocked: ", listOfBlocked);
// alert("The test extension is up and running");
const apiUrl = "http://localhost:3200";
// const apiUrl = 'mongodb://localhost:27017'
// const list = ["https://www.betika.com", "https://www.youtube.com"];
const loadBlockedList = async () => {
  const res = await fetchCurrentUser();
  const data = await res;
  return data;
}

// let list = [];

loadBlockedList().then((res) => {
  const list = res;
  console.log("List 0: ", list)
  blockLink(list);
  // if (list.length > 1) {
  //   blockLink()
  // }
});

// apiCalls
// fetchCurrentUser().then((_res) => {
//   console.log(_res.restricted);
// });
