class userInterfaceManager {
  static NAV_PAGE = "navPage";
  static VIDEO_PAGE = "videoPage";
  // TODO: make this value get updated from the popup.js by receiving messages from the content script
  static STORAGE_KEY = "web-video-bookmarker-4$23hV2";

  constructor() {
    // get the DOM elements
    this.scrollablePagesContainer = document.getElementById("pageScroller");
    this.sessionName = document.querySelector("h1");
    this.copyTableBtn = document.getElementById("copyTableBtn");
    this.newSessionButton = document.getElementById("newSessionButton");
    this.closeBtnIcon = document.getElementById("closeIcon");
    this.backArrowIcon = document.getElementById("backArrowIcon");

    this.#wireEventListeners();

    const { CURRENT_VID_KEY, VIDEO_PAGE } = userInterfaceManager;
    // TODO: this needs to happen faster
    chrome.storage.sync.get(CURRENT_VID_KEY, (response) => {
      if (response[CURRENT_VID_KEY]) {
        this.togglePage(VIDEO_PAGE);
      } else {
        this.togglePage(NAV_PAGE);
      }
    });
  }

  togglePage(page = null) {
    switch (page) {
      case userInterfaceManager.NAV_PAGE:
        this.scrollablePagesContainer.classList.remove("videoPage");
        break;
      case userInterfaceManager.VIDEO_PAGE:
        this.scrollablePagesContainer.classList.add("videoPage");
        break;
      default:
        this.scrollablePagesContainer.classList.toggle("videoPage");
    }
  }

  updateTitle(title) {
    this.sessionName.innerText = title;
  }

  renderNavPage() {
    console.log("renderNavPage()");
  }

  renderVideoPage() {
    console.log("renderVideoPage()");
  }

  #wireEventListeners() {
    // wire event for closing sidebar
    this.closeBtnIcon.addEventListener("click", this.#handleCloseIconClick);
    // wire event handler for the back btn
    this.backArrowIcon.addEventListener(
      "click",
      this.#handleBackArrowIconClick
    );

    // wire copy event for button
    this.copyTableBtn.addEventListener("click", (e) => {
      chrome.storage.sync.get(userInterfaceManager.STORAGE_KEY, (response) => {
        if (Object.keys(response).length > 0) {
          // create UI
          const { bookmarks } = response[userInterfaceManager.STORAGE_KEY];
          // send message to client script
          copyTableToClipboard(bookmarks);
        }
      });
    });

    // wire event handler for create new session click
    this.newSessionButton.addEventListener("click", (e) => {
      sendMessageToActiveTab({ action: "createNewSession" }, (response) => {
        if (response.status === "success") {
          console.log(`New session created!`);
        }
      });
    });
  }

  // message the content script to close the sidebarIframe
  #handleCloseIconClick(e) {
    sendMessageToActiveTab({ action: "toggle" }, (response) => {
      if (response.status === "success") {
        console.log(`Side menu closed!`);
      }
    });
  }

  // send message to content script to load the navigation page
  #handleBackArrowIconClick(e) {
    sendMessageToActiveTab({ action: "loadNavigationPage" }, (response) => {
      if (response.status === "success") {
        console.log(`Navigation page loaded!`);
      }
    });
  }
}
