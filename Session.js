class Session {
  static SIDEBAR_PAGE_URL = chrome.runtime.getURL("popup.html");
  static ALL_SESSIONS = "All Sessions";

  /**
   * @param {String} pageURL - takes the URL of the current page and initializes the class based on if the URL is already in localstorage
   */
  constructor(pageURL) {
    this.video = null;
    this.sidebarIframe = null;
    this.pageURL = pageURL;

    // create the side menu for found video
    this.#createSideMenu(Session.SIDEBAR_PAGE_URL);
    this.toggleSidemenuVisiblity(true);

    this.#sessionExists(pageURL)
      .then(() => {
        this.#getVideoElement()
          .then((res) => {
            this.video = new Video(res.video, pageURL);
            // TODO: sent message to popup.js to open the video page
          })
          .catch((error) => {
            this.#resetVideo();
            // TODO: send message to popup.js to render a 404 page
            alert("URL found, but there is not video in the document");
          });
      })
      .catch(() => {
        // render the navigation page
        this.#resetVideo();
        // TODO: send message to popup.js to render nav page
      });
  }

  /**
   * creates a new session with an HTML video if it doesn't already exist
   *
   * @param {String} pageURL - the current page URL in which the session should be created under
   */
  createNewSession(pageURL) {
    // TODO: send msg to popup.js to create a spinner in the nav page
    this.#sessionExists(pageURL)
      .then(() => {
        // TODO: send msg to popup.js to remove spinner
        // ? render a modal
        alert(
          "Session for the URL already exists! Please delete the session first! :)"
        );
      })
      .catch(() => {
        this.#getVideoElement()
          .then((res) => {
            this.#addSessionURLToStorage(pageURL);
            this.video = new Video(res.video, pageURL);
            // TODO: send msg to popup.js to render the video session and remove spinner
          })
          .catch((error) => {
            alert("There is not a video in the document");
          });
      });
  }

  /**
   * resets the video and current page URL
   */
  #resetVideo() {
    this.video = null;
    this.pageURL = null;
  }

  // ? maybe change to this to be async
  /**
   * adds the passed in URL under the - ALL SESSIONS - key in storage which is an array
   *
   * @param {String} sessionURL - URL for current video session
   */
  #addSessionURLToStorage(sessionURL) {
    chrome.storage.sync.get(Session.ALL_SESSIONS, (response) => {
      // get all the session URL's from storage
      if (Object.keys(response).length > 0) {
        const sessions = response[Session.ALL_SESSIONS];
        sessions.push(sessionURL);
        chrome.storage.sync.set({ [Session.ALL_SESSIONS]: sessions }, () => {
          console.log("value set to");
          console.log(sessions);
        });
      }
    });
  }

  /**
   * searched chrome.storgage under the ALL SESSIONS key in the sessions array for the passed in URL
   *
   * @param {String} URL - represents the URL that is being searched in chrome.storage
   * @returns {Promise} - resolved or rejected depending on if the URL for the session is already in storage
   */
  #sessionExists(URL) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(Session.ALL_SESSIONS, (response) => {
        // if there is a session in storage, then return it
        if (Object.keys(response).length > 0) {
          const sessions = response[Session.ALL_SESSIONS];

          const sessionFound = sessions.some((session) => session === URL);

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
