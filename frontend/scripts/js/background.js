function openTab() {
  console.log("background");
  var newTab = browser.tabs.create({
    url: "http://localhost:3200",
    active: true,
  });
}

browser.browserAction.onClicked.addListener(openTab);
