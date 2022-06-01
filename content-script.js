console.log("Content Script Ran!");

const NAGIVATION_PAGE_URL = chrome.runtime.getURL("navigation.html");
const SIDEBAR_PAGE_URL = chrome.runtime.getURL("popup.html");

let initialPageLoad = true;
let session = null;

// handle the messages sent from other scripts
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.action) {
    case "toggle":
      // TODO: figure out how to run code when the content script is initially loaded
      if (initialPageLoad) {
        initialPageLoad = false;
        initSession();
      } else {
        session.toggleSidemenuVisiblity();
      }
      sendResponse({ status: "success" });
      break;
    case "createNewSession":
      createNewSession();
      sendResponse({ status: "success" });
      break;
    case "loadNavigationPage":
      session.sideMenuUpdate(NAGIVATION_PAGE_URL);
      sendResponse({ status: "success" });
      break;
    case "jumpToTimestamp":
      jumpToTimestamp(msg.payload);
      sendResponse({ status: "success" });
      break;
    case "deleteBookmark":
      deleteBookmark(msg.payload);
      sendResponse({ status: "success" });
      break;
    case "toggleBookmarkNesting":
      toggleBookmarkNesting(msg.payload);
      sendResponse({ status: "success" });
      break;
  }
});

function initSession() {
  // TODO 01: check the URL against the storage and see if there's a session already created for the URL
  // TODO 02: if there's already a session, then just load it and get the current video, otherwise load the navigation page
  session = new Session();
  if (session.sessionExists(window.location.href)) {
    getVideoElement()
      .then((res) => {
        session.video = new Video(res.video);
        // create the side menu for found video
        session.sideMenuUpdate(SIDEBAR_PAGE_URL);
        session.toggleSidemenuVisiblity();
      })
      .catch((error) => {
        session.video = null;
        alert("URL found, but there is not video in the document");
      });
  } else {
    // TODO: render the navigation page
    session.sideMenuUpdate(NAGIVATION_PAGE_URL);
    session.toggleSidemenuVisiblity();
  }
}

// resolves a promise with an HTML video element
// or throw an error
function getVideoElement(repeatCount = 20) {
  // return a promise
  return new Promise((resolve, reject) => {
    // declare time interval
    const intervalId = setInterval(() => {
      // if repeated (repeatCount) times, then reject
      if (--repeatCount <= 0) {
        clearInterval(intervalId);
        reject("Failed to find video!");
      }

      // try to get video again
      const video = document.querySelector("video");
      if (video) {
        clearInterval(intervalId);
        resolve({ video });
      }
    }, 500);
  });
}

function createNewSession() {
  // try to get an HTML video element
  getVideoElement()
    .then((res) => {
      session.video = new Video(res.video);
      session.sideMenuUpdate(SIDEBAR_PAGE_URL);

      document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key == "b") {
          video.addBookmark();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key == ";") {
          // print bookmarks pretty
          video.storage.printBookmarksPretty();
          video.copyStringToClipboard(video.formatMapToTableString());
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
            video.jumpToTimestamp(seconds);
          }
        }
      });
    })
    .catch((err) => {
      console.log("Error!", err);
    });
}
