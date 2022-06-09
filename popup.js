console.log("Popup script ran!");

const STORAGE_KEY = "web-video-bookmarker-4$23hV2";
const bookmarksContainer = document.getElementById("bookmarksContainer");

const uiManager = new userInterfaceManager();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const { NAV_PAGE, VIDEO_PAGE } = userInterfaceManager;
  switch (msg.type) {
    case NAV_PAGE:
      uiManager.renderNavPage();
      sendResponse({ status: "success" });
      break;
    case VIDEO_PAGE:
      sendResponse({ status: "success" });
      uiManager.renderVideoPage();
      break;
  }
});

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
  if (changes[STORAGE_KEY]?.newValue) {
    const { bookmarks, sessionName } = changes[STORAGE_KEY].newValue;
    // updateAllBookmarksUI(bookmarks);
    uiManager.updateTitle(sessionName);
  }
});

function updateAllBookmarksUI(bookmarks) {
  // clear current bookmarks
  bookmarksContainer.innerHTML = "";

  for (const key in bookmarks) {
    const currentBookmark = bookmarks[key];

    // <div class='bookmark'>
    const bookmarkElem = document.createElement("div");
    bookmarksContainer.appendChild(bookmarkElem);
    bookmarkElem.classList.add("bookmark");
    if (currentBookmark.isNested) {
      bookmarkElem.classList.add("nested");
    } else {
      bookmarkElem.classList.remove("nested");
    }
    //    <div class='bookmarkHeader'>
    const bookmarkHeaderElem = document.createElement("div");
    bookmarkElem.appendChild(bookmarkHeaderElem);
    bookmarkHeaderElem.classList.add("bookmarkHeader");
    //        <p class='headerText'>
    //           <span class='headerText'>
    //           <span class='title'>
    const headerTextElem = document.createElement("p");
    bookmarkHeaderElem.appendChild(headerTextElem);
    headerTextElem.classList.add("headerText");

    const timestampTextElem = document.createElement("span");
    headerTextElem.appendChild(timestampTextElem);
    timestampTextElem.classList.add("timestampText");
    timestampTextElem.innerText = currentBookmark.timestamp;
    timestampTextElem.addEventListener("click", handleTimestampClick);

    const titleElem = document.createElement("span");
    headerTextElem.appendChild(titleElem);
    titleElem.classList.add("title");
    titleElem.innerText = currentBookmark.text;

    //        <div class='headerIcons'>
    const headerIcons = document.createElement("div");
    bookmarkHeaderElem.appendChild(headerIcons);
    headerIcons.classList.add("headerIcons");
    headerIcons.setAttribute("timestamp", currentBookmark.timestamp);

    const checkIconElem = document.createElement("img");
    headerIcons.appendChild(checkIconElem);
    checkIconElem.classList.add("headerIcon");
    checkIconElem.setAttribute("src", "./images/icons/check-square.svg");
    checkIconElem.setAttribute("id", "confirmIcon");
    checkIconElem.setAttribute("alt", "confirm icon");

    const editIconElem = document.createElement("img");
    headerIcons.appendChild(editIconElem);
    editIconElem.classList.add("headerIcon");
    editIconElem.setAttribute("src", "./images/icons/pencil-square.svg");
    editIconElem.setAttribute("id", "editIcon");
    editIconElem.setAttribute("alt", "edit icon");

    const nestIconElem = document.createElement("img");
    headerIcons.appendChild(nestIconElem);
    nestIconElem.classList.add("headerIcon");
    nestIconElem.setAttribute("src", "./images/icons/list-nested.svg");
    nestIconElem.setAttribute("id", "nestIcon");
    nestIconElem.setAttribute("alt", "nest icon");
    nestIconElem.addEventListener("click", handleNestIconClick);

    const deleteIconElem = document.createElement("img");
    headerIcons.appendChild(deleteIconElem);
    deleteIconElem.classList.add("headerIcon");
    deleteIconElem.setAttribute("src", "./images/icons/trash.svg");
    deleteIconElem.setAttribute("id", "trashIcon");
    deleteIconElem.setAttribute("alt", "trash icon");
    deleteIconElem.addEventListener("click", handleTrashIconClick);

    const bookmarkTextElem = document.createElement("div");
    bookmarkElem.appendChild(bookmarkTextElem);
    bookmarkTextElem.classList.add("bookmarkText");
    bookmarkTextElem.innerText =
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, abnisi aliquam rem nemo beatae perferendis";
  }
}

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
