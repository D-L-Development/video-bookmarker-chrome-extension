/**
 * userInterfaceManager - responsible for handling ui changes for the sidemenu iframe.
 * an instance of this class is created in the popup.js file. This class uses chrome.storage
 * but only for reading. It NEVER updates chrome.storage. It rather sends messages to the
 * content script to handle any changes needed outside of the scope of the sidemenu ui
 */
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
    this.videoBookmarksPageContent = document.getElementById(
      "videoBookmarksPageContent"
    );
    this.mainNavPageContentLoading = document.getElementById(
      "mainNavPageContentLoading"
    );
    this.mainNavPageContent = document.getElementById("mainNavPageContent");

    // get the templates
    this.bookmarkTemplate = document.getElementById("bookmarkTemplate");

    // memeber to keep track of the currently rendered page
    // gets updated by the togglePage function
    // TODO: make sure to prevent modifiying sessions or bookmarks when going in between pages. This variable should always be updated. You know what I mean
    this.isNavPageInFrame = true;

    this.#wireEventListeners();
    this.renderNavPage();
  }

  /**
   * adds or removes the CSS class "videoPage" to slide the scrollerPage div right, or left
   * to expose the nav, or video page. It also updates isNavPageInFrame
   *
   * @param {String} page - defaults to null, and accepts the two constant strings navPage, or videoPage
   */
  togglePage(page = null) {
    switch (page) {
      case userInterfaceManager.NAV_PAGE:
        this.isNavPageInFrame = true;
        this.scrollablePagesContainer.classList.remove("videoPage");
        break;
      case userInterfaceManager.VIDEO_PAGE:
        this.isNavPageInFrame = false;
        this.scrollablePagesContainer.classList.add("videoPage");
        break;
      default:
        this.isNavPageInFrame = !isNavPageInFrame;
        this.scrollablePagesContainer.classList.toggle("videoPage");
    }
  }

  /**
   * sets the value of the h1 HTML element
   *
   * @param {String} title - the string value for the h1 element
   */
  #updateTitle(title) {
    this.sessionName.innerText = title;
  }

  /**
   * responsible for sliding the nav page into frame, and loading it's content from chrome.storage
   * through the use of a couple of helper functions.
   */
  renderNavPage() {
    // show the loading page
    this.#setNavPageIsLoading(true);
    // update the title
    this.#updateTitle("All Sessions");
    // remove the back button icon
    this.#setBackArrowIconVisibility(false);
    // drag the nav page in frame if it's not already
    this.togglePage(userInterfaceManager.NAV_PAGE);
    // wait for all sessions to be retreived from chrome.storage
    this.#getAllSessionNamesFromChromeStorage()
      .then((response) => {
        // TODO: remove the interval it's only here to simulate slow connection
        setTimeout(() => {
          this.#renderNavSessionsUI(response.sessions);
          this.#setNavPageIsLoading(false);
        }, 500);
      })
      .catch((e) => {
        // TODO: render empty page
        console.log(e);
        this.#renderNavSessionsUI(null);
        this.#setNavPageIsLoading(false);
      });
  }

  /**
   * responsible for sliding the video page into frame, and loading it's content from chrome.storage
   * through the use of a couple of helper functions using the sessionName param as a storage key
   *
   * @param {String} sessionName - string session name value to be rendered in the video page div
   */
  renderVideoPage(sessionName) {
    // show the loading page
    this.#setVideoPageIsLoading(true);
    // update the title
    this.#updateTitle(sessionName);
    // show the back arrow icon
    this.#setBackArrowIconVisibility(true);
    // drag the video page in frame if it's not already
    this.togglePage(userInterfaceManager.VIDEO_PAGE);
    // get the video session from chrome.storage
    this.#getSessionFromChromeStorage(sessionName)
      .then((response) => {
        // TODO: remove the interval it's only here to simulate slow connection
        setTimeout(() => {
          this.#renderVideoSessionUI(response.bookmarks);
          this.#setVideoPageIsLoading(false);
        }, 500);
      })
      .catch((e) => {
        // TODO: render empty page
        console.log(e);
        this.#renderVideoSessionUI(null);
        this.#setVideoPageIsLoading(false);
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
  }

  /**
   * renders the HTML elements corrosponding to each bookmark passed in, or an empty page
   * if null is passed in. It uses a template from the popup.html page to render each bookmark
   *
   * @param {Object} bookmarks - the object from chrome.storage with timestamp "hh:mm:ss" keys
   */
  #renderVideoSessionUI(bookmarks) {
    // remove current content
    this.videoBookmarksPageContent.innerHTML = "";
    if (!bookmarks) {
      // TODO: render empty video page
      this.videoBookmarksPageContent.innerHTML = `<p>No bookmarks present!</p>`;
      return;
    }
    // render the bookmarks
    for (const key in bookmarks) {
      const { isNested, text, timestamp } = bookmarks[key];
      const bookmarkElem =
        this.bookmarkTemplate.content.firstElementChild.cloneNode(true);
      // add or remove the nested class
      isNested
        ? bookmarkElem.classList.add("nested")
        : bookmarkElem.classList.remove("nested");
      // set the content
      bookmarkElem.querySelector(".timestampText").innerText = timestamp;
      bookmarkElem.querySelector(".title").innerText = "Default Title";
      bookmarkElem.querySelector(".bookmarkBodyText").innerText = text;
      // set the timestamp attribute
      bookmarkElem
        .querySelector(".headerIcons")
        .setAttribute("timestamp", timestamp);
      // wire event listeners for header icons
      bookmarkElem.querySelector(".confirmIcon");
      bookmarkElem.querySelector(".editIcon");
      bookmarkElem.querySelector(".nestIcon");
      bookmarkElem.querySelector(".headerIcon");
      // append the new bookmark
      this.videoBookmarksPageContent.appendChild(bookmarkElem);
    }
  }

  /**
   * Helper function to wire all event listeners for presistent components
   * such as the back button or close icon
   */
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

  /**
   * Messages the content script to close the sidebarIframe
   *
   * @param {Event} e - click event object
   */
  #handleCloseIconClick(e) {
    sendMessageToActiveTab({ action: "toggle" }, (response) => {
      if (response.status === "success") {
        console.log(`Side menu closed!`);
      }
    });
  }

  /**
   * Triggered when the back arrow icon is clicked. It renders the nav page
   *
   * @param {Event} e - click event object
   */
  #handleBackArrowIconClick = (e) => {
    // ? TODO: send msg to content script to remove reference to the video object
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
    // add a spinner
    this.#addSpinnerToSessionItem(e.target);
    const { innerText } = e.target;
    sendMessageToActiveTab(
      { action: "selectSession", payload: innerText },
      (response) => {
        // remove the spinner when a response is recieved from the content script
        this.#removeSpinnerFromSessionItem(e.target);
        if (response.status === "success") {
          this.renderVideoPage(innerText);
        } else {
          // TODO: render popup here instead of alert
          alert(response.payload);
        }
      }
    );
  };

  /**
   * sets the the session item into a loading state. Adds the spinner // TODO: prevent other clicks
   *
   * @param {HTML Element} element - a session item HTML element where the spinner will be added
   */
  #addSpinnerToSessionItem(element) {
    const spinner = document.createElement("img");
    spinner.setAttribute("src", "./images/icons/spinner_sm.gif");
    spinner.setAttribute("alt", "spinner icon");
    spinner.classList.add("sessionItemSpinner");
    element.appendChild(spinner);
  }

  /**
   * removes the loading state from the session item
   *
   * @param {HTML Element} element - a session item HTML element where the spinner will be removed
   */
  #removeSpinnerFromSessionItem(element) {
    element.querySelector(".sessionItemSpinner").remove();
  }

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

  /**
   * Searches chrome.storage for the session name, and returns the bookmarks
   *
   * @param {String} sessionName - the session name key to be searched for in chrome.storage
   * @returns {Promise} - resolves a promise with a bookmarks object if found in chrome.storage
   */
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

  /**
   * shows the loading page and hides the nav content, or the exact opposite
   *
   * @param {Boolean} isLoadingNav - whether the nav page is loading or not
   */
  #setNavPageIsLoading(isLoadingNav) {
    this.mainNavPageContentLoading.style.display = isLoadingNav
      ? "flex"
      : "none";
    // hide or show the content
    this.mainNavPageContent.style.display = isLoadingNav ? "none" : "block";
  }

  /**
   * shows the loading page and hides the video content, or the exact opposite
   *
   * @param {Boolean} isLoadingVideo - whether the video page is loading or not
   */
  #setVideoPageIsLoading(isLoadingVideo) {
    this.videoBookmarksPageContentLoading.style.display = isLoadingVideo
      ? "flex"
      : "none";
    // hide or show the content
    this.videoBookmarksPageContent.style.display = isLoadingVideo
      ? "none"
      : "block";
  }

  /**
   * shows or hides the back arrow button icon
   *
   * @param {Boolean} isShown - true for shown, false for hidden
   */
  #setBackArrowIconVisibility(isShown) {
    this.backArrowIcon.style.display = isShown ? "block" : "none";
  }
}
