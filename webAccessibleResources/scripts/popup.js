console.log("Popup script ran!");

const bookmarksContainer = document.getElementById("bookmarksContainer");

const uiManager = new userInterfaceManager();

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   const { NAV_PAGE, VIDEO_PAGE } = userInterfaceManager;
//   switch (msg.type) {
//     case NAV_PAGE:
//       uiManager.renderNavPage();
//       sendResponse({ status: "success" });
//       break;
//     case VIDEO_PAGE:
//       sendResponse({ status: "success" });
//       uiManager.renderVideoPage();
//       break;
//   }
// });

// chrome.storage.sync.get(STORAGE_KEY, (response) => {
//   if (Object.keys(response).length > 0) {
//     // create UI
//     const { bookmarks, sessionName } = response[STORAGE_KEY];
//     // updateAllBookmarksUI(bookmarks);

//     uiManager.updateTitle(sessionName);
//   }
// });

// TODO: render the current video element
// TODO: or render all sessions

// listener for storage updates
chrome.storage.onChanged.addListener((changes, area) => {
  if (
    // TODO: change this
    uiManager.currentSessionName &&
    changes[uiManager.currentSessionName]?.newValue
  ) {
    // const { bookmarks, sessionName } = changes[STORAGE_KEY].newValue;
    // updateAllBookmarksUI(bookmarks);
    uiManager.updateTitle(sessionName);
  }
});

// TODO: move these event listeners the userInterfaceManager
// icon event handlers
const handleTimestampClick = (e) => {
  const timestamp = e.target.innerText;
  sendMessageToActiveTab(
    { action: "jumpToTimestamp", payload: timestamp },
    (response) => {
      if (response.status === "success") {
        console.log(`Jumped to timestamp!`);
      }
    }
  );
};

const handleTrashIconClick = (e) => {
  const timestamp = e.target.parentElement.getAttribute("timestamp");
  sendMessageToActiveTab(
    { action: "deleteBookmark", payload: timestamp },
    (response) => {
      if (response.status === "success") {
        console.log(`Deleted timestamp!`);
      }
    }
  );
};

const handleNestIconClick = (e) => {
  const timestamp = e.target.parentElement.getAttribute("timestamp");
  sendMessageToActiveTab(
    { action: "toggleBookmarkNesting", payload: timestamp },
    (response) => {
      if (response.status === "success") {
        console.log(`Nest toggle timestamp!`);
      }
    }
  );
};
