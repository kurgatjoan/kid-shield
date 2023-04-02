const storeItem = (key, value) => {
  chrome.storage.sync.set({ [key]: value }, function () {
    console.log("Value is set to " + value);
  });
};

const fetchItem = (key) => {
  chrome.storage.sync.get([key], function (result) {
    console.log("Value currently is " + result[key]);
  });
};
