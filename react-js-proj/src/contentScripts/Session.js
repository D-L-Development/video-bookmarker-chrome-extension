import { timestampToSeconds } from "./utility";

export class Session {
  static SIDEBAR_PAGE_URL = chrome.runtime.getURL("./popup.html");

  constructor() {
    this.video = null;
    this.sidebarIframe = null;

    console.log("Session()", Session.SIDEBAR_PAGE_URL);

    // create the side menu for found video
    this.#createPopup(Session.SIDEBAR_PAGE_URL);
    // ? TODO: there's probably a better way to do this below
    setTimeout(() => {
      this.togglePopupVisibility(true);
    }, 200);
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
  #createPopup(URL) {
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
   * toggles the visibility of the side menu iframe
   */
  togglePopupVisibility(value = null) {
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

  /**
   * takes a timestamp and skips in the video until that timestamp
   *
   * @param {String} timestamp - the desired HH:MM:SS timestamp in which the video should jump to
   */
  jumpToTimestamp(timestamp) {
    if (this.video) {
      this.video.jumpToTimestamp(timestampToSeconds(timestamp));
    }
  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }
}
