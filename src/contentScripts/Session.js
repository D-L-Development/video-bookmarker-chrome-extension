import {
  getErrorMsg,
  MSG,
  secondsToTimestamp,
  timestampToSeconds,
} from "./utility";
import { PORT_NAMES } from "../constants/constants";
import React from "react";
import { createRoot } from "react-dom/client";
import MainHeaderComponent from "../components/popup/main-header/main-header.component";

export class Session {
  static SIDEBAR_PAGE_URL = chrome.runtime.getURL("./popup.html");
  static SPEED_AMOUNT = 0.1;

  constructor() {
    this.video = null;
    this.sidebarIframe = null;
    this.parentDiv = null;
    this.header = null;

    // create the side menu for found video
    this.#createPopup(Session.SIDEBAR_PAGE_URL);
    this.videoPort = null;
    this.posPort = null;

    // handle port connection by sending video information
    chrome.runtime.onConnect.addListener((port) => {
      console.log("connected", port);
      switch (port.name) {
        case PORT_NAMES.VIDEO:
          this.videoPort = port;
          this.#getVideoElement(3)
            .then((video) => {
              this.video = video;
              this.#sendVideoData();
            })
            .catch((error) => {
              this.videoPort.postMessage({
                payload: null,
                message: getErrorMsg(error),
              });
            });
          break;
        case PORT_NAMES.POSITION:
          this.posPort = port;
          port.onMessage.addListener((payload, port) => {
            // console.log(performance.now() - action.now);
            this.#updatePopupPos(payload);
          });
          break;
      }
    });
  }

  async dispatch(action) {
    // for action that don't depend on a video being present in the DOM
    switch (action.type) {
      case MSG.TOGGLE_DRAG:
        return this.#togglePopupDrag();
      case MSG.MOVE:
        return this.#updatePopupPos(action.payload);
    }
    try {
      await this.#canPerformVideoOperations();
      switch (action.type) {
        case MSG.GET_CURRENT_TIMESTAMP:
          return this.#getCurrentTimestamp();
        case MSG.JUMP_TO_TIMESTAMP:
          return this.#jumpToTimestamp(action.payload.timestamp);
        case MSG.PLAY:
          return this.#play();
        case MSG.PAUSE:
          return this.#pause();
        case MSG.TOGGLE_PLAY:
          return this.#togglePlay();
        case MSG.SKIP:
          return this.#skipBy(action.payload.seconds);
        case MSG.REWIND:
          return this.#skipBy(action.payload.seconds * -1);
        case MSG.SPEED_UP:
          return this.#changeSpeedBy(Session.SPEED_AMOUNT);
        case MSG.SLOW_DOWN:
          return this.#changeSpeedBy(Session.SPEED_AMOUNT * -1);
        case MSG.RESET_SPEED:
          return this.#resetSpeed();
        case MSG.TOGGLE_DRAG:
          return this.#togglePopupDrag();
        default:
          throw new Error(`Action type "${action.type}" is unhandled!`);
      }
    } catch (e) {
      throw e;
    }
  }

  /**
   * Checks for the video member to make sure it's in the DOM
   * it will search for it if the reference is lost or doesn't exist
   *
   * @returns {Promise<void>}
   */
  async #canPerformVideoOperations() {
    try {
      if (this.#isVideoInDOM()) return;
      this.video = await this.#getVideoElement(3);
    } catch (e) {
      throw e;
    }
  }

