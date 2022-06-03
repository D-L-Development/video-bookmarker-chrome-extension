console.log("Content Script Ran!");

const CURRENT_PAGE_URL = window.location.href;

let initialPageLoad = true;
let session = null;

/**
 * handles the messages sent from other scripts
 * this manages the nessecary events for the content script and servers
 * as a middle man for how all the resource scripts communicate with
 * the content script
 */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.action) {
    case "toggle":
      // TODO: figure out how to run code when the content script is initially loaded
      if (initialPageLoad) {
        initialPageLoad = false;
        session = new Session(CURRENT_PAGE_URL);
      } else {
        session.toggleSidemenuVisiblity();
      }
      sendResponse({ status: "success" });
      break;
    case "createNewSession":
      session.createNewSession(CURRENT_PAGE_URL);
      sendResponse({ status: "success" });
      break;
    case "loadNavigationPage":
      session.sideMenuUpdate(Session.NAGIVATION_PAGE_URL);
      sendResponse({ status: "success" });
      break;
    case "jumpToTimestamp":
      session.jumpToTimestamp(msg.payload);
      sendResponse({ status: "success" });
      break;
    case "deleteBookmark":
      session.deleteBookmark(msg.payload);
      sendResponse({ status: "success" });
      break;
    case "toggleBookmarkNesting":
      session.toggleBookmarkNesting(msg.payload);
      sendResponse({ status: "success" });
      break;
  }
});

// TODO: wire the event listeners (maybe)
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key == "b") {
    session.video.addBookmark();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key == ";") {
    // print bookmarks pretty
    session.video.storage.printBookmarksPretty();
    session.video.copyStringToClipboard(video.formatMapToTableString());
    console.log("I copied the table to your clipboard!");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key == ".") {
    // ask user for timestamp
    const userTimeStamp = prompt("Enter the timestamp HH:MM:SS");
    if (userTimeStamp) {
      const timeStamp = userTimeStamp.split(":"); // split it at the colons
      // minutes are worth 60 seconds. Hours are worth 60 minutes.
      const seconds =
        +timeStamp[0] * 60 * 60 + +timeStamp[1] * 60 + +timeStamp[2];

      // jump to that timestamp
      session.video.jumpToTimestamp(seconds);
    }
  }
});
