class Session {
  static SIDEBAR_PAGE_URL = chrome.runtime.getURL(
    "../webAccessibleResources/popup.html"
  );

  /**
   * @param {String} sessionName - takes the session name and initializes the class member
   */
  constructor(sessionName) {
    this.video = null;
    this.sidebarIframe = null;
    this.sessionName = sessionName;

    // create the side menu for found video
    this.#createSideMenu(Session.SIDEBAR_PAGE_URL);
    // ? TODO: there's probably a better way to do this below
    setTimeout(() => {
      this.toggleSidemenuVisiblity(true);
    }, 50);
  }

  /**
   * creates a new session with an HTML video if it doesn't already exist
   *
   * @param {String} sessionName - the current session name from the user
   * @returns {Promise} - resolved or rejected with a msg depending on the status
   */
  createNewSession(sessionName) {
    return new Promise((resolve, reject) => {
      Storage.sessionExists(sessionName)
        .then(() => {
          reject(
            "Session name already exists! Remove that session, or choose a different name!"
          );
        })
        .catch(() => {
          this.#getVideoElement()
            .then((res) => {
              Storage.addSessionNameToStorage(sessionName);
              this.video = new Video(res.video, sessionName);
              resolve();
            })
            .catch((error) => {
              reject("There is not a video in the document");
              console.log(error);
            });
        });
    });
  }

  /**
   * gets called by the content script when a msg fromm the uiManger is recieved.
   * it makes sure the video session exists, and creates a new video for it
   *
   * @param {String} selectedSession - string value of the selected session
   */
  async selectSession(selectedSession) {
    try {
      // TODO: an assumption is made here that the session is under "ALL_SESSIONS" key, and is found under its name key
      await Storage.sessionExists(selectedSession);
      const result = await this.#getVideoElement();
      this.video = new Video(result.video, selectedSession);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Removes the session from chrome.storage
   *
   * @param {String} sessionName - session name to be deleted
   */
  async removeSession(sessionName) {
    try {
      await Storage.removeSessionFromStorage(sessionName);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Removes the current session and adds a new one with the provided details
   *
   * @param {String} currentSessionName - session name to be edited
   * @param {String} newSessionName - new session name to be set for session
   */
  async updateSessionName(currentSessionName, newSessionName) {
    // TODO: the currently saved object in local storage isn't saving all the info. Revisit this at some point
    try {
      const foundSession = await Storage.getSessionFromStorage(
        currentSessionName
      );
      // update the storage key
      foundSession[newSessionName] = foundSession[currentSessionName];
      // remove the old key
      delete foundSession[currentSessionName];
      // update the inner session name
      foundSession[newSessionName].sessionName = newSessionName;
      // remove the previous object
      // TODO: figure out if these events needs to wait on eachother
      await Storage.removeSessionFromStorage(currentSessionName);
      // save the new object to storage
      await Storage.addSessionNameToStorage(newSessionName);
      await Storage.writeObjToStorage(foundSession);
    } catch (error) {
      throw error;
    }
  }

  /**
   * resets the video and current page URL
   */
  #resetVideo() {
    this.video = null;
    this.sessionName = null;
  }

  /**
   * searches the DOM for a video element. Returns the first found video
   *
   * @param {number} repeatCount - the amount of times the interval should repeatedly search for the video
   * @returns {Promise} - resolved with an HTML video element, or rejected with an error
   */
  #getVideoElement(repeatCount = 3) {
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
      }, 1000);
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

  async copyBookmarksAsTable(sessionName) {
    try {
      if (this.video) {
        const response = await Storage.getSessionBookmarks(sessionName);
        copyTableToClipboard(response.bookmarks);
      } else {
        throw "No video in the document";
      }
    } catch (error) {
      throw error;
    }
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
   * returns the timestamp of the current video time and the current bookmark if there is one
   *
   * @returns {Object} - with properties timestamp and bookmark
   */
  getCurrentTimestamp() {
    if (this.video) {
      const timestamp = this.video.getCurrentTimestamp();
      const bookmark = this.video.storage.getBookmarkAtTimestamp(timestamp);
      return { timestamp, bookmark };
    } else {
      return null;
    }
  }

  async addBookmark(bookmark) {
    if (this.video) {
      await this.video.addBookmark(bookmark);
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
