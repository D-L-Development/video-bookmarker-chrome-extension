class Session {
  constructor() {
    this.session = {};
    this.video = null;
    this.sidebarIframe = null;
    this.ALL_SESSIONS = "All Sessions";
  }

  sessionExists(URL) {
    // TODO: look in storage for session with matching URL
    chrome.storage.sync.get(this.ALL_SESSIONS, (response) => {
      // if there is a session in storage, then return it
      if (Object.keys(response).length > 0) {
        const sessions = response[this.ALL_SESSIONS];
        console.log(sessions);
        sessions.forEach((session) => {
          if (session === URL) {
            return true;
          }
        });
      }
      return false;
    });
  }

  // creates the sidebar if it doesn't already exist, and sets its source to URL param
  sideMenuUpdate(URL) {
    // create the side menu if there's isn't one
    if (!this.sidebarIframe) {
      this.sidebarIframe = document.createElement("iframe");
      this.sidebarIframe.classList.add("web-sidebar");
      // this.sidebarIframe.src = chrome.runtime.getURL("popup.html");
      this.sidebarIframe.src = URL;
      document.body.appendChild(this.sidebarIframe);
    }

    // update the source URL
    this.sidebarIframe.src = URL;
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
