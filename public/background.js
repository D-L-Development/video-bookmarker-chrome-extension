console.log("Background.js Script Ran!");

const TOGGLE_POPUP = "toggle popup";
chrome.action.onClicked.addListener((tab) => {
  // prevent this from working on chrome://extensions page
  if (tab.url.indexOf("chrome://") === -1) {
    chrome.tabs.sendMessage(tab.id, { type: TOGGLE_POPUP });
  }
});
