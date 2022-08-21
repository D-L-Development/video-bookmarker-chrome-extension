import React from "react";
import { createRoot } from "react-dom/client";
import MainHeaderComponent from "../components/popup/main-header/main-header.component";

const UI_ENUMS = {
  FULL: "100%",
  OFF_SCREEN: "110%",
  ZERO: "0px",
  DEFAULT_WIDTH: "400px",
  DEFAULT_TRANSITION_DURATION: "0.3s",
  RIGHT: `calc(100% - 400px)`,
  ZERO_SECONDS: "0s",
  DRAGGABLE_HEIGHT: "30em",
  DRAGGABLE_CLASS: "draggable",
};

export class Session {
  static SIDEBAR_PAGE_URL = chrome.runtime.getURL("./popup.html");

  constructor() {
    this.video = null;
    this.sidebarIframe = null;
    this.parentDiv = null;
    this.header = null;

    // create the side menu for found video
    this.#createPopup(Session.SIDEBAR_PAGE_URL);
    this.videoPort = null;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.isDraggable = false;
    this.isShown = false;
    this.lastDraggedToPosX = "600px";
    this.lastDraggedToPosY = "200px";
  }

  /**
   * Add mouseup and mousemove event listeners and update the last mouse position
   *
   * @param {Event} e
   */
  #handleMouseDragStart = (e) => {
    if (
      (e.target.tagName === "HEADER" || e.target.tagName === "H1") &&
      this.isDraggable
    ) {
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      this.parentDiv.style.transitionDuration = UI_ENUMS.ZERO_SECONDS;
      document.addEventListener("mouseup", this.#handleMouseDragEnd);
      document.addEventListener("mousemove", this.#handleMouseDrag);
    }
  };

  /**
   * Removes mouseup and mousemove events. This event fires when a mouseup event occurs
   *
   * @param {Event} e
   */
  #handleMouseDragEnd = (e) => {
    this.parentDiv.style.transitionDuration =
      UI_ENUMS.DEFAULT_TRANSITION_DURATION;
    document.removeEventListener("mouseup", this.#handleMouseDragEnd);
    document.removeEventListener("mousemove", this.#handleMouseDrag);
  };

  /**
   * Updates the popup position based on how much the cursor moved
   *
   * @param {Event} e
   */
  #handleMouseDrag = (e) => {
    const { clientX, clientY } = e;
    // find the difference in mouse movement
    const diffX = this.lastMouseX - clientX;
    const diffY = this.lastMouseY - clientY;
    // update last position
    this.lastMouseX = clientX;
    this.lastMouseY = clientY;
    // update style for popup
    this.#updatePopupPos(
      this.parentDiv.offsetLeft - diffX + "px",
      this.parentDiv.offsetTop - diffY + "px"
    );
  };

  /**
   * creates the sidmenu iframe and sets its source to URL param
   *
   * @param {String} URL - passed in URL for desired resource HTML page to be rendered within the created frame
   */
  #createPopup(URL) {
    // create the side menu
    this.parentDiv = document.createElement("div");
    this.parentDiv.classList.add("web-parent-div");
    // create the header and set its content with React
    this.header = document.createElement("div");
    this.header.classList.add("web-header");
    this.header.addEventListener("mousedown", this.#handleMouseDragStart);
    this.parentDiv.appendChild(this.header);
    const root = createRoot(this.header);
    root.render(
      <MainHeaderComponent
        closePopup={() => this.togglePopupVisibility(false)}
        toggleDrag={() => this.#togglePopupDrag()}
      />
    );

    // create the iframe
    this.sidebarIframe = document.createElement("iframe");
    this.sidebarIframe.classList.add("web-sidebar");
    this.sidebarIframe.src = URL;
    this.parentDiv.appendChild(this.sidebarIframe);

    document.body.appendChild(this.parentDiv);
  }

  #updatePopupPos(left, top) {
    this.parentDiv.style.setProperty("left", left);
    this.parentDiv.style.setProperty("top", top);
    // only update most recent drag position
    if (left !== UI_ENUMS.OFF_SCREEN && left !== UI_ENUMS.RIGHT) {
      this.lastDraggedToPosX = left;
      this.lastDraggedToPosY = top;
    }
  }

  #updatePopupHeight(height) {
    this.parentDiv.style.setProperty("height", height);
  }

  /**
   * toggles the visibility of the side menu iframe
   */
  togglePopupVisibility(value = null) {
    const { RIGHT, ZERO, OFF_SCREEN } = UI_ENUMS;
    if (value === null) value = !this.isShown;
    switch (value) {
      case true:
        this.isShown = true;
        this.isDraggable
          ? this.#updatePopupPos(this.lastDraggedToPosX, this.lastDraggedToPosY)
          : this.#updatePopupPos(RIGHT, ZERO);
        break;
      case false:
        this.isShown = false;
        this.#updatePopupPos(OFF_SCREEN, ZERO);
        break;
    }
  }

  /**
   * toggles the drag functionality of popup
   */
  #togglePopupDrag(value = null) {
    const { DRAGGABLE_HEIGHT, FULL, RIGHT, ZERO } = UI_ENUMS;
    if (value === null) value = !this.isDraggable;
    switch (value) {
      case true:
        this.isDraggable = true;
        this.#updatePopupHeight(DRAGGABLE_HEIGHT);
        this.#updatePopupPos(this.lastDraggedToPosX, this.lastDraggedToPosY);
        this.parentDiv.classList.add(UI_ENUMS.DRAGGABLE_CLASS);
        break;
      case false:
        this.isDraggable = false;
        this.#updatePopupHeight(FULL);
        this.#updatePopupPos(RIGHT, ZERO);
        this.parentDiv.classList.remove(UI_ENUMS.DRAGGABLE_CLASS);
        break;
    }
  }
}
