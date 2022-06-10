class Storage {
  static ALL_SESSIONS = "All Sessions";

  constructor(sessionName) {
    this.videoSession = {};
    this.STORAGE_KEY = sessionName;
    this.#setVideoSessionFromLocalStorage();
  }

  // ? maybe change to this to be async
  /**
   * adds the passed in session name under the - ALL SESSIONS - key in storage which is an array
   *
   * @param {String} sessionName - session name for current video session
   */
  static async addSessionNameToStorage(sessionName) {
    const { ALL_SESSIONS } = Storage;
    let currentSessions = [];
    // get all the session URL's from storage
    try {
      const response = await chrome.storage.sync.get(ALL_SESSIONS);
      if (Object.keys(response).length > 0) {
        currentSessions = response[ALL_SESSIONS];
      }
      // add the new session name to array
      currentSessions.push(sessionName);
      // save all sessions to chrome.storage
      await chrome.storage.sync.set({ [ALL_SESSIONS]: currentSessions });
    } catch (error) {
      console.log(`Error saving all sessions!`, error);
    }
  }

  /**
   * searched chrome.storgage under the ALL SESSIONS key in the sessions array for the passed in session name
   *
   * @param {String} sessionName - represents the session name that is being searched in chrome.storage
   * @returns {Promise} - resolved or rejected depending on if the session name for the session is already in storage
   */
  static sessionExists(sessionName) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(Storage.ALL_SESSIONS, (response) => {
        // if there is a session in storage, then return it
        if (Object.keys(response).length > 0) {
          const sessions = response[Storage.ALL_SESSIONS];

          const sessionFound = sessions.some(
            (session) => session === sessionName
          );

          console.log("sessionFound", sessionFound);

          sessionFound ? resolve() : reject();
        } else {
          reject();
        }
      });
    });
  }

  syncToLocalStorage() {
    chrome.storage.sync.set(this.videoSession, () => {
      console.log("value set to");
      console.log(this.videoSession);
    });
  }

  #setVideoSessionFromLocalStorage() {
    chrome.storage.sync.get(this.STORAGE_KEY, (response) => {
      // if there is a session in storage, then return it
      if (Object.keys(response).length > 0) {
        this.videoSession = response;
        console.log(response);
      } else {
        this.videoSession = {
          [this.STORAGE_KEY]: {
            sessionName: this.STORAGE_KEY,
            bookmarks: {},
          },
        };

        this.syncToLocalStorage();
      }
    });
  }

  addBookmark(currentTimestamp, bookmarkText, isNested) {
    const { bookmarks } = this.videoSession[this.STORAGE_KEY];

    bookmarks[currentTimestamp] = {
      timestamp: currentTimestamp,
      text: bookmarkText,
      isNested,
    };
    this.syncToLocalStorage();
  }

  removeBookmark(timestamp) {
    const { bookmarks } = this.videoSession[this.STORAGE_KEY];
    if (bookmarks[timestamp]) {
      delete bookmarks[timestamp];
      this.syncToLocalStorage();
    } else {
      console.log(
        `Can't remove bookmark at ${timestamp} because it doesn't exist`
      );
    }
  }

  toggleBookmarkNesting(timestamp) {
    const { bookmarks } = this.videoSession[this.STORAGE_KEY];
    const targetBookmark = bookmarks[timestamp];
    if (targetBookmark) {
      targetBookmark.isNested = !targetBookmark.isNested;
      this.syncToLocalStorage();
    } else {
      console.log(
        `Can't toggle bookmark nesting at ${timestamp} because it doesn't exist`
      );
    }
  }

  // return whether a timestamp has a bookmark or not
  getBookmarkAtTimestamp(currentTimestamp) {
    return this.videoSession[this.STORAGE_KEY].bookmarks[currentTimestamp];
  }

  reset() {
    chrome.storage.sync.remove(this.STORAGE_KEY, () => {
      console.log("Session removed!");
    });
  }

  printBookmarksPretty() {
    console.clear();
    console.log(
      `%cSession Name: %c${this.videoSession[this.STORAGE_KEY].sessionName}`,
      "color: yellow",
      "color: #DEB887"
    );
    const bookmarkFromLocalStorage =
      this.videoSession[this.STORAGE_KEY].bookmarks;
    console.log("%cCurrent Bookmarks: ", "color: red");
    console.table(bookmarkFromLocalStorage);
  }
}
