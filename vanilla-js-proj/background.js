console.log("Background.js Script Ran!");

chrome.action.onClicked.addListener((tab) => {
  // prevent this from working on chrome://extensions page
  if (tab.url.indexOf("chrome://") === -1) {
    chrome.tabs.sendMessage(tab.id, { action: "toggle" }, function (response) {
      if (response.status === "success") {
        console.log(`Message sent to tab ${tab.id}`);
      }
    });
  }
});
