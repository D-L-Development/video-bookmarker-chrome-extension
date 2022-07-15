class Storage {
  static ALL_SESSIONS = "All Sessions";

  constructor(sessionName) {
    this.videoSession = {};
    this.STORAGE_KEY = sessionName;
    this.#setVideoSessionFromLocalStorage();
  }

  /**
   * adds the passed in session name under the - ALL SESSIONS - key in storage which is an array
   *
   * @param {String} sessionName - session name for current video session
   * @param {String} date - the date of the session
   */
  static async addSessionNameToStorage(sessionName, date) {
    const { ALL_SESSIONS } = Storage;
    let currentSessions = [];
    // get all the session URL's from storage
    try {
      currentSessions = await Storage.getAllSessionNamesFromStorage();
      // add the new session name to array
      currentSessions.push({ sessionName, date });
      // save all sessions to chrome.storage
      await chrome.storage.sync.set({ [ALL_SESSIONS]: currentSessions });
    } catch (error) {
      console.log(`Error saving all sessions!`, error);
    }
  }

  /**
   * gets all session names from chrome.storage
   *
   * @returns {Array} - resolved with an array of all session names, or an empty one
   */
  static async getAllSessionNamesFromStorage() {
    const { ALL_SESSIONS } = Storage;
    let sessions = [];
    try {
      const response = await chrome.storage.sync.get(ALL_SESSIONS);
      if (Object.keys(response).length > 0) {
        sessions = response[ALL_SESSIONS];
      }
      return sessions;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a session from chrome.storage under the provided session name
   * and remove the session from all session names array
   *
   * @param {String} sessionName - session to be deleted
   * @param {Boolean} shouldRemoveSession - decides if the session should be removed from under its own key
   */
  static async removeSessionFromStorage(
    sessionName,
    shouldRemoveSession = true
  ) {
    try {
      const sessions = await Storage.getAllSessionNamesFromStorage();
      let found = false;
      for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].sessionName === sessionName) {
          sessions.splice(i, 1);
          found = true;
          break;
        }
      }

      if (!found) {
        throw "Couldn't find session name under all sessions";
      }
      await chrome.storage.sync.set({ [Storage.ALL_SESSIONS]: sessions });
      if (shouldRemoveSession) {
        await chrome.storage.sync.remove(sessionName);
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Returns the desired bookmarks object for a particular session name
   *
   * @param {String} sessionName - the desired session name for the bookmarks needed from chrome.storage
   * @returns {Object} - a map with each timestamp associated with a bookmark object
   */
  static async getSessionBookmarks(sessionName) {
    try {
      const response = await chrome.storage.sync.get(sessionName);
      if (Object.keys(response).length > 0) {
        const { bookmarks } = response[sessionName];
        if (Object.keys(bookmarks).length > 0) {
          return { bookmarks };
        } else {
          throw "There are no bookmarks to copy";
        }
      } else {
        throw `Failed to get bookmarks for ${sessionName}`;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Searches chrome.storage for session by sessionName as the key
   *
   * @param {String} sessionName - session name to be searched for in chrome.storage
   * @returns {Object} - session object found in storage
   */
  static async getSessionFromStorage(sessionName) {
    try {
      const response = await chrome.storage.sync.get(sessionName);
      // if there is a session in storage, then return it
      if (Object.keys(response).length > 0) {
        return response;
      } else {
        throw "Session not found in storage!";
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * searched chrome.storgage under the ALL SESSIONS key in the sessions array for the passed in session name
   *
   * @param {String} sessionName - represents the session name that is being searched in chrome.storage
   * @returns {Promise} - resolved or rejected depending on if the session name for the session is already in storage
   */
  static async sessionExists(sessionName) {
    const allSessions = await Storage.getAllSessionNamesFromStorage();
    for (let i = 0; i < allSessions.length; i++) {
      if (allSessions[i].sessionName === sessionName) {
        return allSessions[i];
      }
    }

    throw new Error("Selected session is not found!");
  }

  async syncToLocalStorage() {
    try {
      await chrome.storage.sync.set(this.videoSession);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Sets an object in chrome.storage
   *
   * @param {Object} object
   */
  static async writeObjToStorage(object) {
    try {
      await chrome.storage.sync.set(object);
    } catch (error) {
      throw error;
    }
  }

  #setVideoSessionFromLocalStorage() {
    chrome.storage.sync.get(this.STORAGE_KEY, (response) => {
      // if there is a session in storage, then return it
      if (Object.keys(response).length > 0) {
        this.videoSession = response;
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

  async addBookmark(bookmark) {
    const { bookmarks } = this.videoSession[this.STORAGE_KEY];
    bookmarks[bookmark.timestamp] = bookmark;
    await this.syncToLocalStorage();
  }

  async removeBookmark(timestamp) {
    try {
      const { bookmarks } = this.videoSession[this.STORAGE_KEY];
      if (bookmarks[timestamp]) {
        delete bookmarks[timestamp];
        await this.syncToLocalStorage();
      } else {
        throw `Can't remove bookmark at ${timestamp} because it doesn't exist`;
      }
    } catch (error) {
      throw error;
    }
  }

  async toggleBookmarkNesting(timestamp) {
    try {
      const { bookmarks } = this.videoSession[this.STORAGE_KEY];
      const targetBookmark = bookmarks[timestamp];
      if (targetBookmark) {
        targetBookmark.isNested = !targetBookmark.isNested;
        await this.syncToLocalStorage();
      } else {
        throw `Can't toggle bookmark nesting at ${timestamp} because it doesn't exist`;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Returns the associated bookmark with the timestamp, or undefined
   *
   * @param {String} currentTimestamp - format hh:mm:ss timestamp
   * @returns {Object} - the bookmakr object from the current session
   */
  getBookmarkAtTimestamp(currentTimestamp) {
    return this.videoSession[this.STORAGE_KEY].bookmarks[currentTimestamp];
  }

  reset() {
    chrome.storage.sync.remove(this.STORAGE_KEY, () => {});
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