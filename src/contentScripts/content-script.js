console.log("Content Script Ran!");
import { Session } from "./Session";
import { STATUS, UI_ACTIONS } from "./utility";

let initialPageLoad = true;
let session = null;

/**
 * handles the messages sent from other scripts. It performs operations on the DOM
 * returning true from the callback param tells the message port that the response will occur asynchronously
 */
chrome.runtime.onMessage.addListener((action, sender, sendResponse) => {
  if (action.type === UI_ACTIONS.TOGGLE_POPUP) {
    if (initialPageLoad) {
      initialPageLoad = false;
      session = new Session();
      // ? TODO: there's probably a better way to do this below
      setTimeout(() => {
        session.togglePopupVisibility(true);
        sendResponse({ status: STATUS.SUCCESS });
      }, 300);
      return true;
    } else {
      session.togglePopupVisibility();
      sendResponse({ status: STATUS.SUCCESS });
    }
  } else if (action.type === UI_ACTIONS.OPEN_POPUP) {
    session.togglePopupVisibility(true);
    sendResponse({ status: STATUS.SUCCESS });
  }
});

// TODO: remove this. It's for testing
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key == "`") {
    chrome.storage.sync.get(null, (response) => {
      console.log(response);
    });
  }
});

// TODO: remove this. It's for testing
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key == "*") {
    chrome.storage.sync.clear(() => {
      console.log("STORAGE CLEARED!");
    });
  }
});
