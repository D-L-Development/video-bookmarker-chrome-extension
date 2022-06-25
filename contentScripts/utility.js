const MSG = {
  SUCCESS: "success",
  FAILURE: "failure",
  TOGGLE: "toggle",
  CREATE_NEW_SESSION: "createNewSession",
  SELECT_SESSION: "selectSession",
  DELETE_SESSION: "deleteSession",
  EDIT_SESSION: "editSession",
  JUMP_TO_TIMESTAMP: "jumpToTimestamp",
  DELETE_BOOKMARK: "deleteBookmark",
  TOGGLE_BOOKMARK_NESTING: "toggleBookmarkNesting",
  ADD_BOOKMARK: "addBookmark",
  COPY_TABLE: "copyTable",
  GET_BOOKMARK_AT_TIMESTAMP: "getBookmarkAtTimestamp",
};

class Bookmark {
  constructor(title, text, timestamp = null) {
    this.title = title;
    this.text = text;
    this.timestamp = timestamp;
    this.isNested = false;
  }
}

function copyStringToClipboard(str) {
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

function formatMapToTableString(bookmarks) {
  const TAB_CHAR = String.fromCharCode(9);
  const NEWLINE_CHAR = String.fromCharCode(10);
  let formatedString = "";
  for (let key in bookmarks) {
    // timestamp + TAB + bookmark + NEWLINE
    formatedString += key + TAB_CHAR + bookmarks[key].text + NEWLINE_CHAR;
  }

  return formatedString;
}

function copyTableToClipboard(bookmarks) {
  copyStringToClipboard(formatMapToTableString(bookmarks));
}

function guid() {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

function timestampToSeconds(timestamp) {
  const array = timestamp.split(":"); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  return +array[0] * 60 * 60 + +array[1] * 60 + +array[2];
}

// sends a message to the active tab's content script
const sendMessageToActiveTab = (payload, callback) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, payload, callback);
  });
};

/**
 * Converts a date from the format yyyy-mm-dd to mm/dd/yyyy
 *
 * @param {String} date - date in the format yyyy-mm-dd
 * @returns
 */
function formatDatePickerStamp(date) {
  const [year, month, day] = date.split("-");
  return [month, day, year].join("/");
}

/**
 * Converts a date from the format mm/dd/yyyy to yyyy-mm-dd
 *
 * @param {String} date - date in the format mm/dd/yyyy
 * @returns
 */
function removeFormatDatePicker(date) {
  const [month, day, year] = date.split("/");
  return [year, month, day].join("-");
}

/**
 * Returns the error message from an error object, or the string msg itself
 *
 * @param {Object | String} error - the error that contains the msg, or is the msg
 * @returns
 */
function getErrorMsg(error) {
  return typeof error === "object" ? error.message : error;
}
