import {
  guid,
  secondsToTimestamp,
  STATUS,
  timestampToSeconds,
  UI_ACTIONS,
  VIDEO_ACTIONS,
} from "./utility";
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
 * @returns {boolean}
 */
const canPerformVideoOperations = () => {
  if (isVideoInDOM()) return true;
  video = findVideo(document);
  if (isVideoInDOM()) {
    addVideoEvtListeners();
    sendVideoData(null);
    return true;
  } else {
    return false;
  }
};

const forceReconnection = () => {
  chrome.runtime.sendMessage({ type: UI_ACTIONS.RECONNECT }, (payload) => {
    console.log(payload);
  });
};

/**
 * Checks if possible to send HTML video information to connected port, if so
 * it sends the video state as an object {payload: {}}
 *
 * @param {Event} e
 */
const sendVideoData = (e) => {
  // make popup reconnect if no port is available
  if (!videoPort) return forceReconnection();
  if (isVideoInDOM()) {
    const { paused, playbackRate } = video;
    videoPort.postMessage({
      payload: {
        paused,
        playbackRate,
      },
    });
  } else {
    console.log("Failed to send msg to popup");
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

const dispatch = (action) => {
  if (!canPerformVideoOperations()) {
    return false;
  }
  switch (action.type) {
    case VIDEO_ACTIONS.GET_CURRENT_TIMESTAMP:
      return getCurrentTimestamp();
    case VIDEO_ACTIONS.JUMP_TO_TIMESTAMP:
      return jumpToTimestamp(action.payload.timestamp);
    case VIDEO_ACTIONS.PLAY:
      return play();
    case VIDEO_ACTIONS.PAUSE:
      return pause();
    case VIDEO_ACTIONS.TOGGLE_PLAY:
      return togglePlay();
    case VIDEO_ACTIONS.SKIP:
      return skipBy(action.payload.seconds);
    case VIDEO_ACTIONS.REWIND:
      return skipBy(action.payload.seconds * -1);
    case VIDEO_ACTIONS.SPEED_UP:
      return changeSpeedBy(SPEED_AMOUNT);
    case VIDEO_ACTIONS.SLOW_DOWN:
      return changeSpeedBy(SPEED_AMOUNT * -1);
    case VIDEO_ACTIONS.RESET_SPEED:
      return resetSpeed();
    default:
      throw new Error(`Action type "${action.type}" is unhandled!`);
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

/**
 * Checks if the given action is part of the VIDEO_ACTIONS object
 *
 * @param actionName
 * @returns {boolean}
 */
const isVideoTypeAction = (actionName) => {
  for (const key in VIDEO_ACTIONS) {
    if (VIDEO_ACTIONS[key] === actionName) {
      return true;
    }
  }
  return false;
};

// wire port connection to update popup of video state
chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== PORT_NAMES.VIDEO) return;
  // search for video
  video = findVideo(document);
  if (isVideoInDOM()) {
    videoPort = port;
    addVideoEvtListeners();
    sendVideoData(null);
  } else {
    port.postMessage({
      payload: null,
      message: "Failed to find a video in the current page. Please try again",
    });
  }
});

// wire single req/res message listener
chrome.runtime.onMessage.addListener((action, sender, sendResponse) => {
  // only call dispatch on video actions because this listener will run on any messages,
  // but we only care about the video related actions
  if (!isVideoTypeAction(action.type)) return;
  // only send response on success
  const payload = dispatch(action);
  if (payload !== false) sendResponse({ status: STATUS.SUCCESS, payload });
});
