import React from "react";
import { createRoot } from "react-dom/client";
import MainHeaderComponent from "../components/popup/main-header/main-header.component";

const UI_ENUMS = {
  FULL: "100%",
  OFF_SCREEN: "110%",
  ZERO_PX: "0px",
  DEFAULT_WIDTH: "400px",
  DEFAULT_TRANSITION_DURATION: "0.3s",
  RIGHT: `calc(100% - 400px)`,
  ZERO_PX_SECONDS: "0s",
  DRAGGABLE_HEIGHT: "30em",
  DRAGGABLE_CLASS: "draggable",
  NONE: "none",
  BLANK: "",
  PX: "px",
};

export class PopupUiManager {
  static SIDEBAR_PAGE_URL = chrome.runtime.getURL("./popup.html");

  constructor() {
    this.video = null;
    this.sidebarIframe = null;
    this.parentDiv = null;
    this.header = null;

    // create the side menu for found video
    this.#createPopup(PopupUiManager.SIDEBAR_PAGE_URL);
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.isDraggable = false;
    this.isShown = false;
    this.lastDraggedToPosX = "600px";
    this.lastDraggedToPosY = "200px";
  }

  /**
   * Disables the selection of any elements. Used when dragging the popup to prevent text from being selected
   *
   */
  #handleAllSelectionRemoval = () => {
    window.getSelection().removeAllRanges();
  };

  /**
   * Add mouseup and mousemove event listeners and update the last mouse position
   *
   * @param {MouseEvent} e
   */
  #handleMouseDragStart = (e) => {
    if (
      (e.target.tagName === "HEADER" || e.target.tagName === "H1") &&
      this.isDraggable
    ) {
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      this.parentDiv.style.transitionDuration = UI_ENUMS.ZERO_PX_SECONDS;
      this.sidebarIframe.style.pointerEvents = UI_ENUMS.NONE;
      document.addEventListener("selectstart", this.#handleAllSelectionRemoval);
      document.addEventListener("mouseup", this.#handleMouseDragEnd);
      document.addEventListener("mousemove", this.#handleMouseDrag);
    }
  };

  /**
   * Removes mouseup and mousemove events. This event fires when a mouseup event occurs
   */
  #handleMouseDragEnd = () => {
    this.parentDiv.style.transitionDuration =
      UI_ENUMS.DEFAULT_TRANSITION_DURATION;
    this.sidebarIframe.style.pointerEvents = UI_ENUMS.BLANK;
    document.removeEventListener("mouseup", this.#handleMouseDragEnd);
    document.removeEventListener("mousemove", this.#handleMouseDrag);
    document.removeEventListener(
      "selectstart",
      this.#handleAllSelectionRemoval
    );
    this.#ensureValidPosition();
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
      this.parentDiv.offsetLeft - diffX + UI_ENUMS.PX,
      this.parentDiv.offsetTop - diffY + UI_ENUMS.PX
    );
  };

  /**
   * Checks the position of the popup to make sure that it's fully within the window
   * it's called when done dragging the popup
   */
  #ensureValidPosition() {
    const { innerWidth, innerHeight } = window;
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = this.parentDiv;
    if (offsetLeft < 0) {
      this.lastDraggedToPosX = UI_ENUMS.ZERO_PX;
      this.parentDiv.style.left = this.lastDraggedToPosX;
    } else if (offsetLeft + offsetWidth > innerWidth) {
      this.lastDraggedToPosX = UI_ENUMS.RIGHT;
      this.parentDiv.style.left = this.lastDraggedToPosX;
    }
    if (offsetTop < 0) {
      this.lastDraggedToPosY = UI_ENUMS.ZERO_PX;
      this.parentDiv.style.top = this.lastDraggedToPosY;
    } else if (offsetTop + offsetHeight > innerHeight) {
      this.lastDraggedToPosY = innerHeight - offsetHeight + UI_ENUMS.PX;
      this.parentDiv.style.top = this.lastDraggedToPosY;
    }
  }

  /**
   * creates the side menu iframe and sets its source to URL param
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

  /**
   * Sets the left and right style properties of the popup
   *
   * @param {string} left - string with a css unit
   * @param {string} top - string with a css unit
   */
  #updatePopupPos(left, top) {
    this.parentDiv.style.setProperty("left", left);
    this.parentDiv.style.setProperty("top", top);
    // only update most recent drag position
    if (this.isDraggable && this.isShown) {
      this.lastDraggedToPosX = left;
      this.lastDraggedToPosY = top;
    }
  }

  /**
   * Update the height style property of the popup
   *
   * @param {string} height - string with a css unit
   */
  #updatePopupHeight(height) {
    this.parentDiv.style.setProperty("height", height);
  }

  /**
   * toggles the visibility of the side menu iframe
   */
  togglePopupVisibility(value = null) {
    const { RIGHT, ZERO_PX, OFF_SCREEN } = UI_ENUMS;
    if (value === null) value = !this.isShown;
    switch (value) {
      case true:
        this.isShown = true;
        this.isDraggable
          ? this.#updatePopupPos(this.lastDraggedToPosX, this.lastDraggedToPosY)
          : this.#updatePopupPos(RIGHT, ZERO_PX);
        break;
      case false:
        this.isShown = false;
        this.#updatePopupPos(OFF_SCREEN, ZERO_PX);
        break;
    }
  }

  /**
   * toggles the drag functionality of popup
   */
  #togglePopupDrag(value = null) {
    const { DRAGGABLE_HEIGHT, FULL, RIGHT, ZERO_PX } = UI_ENUMS;
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
        this.#updatePopupPos(RIGHT, ZERO_PX);
        this.parentDiv.classList.remove(UI_ENUMS.DRAGGABLE_CLASS);
        break;
    }
  }
}
