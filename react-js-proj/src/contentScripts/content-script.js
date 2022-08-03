console.log("Content Script Ran!");
import { Session } from "./Session";
import { getErrorMsg, MSG } from "./utility";

// TODO: replace all strings with constants

let initialPageLoad = true;
let session = null;

/**
 * handles the messages sent from other scripts. It performs operations on the DOM
 * returning from the callback param tells the message port that the response will occur asynchronously
 */
chrome.runtime.onMessage.addListener((action, sender, sendResponse) => {
  if (action.type === MSG.TOGGLE_POPUP) {
    if (initialPageLoad) {
      initialPageLoad = false;
      session = new Session();
    } else {
      session.togglePopupVisibility();
    }
    sendResponse({ status: MSG.SUCCESS });
  } else {
    session
      .dispatch(action)
      .then((payload) => {
        sendResponse({ status: MSG.SUCCESS, payload });
      })
      .catch((error) => {
        sendResponse({ status: MSG.FAILURE, message: getErrorMsg(error) });
      });
    return true;
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
