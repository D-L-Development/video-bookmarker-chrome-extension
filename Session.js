class Session {
  static SIDEBAR_PAGE_URL = chrome.runtime.getURL("popup.html");
  static ALL_SESSIONS = "All Sessions";

  /**
   * @param {String} sessionName - takes the session name and initializes the class member
   */
  constructor(sessionName) {
    this.video = null;
    this.sidebarIframe = null;
    this.sessionName = sessionName;

    // create the side menu for found video
    this.#createSideMenu(Session.SIDEBAR_PAGE_URL);
    this.toggleSidemenuVisiblity(true);
  }

  /**
   * creates a new session with an HTML video if it doesn't already exist
   *
   * @param {String} sessionName - the current session name from the user
   */
  createNewSession(sessionName) {
    this.#sessionExists(sessionName)
      .then(() => {
        // ? render a modal
        alert(
          "Session name already exists! Remove that session, or choose a different name!"
        );
        // TODO: send msg to popup.js to render the nav page again and get rid of the spinner
        // TODO: this could be done as a spinner within the button
      })
      .catch(() => {
        this.#getVideoElement()
          .then((res) => {
            this.#addSessionURLToStorage(sessionName);
            this.video = new Video(res.video, sessionName);
            // TODO: send msg to popup.js to render the video session and remove spinner
          })
          .catch((error) => {
            alert("There is not a video in the document");
            // TODO: send msg to popup.js to render the nav page back
          });
      });
  }

  /**
   * resets the video and current page URL
   */
  #resetVideo() {
    this.video = null;
    this.sessionName = null;
  }

  // ? maybe change to this to be async
  // TODO: move this to storage class as a static method
  /**
   * adds the passed in session name under the - ALL SESSIONS - key in storage which is an array
   *
   * @param {String} sessionName - session name for current video session
   */
  #addSessionNameToStorage(sessionName) {
    chrome.storage.sync.get(Session.ALL_SESSIONS, (response) => {
      // get all the session URL's from storage
      if (Object.keys(response).length > 0) {
        const sessions = response[Session.ALL_SESSIONS];
        sessions.push(sessionName);
        chrome.storage.sync.set({ [Session.ALL_SESSIONS]: sessions }, () => {
          console.log("value set to");
          console.log(sessions);
        });
      }
    });
  }

  /**
   * searched chrome.storgage under the ALL SESSIONS key in the sessions array for the passed in session name
   *
   * @param {String} sessionName - represents the session name that is being searched in chrome.storage
   * @returns {Promise} - resolved or rejected depending on if the session name for the session is already in storage
   */
  #sessionExists(sessionName) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(Session.ALL_SESSIONS, (response) => {
        // if there is a session in storage, then return it
        if (Object.keys(response).length > 0) {
          const sessions = response[Session.ALL_SESSIONS];

          const sessionFound = sessions.some(
            (session) => session === sessionName
          );

          console.log(sessionFound);

          sessionFound ? resolve() : reject();
        } else {
          reject();
        }
      });
    });
  }

  /**
   * searches the DOM for a video element. Returns the first found video
   *
   * @param {number} repeatCount - the amount of times the interval should repeatedly search for the video
   * @returns {Promise} - resolved with an HTML video element, or rejected with an error
   */
  #getVideoElement(repeatCount = 20) {
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

  /**
   * creates the sidmenu iframe and sets its source to URL param
   *
   * @param {String} URL - passed in URL for desired resource HTML page to be rendered within the created frame
   */
  #createSideMenu(URL) {
    // create the side menu
    this.sidebarIframe = document.createElement("iframe");
    this.sidebarIframe.classList.add("web-sidebar");
    this.sidebarIframe.src = URL;
    document.body.appendChild(this.sidebarIframe);
  }

  /**
   * removes the sidebar element from the DOM
   */
  removeSidemenu() {
    this.sidebarIframe.remove();
    this.sidebarIframe = null;
  }

  /**
   * toggels the visiblity of the sidemeny iframe
   */
  toggleSidemenuVisiblity(value = null) {
    switch (value) {
      case null:
        this.sidebarIframe.classList.toggle("on");
        break;
      case true:
        this.sidebarIframe.classList.add("on");
        break;
      case false:
        this.sidebarIframe.classList.remove("on");
        break;
    }
  }

  /**
   * takes a timestamp and skips in the video until that timestamp
   *
   * @param {String} timestamp - the desired HH:MM:SS timestamp in which the video should jump to
   */
  jumpToTimestamp(timestamp) {
    if (this.video) {
      this.video.jumpToTimestamp(timestampToSeconds(timestamp));
      return;
    }

    alert("Can't jump to timestamp. No video found on the current page!");
  }

  /**
   * deletes the desired bookmark from chrome.storage based on the timestamp
   *
   * @param {String} timestamp - the desired HH:MM:SS timestamp to be deleted
   */
  deleteBookmark(timestamp) {
    if (this.video) {
      this.video.removeBookmark(timestamp);
      return;
    }

    alert("Can't delete bookmark. No video found on the current page!");
  }

  /**
   * toggles the nesting of the desired bookmark from chrome.storage based on the timestamp
   *
   * @param {String} timestamp - the desired HH:MM:SS timestamp in which the nesting for should be toggled
   */
  toggleBookmarkNesting(timestamp) {
    if (this.video) {
      this.video.toggleBookmarkNesting(timestamp);
      return;
    }
    alert("Can't toggle bookmark nesting. No video found on the current page!");
  }
}