  /**
   * resets the video and current page URL
   */
  #resetVideo() {
    this.video = null;
  }

  /**
   * searches the DOM for a video element. Returns the first found video
   *
   * @param {number} repeatCount - the amount of times the interval should repeatedly search for the video
   * @returns {Promise} - resolved with an HTML video element, or rejected with an error
   */
  #getVideoElement(repeatCount = 3) {
    return new Promise((resolve, reject) => {
      let video = document.querySelector("video");
      if (video) resolve(video);
      // declare time interval to keep searching for video
      const intervalId = setInterval(() => {
        // if repeated (repeatCount) times, then reject
        if (--repeatCount <= 0) {
          clearInterval(intervalId);
          reject("Please visit a page containing a video, or try again");
        }

        // try to get video again
        const video = document.querySelector("video");
        if (video) {
          clearInterval(intervalId);
          this.#addVideoEvtListeners();
          resolve(video);
        }
      }, 1000);
    });
  }

  /**
   * Wire event listener for video element
   */
  #addVideoEvtListeners() {
    // const events = ["play", "pause", "ratechange", "timeupdate"];
    const events = ["play", "pause", "ratechange"];
    events.forEach((eventName) =>
      this.video.addEventListener(eventName, this.#sendVideoData)
    );
  }

  /**
   * Checks if possible to send HTML video information to connected port, if so
   * it sends the video state as an object {payload: {}}
   *
   * @param {Event} e
   */
  #sendVideoData = (e) => {
    if (this.#isVideoInDOM() && this.videoPort) {
      const { paused, playbackRate } = this.video;
      this.videoPort.postMessage({
        payload: {
          paused,
          playbackRate,
        },
      });
    } else {
      throw new Error("Failed to send msg to popup");
    }
  };

  /**
   * Checks to see if the video element is still in the dom
   *
   * @returns {boolean}
   */
  #isVideoInDOM = () => !!this.video?.parentNode;

  /**
   * creates the sidmenu iframe and sets its source to URL param
   *
   * @param {String} URL - passed in URL for desired resource HTML page to be rendered within the created frame
   */
  #createPopup(URL) {
    // create the side menu
    this.parentDiv = document.createElement("div");
    this.parentDiv.classList.add("web-parent-div");
    // create the header and set its content with React
    this.header = document.createElement("div");
    this.header.classList.add("web-header");
    this.parentDiv.appendChild(this.header);
    const root = createRoot(this.header);
    root.render(
      <MainHeaderComponent
        togglePopup={() => this.togglePopupVisibility()}
        toggleDrag={() => this.#togglePopupDrag()}
      />
    );

    // create the iframe
    this.sidebarIframe = document.createElement("iframe");
    this.sidebarIframe.classList.add("web-sidebar");
    this.sidebarIframe.src = URL;
    this.parentDiv.appendChild(this.sidebarIframe);

    document.body.appendChild(this.parentDiv);
  }

  #updatePopupPos(position) {
    let { top, left } = position;
    this.sidebarIframe.style.left = left;
    this.sidebarIframe.style.top = top;
  }

  /**
   * removes the sidebar element from the DOM
   */
  removePopup() {
    this.sidebarIframe.remove();
    this.sidebarIframe = null;
  }

  /**
   * toggles the visibility of the side menu iframe
   */
  togglePopupVisibility(value = null) {
    switch (value) {
      case null:
        this.parentDiv.classList.toggle("show");
        break;
      case true:
        this.parentDiv.classList.add("show");
        break;
      case false:
        this.parentDiv.classList.remove("show");
        break;
    }
  }

  /**
   * toggles the drag functionality of popup
   */
  #togglePopupDrag(value = null) {
    switch (value) {
      case null:
        this.parentDiv.classList.toggle("draggable");
        break;
      case true:
        this.parentDiv.classList.add("draggable");
        break;
      case false:
        this.parentDiv.classList.remove("draggable");
        break;
    }
  }

  /**
   * returns the timestamp of the current video time and the current bookmark if there is one
   *
   * @returns {Object} - with properties timestamp
   */
  #getCurrentTimestamp() {
    return { timestamp: secondsToTimestamp(this.video.currentTime) };
  }

  /**
   * takes a timestamp and skips in the video until that timestamp
   *
   * @param {String} timestamp - the desired HH:MM:SS timestamp in which the video should jump to
   */
  #jumpToTimestamp(timestamp) {
    // TODO: make sure the timestamp given can be jumped to. The video can be too short for example
    this.video.currentTime = timestampToSeconds(timestamp);
  }

  #play() {
    this.video.play();
  }

  #pause() {
    this.video.pause();
  }

  #togglePlay() {
    this.video.paused ? this.#play() : this.#pause();
  }

  #skipBy(seconds) {
    this.video.currentTime += seconds;
  }

  #changeSpeedBy(SPEED_AMOUNT) {
    this.video.playbackRate += SPEED_AMOUNT;
  }

  #resetSpeed() {
    this.video.playbackRate = 1;
  }
}
