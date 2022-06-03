class Session {
  static NAGIVATION_PAGE_URL = chrome.runtime.getURL("navigation.html");
  static SIDEBAR_PAGE_URL = chrome.runtime.getURL("popup.html");
  static ALL_SESSIONS = "All Sessions";

  /**
   * @param {String} pageURL - takes the URL of the current page and initializes the class based on if the URL is already in localstorage
   */
  constructor(pageURL) {
    this.video = null;
    this.sidebarIframe = null;
    this.pageURL = pageURL;

    if (this.#sessionExists(pageURL)) {
      this.#getVideoElement()
        .then((res) => {
          this.video = new Video(res.video);
          // create the side menu for found video
          this.sideMenuUpdate(Session.SIDEBAR_PAGE_URL);
          this.toggleSidemenuVisiblity();
        })
        .catch((error) => {
          this.#resetVideo();
          alert("URL found, but there is not video in the document");
        });
    } else {
      // TODO: render the navigation page
      this.#resetVideo();
      this.sideMenuUpdate(Session.NAGIVATION_PAGE_URL);
      this.toggleSidemenuVisiblity();
    }
  }

  createNewSession(pageURL) {
    if (!this.#sessionExists(pageURL)) {
      // TODO: create a session here
      this.#getVideoElement()
        .then((res) => {
          this.video = new Video(res.video);
          // create the side menu for found video
          this.sideMenuUpdate(Session.SIDEBAR_PAGE_URL);
          // this.toggleSidemenuVisiblity();
        })
        .catch((error) => {
          alert("There is not a video in the document");
        });
    } else {
      alert(
        "Session for the URL already exists! Please delete the session first!"
      );
    }
  }

  #resetVideo() {
    this.video = null;
    this.pageURL = null;
  }

  // TODO: change this to return a promise
  #sessionExists(URL) {
    // TODO: look in storage for session with matching URL
    chrome.storage.sync.get(Session.ALL_SESSIONS, (response) => {
      console.log(response);
      // if there is a session in storage, then return it
      if (Object.keys(response).length > 0) {
        const sessions = response[Session.ALL_SESSIONS];
        sessions.forEach((session) => {
          if (session === URL) {
            return true;
          }
        });
      }
      return false;
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

  // creates the sidebar if it doesn't already exist, and sets its source to URL param
  sideMenuUpdate(URL) {
    // create the side menu if there's isn't one
    if (!this.sidebarIframe) {
      this.sidebarIframe = document.createElement("iframe");
      this.sidebarIframe.classList.add("web-sidebar");
      this.sidebarIframe.src = URL;
      document.body.appendChild(this.sidebarIframe);
    }

    // update the source URL
    this.sidebarIframe.src = URL;
  }

  removeSidemenu() {
    this.sidebarIframe.remove();
    this.sidebarIframe = null;
  }

  toggleSidemenuVisiblity() {
    this.sidebarIframe.classList.toggle("on");
  }

  // triggered upon a message from popup script.
  // Takes a timestamp and jumps to it in the video
  jumpToTimestamp(timestamp) {
    if (this.video) {
      this.video.jumpToTimestamp(timestampToSeconds(timestamp));
      return;
    }

    alert("Can't jump to timestamp. No video found on the current page!");
  }

  deleteBookmark(timestamp) {
    if (this.video) {
      this.video.removeBookmark(timestamp);
      return;
    }

    alert("Can't delete bookmark. No video found on the current page!");
  }

  toggleBookmarkNesting(timestamp) {
    if (this.video) {
      this.video.toggleBookmarkNesting(timestamp);
      return;
    }
    alert("Can't toggle bookmark nesting. No video found on the current page!");
  }
}
