class userInterfaceManager {
  static NAV_PAGE = "navPage";
  static VIDEO_PAGE = "videoPage";
  static CURRENT_VID_KEY = "currentVideoURL";

  constructor() {
    this.scrollablePagesContainer = document.getElementById("pageScroller");
    const { CURRENT_VID_KEY, VIDEO_PAGE } = userInterfaceManager;
    // TODO: this needs to happen faster
    chrome.storage.sync.get(CURRENT_VID_KEY, (response) => {
      if (response[CURRENT_VID_KEY]) {
        this.togglePage(VIDEO_PAGE);
      } else {
        this.togglePage(NAV_PAGE);
      }
    });
  }

  togglePage(page = null) {
    switch (page) {
      case userInterfaceManager.NAV_PAGE:
        this.scrollablePagesContainer.classList.remove("videoPage");
        break;
      case userInterfaceManager.VIDEO_PAGE:
        this.scrollablePagesContainer.classList.add("videoPage");
        break;
      default:
        this.scrollablePagesContainer.classList.toggle("videoPage");
    }
  }
}
