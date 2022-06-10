class userInterfaceManager {
  static NAV_PAGE = "navPage";
  static VIDEO_PAGE = "videoPage";
  static ALL_SESSIONS = "All Sessions";

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

    // get the templates
    this.bookmarkTemplate = document.getElementById("bookmarkTemplate");

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
    this.#getAllSessionNamesFromChromeStorage()
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

  renderVideoPage(sessionName) {
    console.log("renderVideoPage()", sessionName);
    // show the loading page
    this.#setVideoPageIsLoading(true);
    // drag the video page in frame if it's not already
    this.togglePage(userInterfaceManager.VIDEO_PAGE);
    // get the video session from chrome.storage
    this.#getSessionFromChromeStorage(sessionName)
      .then((response) => {
        // TODO: remove the interval it's only here to simulate slow connection
        setTimeout(() => {
          this.#renderVideoSessionUI(response.bookmarks);
        }, 1000);
      })
      .catch((e) => {
        // TODO: render empty page
        console.log(e);
        this.#renderVideoSessionUI(null);
      });
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
      const sessionWrapper = document.createElement("div");
      sessionWrapper.classList.add("sessionWrapper");
      sessionWrapper.innerText = sessionName;
      sessionWrapper.addEventListener("click", this.#handleSessionItemClick);
      this.mainNavPageContent.appendChild(sessionWrapper);
    });
    this.#setNavPageIsLoading(false);
  }

  #renderVideoSessionUI(bookmarksss) {
    // if (!bookmarks) {
    //   console.log("Empty bookmarks");
    //   return;
    // }
    const bookmarks = {
      "00:55:22": {
        isNested: true,
        text: "First one",
        timestamp: "00:55:22",
      },
      "00:55:23": {
        isNested: false,
        text: "Second one",
        timestamp: "00:55:23",
      },
      "00:55:24": {
        isNested: true,
        text: "Third one",
        timestamp: "00:55:24",
      },
    };
    // TODO: render the bookmarks based on template and wire event listeners for icons
    for (const key in bookmarks) {
      const { isNested, text, timestamp } = bookmarks[key];
      const bookmarkElem =
        this.bookmarkTemplate.content.firstElementChild.cloneNode(true);
      if (isNested) {
        bookmarkElem.classList.add("nested");
      }
      bookmarkElem.querySelector(".timestampText").innerText = timestamp;
      bookmarkElem.querySelector(".title").innerText = "Default Title";
      bookmarkElem.querySelector(".bookmarkBodyText").innerText = text;
      // wire event listeners for header icons
      bookmarkElem.querySelector(".confirmIcon");
      bookmarkElem.querySelector(".editIcon");
      bookmarkElem.querySelector(".nestIcon");
      bookmarkElem.querySelector(".headerIcon");

      console.log(bookmarkElem);
    }
  }

  #wireEventListeners() {
    // wire event for closing sidebar
    this.closeBtnIcon.addEventListener("click", this.#handleCloseIconClick);
    // wire event handler for the back btn
    this.backArrowIcon.addEventListener(
      "click",
      this.#handleBackArrowIconClick
    );

    // TODO: fix copy all bookmarks button
    // // wire copy event for button
    // this.copyTableBtn.addEventListener("click", (e) => {
    //   chrome.storage.sync.get(userInterfaceManager.STORAGE_KEY, (response) => {
    //     if (Object.keys(response).length > 0) {
    //       // create UI
    //       const { bookmarks } = response[userInterfaceManager.STORAGE_KEY];
    //       // send message to client script
    //       copyTableToClipboard(bookmarks);
    //     }
    //   });
    // });

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

  /**
   * triggered when the createNewSession Button is clicked. It messages the content script to create a new session,
   * and renders the video page, or an alert msg depending on the response from the content script
   *
   * @param {Event} e - click event object
   */
  #handleNewSessionButtonClick = (e) => {
    // TODO: render popup here instead of prompt
    // TODO: add spinner
    const userResponse = prompt("Enter the session name:", "Session Name");
    if (userResponse !== "") {
      sendMessageToActiveTab(
        { action: "createNewSession", payload: userResponse },
        (response) => {
          if (response.status === "success") {
            this.renderVideoPage(userResponse);
          } else {
            // TODO: render popup here instead of alert
            alert(response.payload);
          }
        }
      );
    }
  };

  /**
   * triggered when a session items is clicked from the nav page. It render the video page with the clicked session item
   *
   * @param {Event} e - click event object
   */
  #handleSessionItemClick = (e) => {
    this.renderVideoPage(e.target.innerText);
  };

  // TODO: this needs testing
  /**
   * searches chrome.storage for the key ALL_SESSIONS
   *
   * @returns {Promise} - resolved with a sessions array from chrome.storage, or rejected
   */
  #getAllSessionNamesFromChromeStorage() {
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

  #getSessionFromChromeStorage(sessionName) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(sessionName, (response) => {
        if (Object.keys(response).length > 0) {
          const { bookmarks } = response[sessionName];
          Object.keys(bookmarks).length
            ? resolve({ bookmarks })
            : reject("No bookmarks");
        } else {
          reject("Can't find the session name in storage!");
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
