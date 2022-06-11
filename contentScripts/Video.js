class Video {
  constructor(videoElement, sessionName) {
    this.video = videoElement;
    this.sessionName = sessionName;
    this.storage = new Storage(sessionName);
  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  jumpToTimestamp(seconds) {
    this.video.currentTime = seconds;
  }

  getCurrentTimestamp() {
    // get the current video time in seconds
    const currentVideoTime = Math.floor(this.video.currentTime);
    // return the converted seconds into a string timestamp
    return new Date(currentVideoTime * 1000).toISOString().substr(11, 8);
  }

  addBookmark() {
    this.pause();
    const currentTimestamp = this.getCurrentTimestamp();
    const currentBookmark =
      this.storage.getBookmarkAtTimestamp(currentTimestamp);

    let placeholder = "";

    // if there's already a bookmark
    if (currentBookmark) {
      placeholder = currentBookmark.text;
    }

    const newBookmarkText = prompt(
      `Add a bookmark at ${currentTimestamp}`,
      placeholder
    );

    // if text input is not empty, then add bookmark
    if (newBookmarkText) {
      // TODO: let the user decide when they add a bookmark if it's nested or not
      this.storage.addBookmark(currentTimestamp, newBookmarkText, false);
      this.storage.printBookmarksPretty();
    }
    this.play();
  }

  removeBookmark(timestamp) {
    this.storage.removeBookmark(timestamp);
  }

  toggleBookmarkNesting(timestamp) {
    this.storage.toggleBookmarkNesting(timestamp);
  }
  copyStringToClipboard(str) {
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

  formatMapToTableString() {
    const TAB_CHAR = String.fromCharCode(9);
    const NEWLINE_CHAR = String.fromCharCode(10);
    let formatedString = "";
    for (let key in this.storage.bookmarks) {
      // timestamp + TAB + bookmark + NEWLINE
      formatedString +=
        key + TAB_CHAR + this.storage.bookmarks[key] + NEWLINE_CHAR;
    }

    return formatedString;
  }
}
