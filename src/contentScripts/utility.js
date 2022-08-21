export const STATUS = {
  SUCCESS: "success",
  FAILURE: "failure",
};

export const VIDEO_ACTIONS = {
  JUMP_TO_TIMESTAMP: "jump to timestamp",
  GET_CURRENT_TIMESTAMP: "get current timestamp",
  PLAY: "play video",
  PAUSE: "pause video",
  TOGGLE_PLAY: "toggle video play",
  SKIP: "skip",
  REWIND: "rewind",
  SPEED_UP: "speed up",
  SLOW_DOWN: "slow down",
  RESET_SPEED: "reset speed",
  HIDE_LIVE_CONTROLS: "hide controls",
  UPDATE_STATE: "update video state",
  INIT_STATE: "initialize video state",
};

export const UI_ACTIONS = {
  OPEN_POPUP: "open popup",
  TOGGLE_POPUP: "toggle popup",
  TOGGLE_DRAG: "toggle popup drag",
  OPEN_OPTIONS: "open options page",
  MOVE: "move popup",
  RECONNECT: "reconnect",
};

export function copyStringToClipboard(str) {
  // Create new element
  var el = document.createElement("textarea");
  // Set value (string to be copied)
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand("copy");
  // Remove temporary element
  document.body.removeChild(el);
}

export function formatMapToTableString(bookmarks) {
  const TAB_CHAR = String.fromCharCode(9);
  const NEWLINE_CHAR = String.fromCharCode(10);
  let formattedString = "";
  for (let key in bookmarks) {
    // timestamp + TAB + bookmark + NEWLINE
    formattedString += key + TAB_CHAR + bookmarks[key].text + NEWLINE_CHAR;
  }

  return formattedString;
}

export function guid() {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaaaaaaaaaa-aaaa'
  return s4() + s4() + s4() + s4() + "-" + s4();
}

export function timestampToSeconds(timestamp) {
  const array = timestamp.split(":"); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  return +array[0] * 60 * 60 + +array[1] * 60 + +array[2];
}

// return the converted seconds into a string timestamp HH:MM:SS
export const secondsToTimestamp = (seconds) => {
  return new Date(Math.floor(seconds) * 1000).toISOString().substr(11, 8);
};

// sends a message to the active tab's content script
export const sendMessageToActiveTab = (action, callback = null) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, action, callback);
  });
};

export const connectToActiveTab = async (portName) => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const port = chrome.tabs.connect(tabs[0].id, { name: portName });
      resolve(port);
    });
  });
};

// throw an error if chrome had a last error
export const checkChromeLastError = () => {
  if (chrome.runtime.lastError) throw chrome.runtime.lastError;
};

/**
 * filter method for objects
 *
 * @param {Object} obj
 * @param {Function} callback
 * @returns {{[p: string]: unknown}}
 */
export const filterObj = (obj, callback) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, val]) => callback(key, val))
  );
};

export const mapObj = (obj, callback) => {
  return Object.keys(obj).reduce(function (result, key) {
    result[key] = callback(key, obj[key]);
    return result;
  }, {});
};

/**
 * Converts a date from the format yyyy-mm-dd to mm/dd/yyyy
 *
 * @param {String} date - date in the format yyyy-mm-dd
 * @returns
 */
export function formatDatePickerStamp(date) {
  const [year, month, day] = date.split("-");
  return [month, day, year].join("/");
}

/**
 * Converts a date from the format mm/dd/yyyy to yyyy-mm-dd
 *
 * @param {String} date - date in the format mm/dd/yyyy
 * @returns
 */
export function removeFormatDatePicker(date) {
  const [month, day, year] = date.split("/");
  return [year, month, day].join("-");
}

/**
 * Returns the error message from an error object, or the string msg itself
 *
 * @param {Object | String} error - the error that contains the msg, or is the msg
 * @returns
 */
export function getErrorMsg(error) {
  return typeof error === "object" ? error.message : error;
}

/**
 * Returns the current date
 *
 * @returns {String} - the current date formatted as "yyyy-mm-dd"
 */
export function getCurrentDate() {
  return new Date().toISOString().split("T")[0];
}
