console.log("Background.js Script Ran!");

const TOGGLE_POPUP = "toggle popup";
const OPEN_OPTIONS = "open options page";

chrome.action.onClicked.addListener((tab) => {
  // prevent this from working on chrome://extensions page
  if (
    tab.url.indexOf("chrome://") === -1 &&
    tab.url.indexOf("chrome-extension://") === -1
  ) {
    chrome.tabs.sendMessage(tab.id, { type: TOGGLE_POPUP });
  }
});

chrome.runtime.onMessage.addListener((action, sender, sendResponse) => {
  switch (action.type) {
    case OPEN_OPTIONS:
      return chrome.runtime.openOptionsPage();
  }
});
