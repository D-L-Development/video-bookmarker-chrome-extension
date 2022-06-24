console.log("Content Script Ran!", guid());

// TODO: replace all strings with constants

let initialPageLoad = true;
let session = null;

/**
 * handles the messages sent from other scripts
 * this manages the nessecary events for the content script and servers
 * as a middle man for how all the resource scripts communicate with
 * the content script
 */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // MSG is an object from the utility.js file that replaces all strings
  switch (msg.action) {
    case MSG.TOGGLE:
      // TODO: figure out how to run code when the content script is initially loaded
      if (initialPageLoad) {
        initialPageLoad = false;
        session = new Session();
      } else {
        session.toggleSidemenuVisiblity();
      }
      sendResponse({ status: MSG.SUCCESS });
      break;
    case MSG.CREATE_NEW_SESSION:
      const { sessionName, date } = msg.payload;
      session
        .createNewSession({ sessionName, date })
        .then(() => {
          sendResponse({ status: MSG.SUCCESS });
        })
        .catch((error) => {
          sendResponse({ status: MSG.FAILURE, payload: error });
        });
      // indicate that the response is asynchrounus
      return true;
    case MSG.COPY_TABLE:
      session
        .copyBookmarksAsTable(msg.payload.sessionName)
        .then(() => {
          sendResponse({ status: MSG.SUCCESS });
        })
        .catch((error) => {
          sendResponse({ status: MSG.FAILURE, payload: error });
        });
      return true;
    case MSG.SELECT_SESSION:
      session
        .selectSession(msg.payload)
        .then(() => {
          sendResponse({ status: MSG.SUCCESS });
        })
        .catch((error) => {
          sendResponse({ status: MSG.FAILURE, payload: error });
        });
      // indicate that the response is asynchrounus
      return true;
    case MSG.DELETE_SESSION:
      session
        .removeSession(msg.payload)
        .then(() => {
          sendResponse({ status: MSG.SUCCESS });
        })
        .catch((error) => {
          sendResponse({ status: MSG.FAILURE, payload: error });
        });
      // indicate that the response is asynchrounus
      return true;
    case MSG.EDIT_SESSION:
      const { oldValue, newValue } = msg.payload;
      session
        .updateSessionName(oldValue, newValue)
        .then(() => {
          sendResponse({ status: MSG.SUCCESS });
        })
        .catch((error) => {
          sendResponse({ status: MSG.FAILURE, payload: error });
        });
      // indicate that the response is asynchrounus
      return true;
    case MSG.GET_CURRENT_TIMESTAMP:
      // pause the video if asked for
      if (msg?.payload.pauseVideo && session.video) {
        session.video.pause();
      }
      // send the current timestamp, or failure
      const data = session.getCurrentTimestamp();
      if (data) {
        const { timestamp, bookmark } = data;
        sendResponse({
          status: MSG.SUCCESS,
          payload: { timestamp, bookmark },
        });
      } else {
        sendResponse({
          status: MSG.FAILURE,
          payload: "Failed to get current bookmark",
        });
      }
      break;
    case MSG.ADD_BOOKMARK:
      session
        .addBookmark(msg.payload.bookmark)
        .then(() => {
          sendResponse({ status: MSG.SUCCESS });
        })
        .catch((e) => {
          sendResponse({ status: MSG.FAILURE });
          console.log(e);
          alert("Failed in content script");
        });
      return true;
    case MSG.JUMP_TO_TIMESTAMP:
      session.jumpToTimestamp(msg.payload);
      sendResponse({ status: MSG.SUCCESS });
      break;
    case MSG.DELETE_BOOKMARK:
      session
        .deleteBookmark(msg.payload)
        .then(() => {
          sendResponse({ status: MSG.SUCCESS });
        })
        .catch((error) => {
          sendResponse({ status: MSG.FAILURE, payload: error });
        });
      return true;
    case MSG.TOGGLE_BOOKMARK_NESTING:
      session
        .toggleBookmarkNesting(msg.payload)
        .then(() => {
          sendResponse({ status: MSG.SUCCESS });
        })
        .catch((error) => {
          sendResponse({ status: MSG.FAILURE, payload: error });
        });
      return true;
    case MSG.GET_BOOKMARK_AT_TIMESTAMP:
      const bookmark = session.getBookmarkAtTimestamp(msg.payload);
      bookmark
        ? sendResponse({ status: MSG.SUCCESS, payload: bookmark })
        : sendResponse({
            status: MSG.FAILURE,
            payload: `No bookmark at ${msg.payload}`,
          });
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
