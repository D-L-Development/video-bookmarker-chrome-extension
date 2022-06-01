class Session {
  constructor() {
    this.session = {};
    this.video = null;
    this.sidebarIframe = null;
  }

  sessionExists(URL) {
    // TODO: look in storage for session with matching URL
    return false;
  }

  createSidemenu(URL) {
    this.sidebarIframe = document.createElement("iframe");
    this.sidebarIframe.classList.add("web-sidebar");
    // this.sidebarIframe.src = chrome.runtime.getURL("popup.html");
    this.sidebarIframe.src = URL;
    document.body.appendChild(this.sidebarIframe);
  }

  removeSidemenu() {
    this.sidebarIframe.remove();
    this.sidebarIframe = null;
  }

  toggleSidemenuVisiblity() {
    this.sidebarIframe.classList.toggle("on");
  }

  // triggered upon a message from popup script.
  // Takes a timestamp and jumps to it in the video
  jumpToTimestamp(timestamp) {
    if (this.video) {
      this.video.jumpToTimestamp(timestampToSeconds(timestamp));
      return;
    }

    alert("Can't jump to timestamp. No video found on the current page!");
  }

  deleteBookmark(timestamp) {
    if (this.video) {
      this.video.removeBookmark(timestamp);
      return;
    }

    alert("Can't delete bookmark. No video found on the current page!");
  }

  toggleBookmarkNesting(timestamp) {
    if (this.video) {
      this.video.toggleBookmarkNesting(timestamp);
      return;
    }
    alert("Can't toggle bookmark nesting. No video found on the current page!");
  }
}
