import {
  guid,
  secondsToTimestamp,
  timestampToSeconds,
  VIDEO_ACTIONS,
} from "./utility";

const SPEED_AMOUNT = 0.1;
const uuid = guid();
let video = null;
/*
 * keep track of if page had video
 * since the only time we will know if there's a video is through a performed
 * user action or on page load, this var will keep track of the most recent state
 * in case a video gets removed from the page, this var will indicate that there was
 * a video most recently
 */
let pageHadVideo;
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
const videoOperationsMiddleWare = () => {
  // video element has already been initialized
  if (isVideoInDOM()) return true;
  // try to search for a video when an operation that is
  // performed with no video in the page
  return tryToGetVideo();
};

const tryToGetVideo = () => {
  video = findVideo(document);
  if (isVideoInDOM()) {
    addVideoEvtListeners();
    sendVideoData(null);
    pageHadVideo = true;
    return true;
  } else {
    pageHadVideo &&
      sendMessageToPopup({ type: VIDEO_ACTIONS.HIDE_LIVE_CONTROLS });
    pageHadVideo = false;
    return false;
  }
};

const sendMessageToPopup = ({ type, payload = null }) => {
  chrome.runtime.sendMessage({ type, payload }, null);
};

/**
 * Checks if possible to send HTML video information to connected port, if so
 * it sends the video state as an object {payload: {}}
 *
 * @param {Event} e
 */
const sendVideoData = (e) => {
  if (!isVideoInDOM()) {
    sendMessageToPopup({ type: VIDEO_ACTIONS.HIDE_LIVE_CONTROLS });
    return;
  }
  // send video state to popup
  const { paused, playbackRate } = video;
  sendMessageToPopup({
    type: VIDEO_ACTIONS.UPDATE_STATE,
    payload: {
      paused,
      playbackRate,
    },
  });
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
  if (!videoOperationsMiddleWare()) {
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

// wire single req/res message listener
chrome.runtime.onMessage.addListener((action, sender, sendResponse) => {
  // only call dispatch on video actions because this listener will run on any messages,
  // but we only care about the video related actions
  if (!isVideoTypeAction(action.type)) return;
  // when the video context in the popup first loads, it will ask for a video
  // tryToGetVideo will send a msg to the popup if a video is found
  if (action.type === VIDEO_ACTIONS.INIT_STATE) {
    tryToGetVideo();
    return;
  }
  // only send response on success. That way if no scripts respond, the popup knows that no page has a video
  const payload = dispatch(action);
  if (payload !== false) sendResponse({ payload });
});
