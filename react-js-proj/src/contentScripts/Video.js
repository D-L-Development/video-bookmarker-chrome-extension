import { Storage } from "./Storage";

/**
 * Video class manages the HTML video found in the DOM. It instantiates
 * a Storage class instance which holds the bookmarks relating to the
 * currently loaded video based on the provided session name
 */
// TODO: passing the date to this constructor might not be necessary
export class Video {
  constructor(videoElement, sessionName, date) {
    this.video = videoElement;
    this.sessionName = sessionName;
    this.storage = new Storage(sessionName, date);
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

  async addBookmark(bookmark) {
    this.pause();
    await this.storage.addBookmark(bookmark);
    this.play();
  }

  async removeBookmark(timestamp) {
    await this.storage.removeBookmark(timestamp);
  }

  toggleBookmarkNesting(timestamp) {
    this.storage.toggleBookmarkNesting(timestamp);
  }
}
