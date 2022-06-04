class Storage {
  static CURRENT_VID_KEY = "currentVideoURL";
  constructor(pageURL) {
    this.videoSession = {};
    this.STORAGE_KEY = pageURL;
    this.setVideoSessionFromLocalStorage();
  }

  /**
   * updates the currentVideoURL in chrome.storage. Set this value to null to render the nav page
   * pass a URL to notify the sidemenu to render the bookmarks for the video
   *
   * @param {String} currentVideoURL - the video URL to be stored in local storage under "currentVideoURL" key
   * @returns {Promise}
   */
  static updateCurrentVideoURL(currentVideoURL) {
    return chrome.storage.sync.set({
      [Storage.CURRENT_VID_KEY]: currentVideoURL,
    });
  }

  syncToLocalStorage() {
    chrome.storage.sync.set(this.videoSession, () => {
      console.log("value set to");
      console.log(this.videoSession);
    });
  }

  setVideoSessionFromLocalStorage() {
    chrome.storage.sync.get(this.STORAGE_KEY, (response) => {
      // if there is a session in storage, then return it
      if (Object.keys(response).length > 0) {
        this.videoSession = response;
        console.log(response);
      } else {
        this.videoSession = {
          [this.STORAGE_KEY]: {
            sessionName: prompt("Enter the name of this session:", "Untitled"),
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
