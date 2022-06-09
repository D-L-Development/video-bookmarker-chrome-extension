class userInterfaceManager {
  static NAV_PAGE = "navPage";
  static VIDEO_PAGE = "videoPage";
  static ALL_SESSIONS = "All Sessions";
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
    this.videoBookmarksPageContentLoading = document.getElementById(
      "videoBookmarksPageContentLoading"
    );
    this.mainNavPageContentLoading = document.getElementById(
      "mainNavPageContentLoading"
    );
    this.videoBookmarksPageContent = document.getElementById(
      "videoBookmarksPageContent"
    );
    this.mainNavPageContent = document.getElementById("mainNavPageContent");

    this.#wireEventListeners();
    this.renderNavPage();
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
    // show the loading page
    this.#setNavPageIsLoading(true);
    // drag the nav page in frame if it's not already
    this.togglePage(userInterfaceManager.NAV_PAGE);
    // wait for all sessions to be retreived from chrome.storage
    this.#getAllSessionsFromChromeStorage()
      .then((response) => {
        // TODO: remove the interval it's only here to simulate slow connection
        setTimeout(() => {
          this.#renderNavSessionsUI(response.sessions);
        }, 1000);
      })
      .catch((e) => {
        // TODO: render empty page
        console.log(e);
        this.#renderNavSessionsUI(null);
      });
  }

  renderVideoPage() {
    console.log("renderVideoPage()");
    this.scrollablePagesContainer.classList.add("videoPage");
  }

  /**
   * renders the elements corrosponding to each session name, or
   * an empty page indicating that there are no sessions present
   *
   * @param {Array} sessions - array of strings from chrome.storage holding session names
   * @returns
   */
  #renderNavSessionsUI(sessions) {
    // TODO: remove the copy table button
    // TODO: remove the back button
    // if there are no sessions in storage, then render a simple msg
    if (!sessions) {
      this.mainNavPageContent.innerHTML = `<p>No sessions available!</p>`;
      return;
    }

    // otherwise, render all the sessions
    this.mainNavPageContent.innerHTML = "";
    sessions.forEach((sessionName) => {
      this.mainNavPageContent.innerHTML += `<p class="sessionWrapper">${sessionName}</p>`;
    });
    this.#setNavPageIsLoading(false);
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
    this.newSessionButton.addEventListener(
      "click",
      this.#handleNewSessionButtonClick
    );
  }

  // message the content script to close the sidebarIframe
  #handleCloseIconClick(e) {
    sendMessageToActiveTab({ action: "toggle" }, (response) => {
      if (response.status === "success") {
        console.log(`Side menu closed!`);
      }
    });
  }

  #handleBackArrowIconClick = (e) => {
    this.renderNavPage();
  };

  #handleNewSessionButtonClick = (e) => {
    // TODO: render popup here instead of prompt
    const userResponse = prompt("Enter the session name:", "Session Name");
    if (userResponse !== "") {
      sendMessageToActiveTab(
        { action: "createNewSession", payload: userResponse },
        (response) => {
          if (response.status === "success") {
            console.log(`New session created!`);
          }
        }
      );
    }
  };

  // TODO: this needs testing
  /**
   * searches chrome.storage for the key ALL_SESSIONS
   *
   * @returns {Promise} - resolved with a sessions array from chrome.storage, or rejected
   */
  #getAllSessionsFromChromeStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(userInterfaceManager.ALL_SESSIONS, (response) => {
        // if there is a session in storage, then return it
        if (Object.keys(response).length > 0) {
          const sessions = response[userInterfaceManager.ALL_SESSIONS];
          sessions.length ? resolve({ sessions }) : reject();
        } else {
          reject();
        }
      });
    });
  }

  #setNavPageIsLoading(isLoadingNav) {
    this.mainNavPageContentLoading.style.display = isLoadingNav
      ? "flex"
      : "none";
    // hide or show the content
    this.mainNavPageContent.style.display = isLoadingNav ? "none" : "block";
  }

  #setVideoPageIsLoading(isLoadingVideo) {
    videoBookmarksPageContentLoading.style.display = isLoadingVideo
      ? "flex"
      : "none";
    // hide or show the content
    this.videoBookmarksPageContent.style.display = isLoadingVideo
      ? "none"
      : "block";
  }
}
