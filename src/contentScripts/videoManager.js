import { guid, MSG, secondsToTimestamp, timestampToSeconds } from "./utility";
import { PORT_NAMES } from "../constants/constants";

const SPEED_AMOUNT = 0.1;
const uuid = guid();
let videoPort = null;
let video = null;
console.log("videoManager", uuid);

/**
 * Searches recursively through a document or an iframe for a video HTML element
 * if not found in document, the func will attempt to traverse down the tree
 * into any iframe elements
 *
 * @param {Object} ctx - document or iframe
 * @returns {HTMLVideoElement | null} - Video HTML or null
 */
const findVideo = (ctx) => {
  const videos = ctx.getElementsByTagName("video");
  // return the video if found
  if (videos[0]) return videos[0];
  // get other iframes in the context
  const iframes = ctx.getElementsByTagName("iframe");
  if (iframes.length === 0) return null;
  // search for video in each iframe recursively
  for (let i = 0; i < iframes.length; i++) {
    try {
      return findVideo(iframes[i].contentWindow.document);
    } catch (e) {
      return null;
    }
  }
};

/**
 * Checks to see if the video element is still in the dom
 *
 * @returns {boolean}
 */
const isVideoInDOM = () => !!video?.parentNode;

/**
 * Checks for the video member to make sure it's in the DOM
 * it will search for it if the reference is lost or doesn't exist
 *
 * @returns {Promise<*>}
 */
const canPerformVideoOperations = async () => {
  if (isVideoInDOM()) return;
  video = findVideo(document);
  if (!video) {
    throw new Error("Failed to find video");
  }
};

/**
 * Checks if possible to send HTML video information to connected port, if so
 * it sends the video state as an object {payload: {}}
 *
 * @param {Event} e
 */
const sendVideoData = (e) => {
  if (isVideoInDOM()) {
    const { paused, playbackRate } = video;
    videoPort.postMessage({
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
 * Wire event listener for video element
 */
const addVideoEvtListeners = () => {
  // const events = ["play", "pause", "ratechange", "timeupdate"];
  const events = ["play", "pause", "ratechange"];
  events.forEach((eventName) =>
    video.addEventListener(eventName, sendVideoData)
  );
};

/**
 * returns the timestamp of the current video time and the current bookmark if there is one
 *
 * @returns {Object} - with properties timestamp
 */
const getCurrentTimestamp = () => {
  return { timestamp: secondsToTimestamp(video.currentTime) };
};

/**
 * takes a timestamp and skips in the video until that timestamp
 *
 * @param {String} timestamp - the desired HH:MM:SS timestamp in which the video should jump to
 */
const jumpToTimestamp = (timestamp) => {
  // TODO: make sure the timestamp given can be jumped to. The video can be too short for example
  video.currentTime = timestampToSeconds(timestamp);
};

const dispatch = async (action) => {
  try {
    await canPerformVideoOperations();
    switch (action.type) {
      case MSG.GET_CURRENT_TIMESTAMP:
        return getCurrentTimestamp();
      case MSG.JUMP_TO_TIMESTAMP:
        return jumpToTimestamp(action.payload.timestamp);
      case MSG.PLAY:
        return play();
      case MSG.PAUSE:
        return pause();
      case MSG.TOGGLE_PLAY:
        return togglePlay();
      case MSG.SKIP:
        return skipBy(action.payload.seconds);
      case MSG.REWIND:
        return skipBy(action.payload.seconds * -1);
      case MSG.SPEED_UP:
        return changeSpeedBy(SPEED_AMOUNT);
      case MSG.SLOW_DOWN:
        return changeSpeedBy(SPEED_AMOUNT * -1);
      case MSG.RESET_SPEED:
        return resetSpeed();
      default:
        throw new Error(`Action type "${action.type}" is unhandled!`);
    }
  } catch (e) {
    throw e;
  }
};

const play = () => {
  video.play();
};

const pause = () => {
  video.pause();
};

const togglePlay = () => {
  video.paused ? play() : pause();
};

const skipBy = (seconds) => {
  video.currentTime += seconds;
};

const changeSpeedBy = (SPEED_AMOUNT) => {
  video.playbackRate += SPEED_AMOUNT;
};

const resetSpeed = () => {
  video.playbackRate = 1;
};

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== PORT_NAMES.VIDEO) return;
  video = findVideo(document);
  if (video) {
    videoPort = port;
    port.onMessage.addListener((action, port) => {
      // TODO: this if for if the user searches for a video again
      console.log("MESSAGE");
    });
    addVideoEvtListeners();
    sendVideoData(null);
  } else {
    port.postMessage({
      payload: null,
      message: "Failed to find a video in the current page. Please try again",
    });
  }
});
