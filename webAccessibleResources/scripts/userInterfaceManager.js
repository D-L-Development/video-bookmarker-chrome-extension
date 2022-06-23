/**
 * userInterfaceManager - responsible for handling ui changes for the sidemenu iframe.
 * an instance of this class is created in the popup.js file. This class uses chrome.storage
 * but only for reading. It NEVER updates chrome.storage. It rather sends messages to the
 * content script to handle any changes needed outside of the scope of the sidemenu ui
 */
class userInterfaceManager {
  static NAV_PAGE = "navPage";
  static VIDEO_PAGE = "videoPage";
  static ALL_SESSIONS = "All Sessions";
  static DISPLAY = {
    BLOCK: "block",
    INLINE: "inline",
    INLINE_BLOCK: "inline-block",
    FLEX: "flex",
    NONE: "none",
  };

  constructor() {
    // get the DOM elements
    this.scrollablePagesContainer = document.getElementById("pageScroller");
    this.sessionName = document.querySelector("h1");
    this.copyTableBtn = document.querySelector(".copyTableBtn");
    this.newSessionButton = document.getElementById("newSessionButton");
    this.closeBtnIcon = document.getElementById("closeIcon");
    this.backArrowIcon = document.getElementById("backArrowIcon");
    this.addBookmarkBtn = document.querySelector(".addBookmarkBtn");
    this.clearSearchIcon = document.querySelector(".clearSearchIcon");
    this.searchSessions = document.getElementById("searchSessions");
    this.videoBookmarksPageContentLoading = document.getElementById(
      "videoBookmarksPageContentLoading"
    );
    this.videoBookmarksPageContent = document.getElementById(
      "videoBookmarksPageContent"
    );
    this.mainNavPageContentLoading = document.getElementById(
      "mainNavPageContentLoading"
    );
    this.mainNavPageContent = document.getElementById("mainNavPageContent");

    // get the templates
    this.bookmarkTemplate = document.getElementById("bookmarkTemplate");
    this.sessionItemTemplate = document.getElementById("sessionItemTemplate");

    // memeber to keep track of the currently rendered page
    // gets updated by the togglePage function
    // TODO: make sure to prevent modifiying sessions or bookmarks when going in between pages. This variable should always be updated. You know what I mean
    this.isNavPageInFrame = true;

    this.#wireEventListeners();
    this.renderNavPage();
  }

  /**
   * Triggered when the user types in the search box. It shows or hides the clear
   * X icon, and handles showing or hiding the sessions based on name
   *
   * @param {Event} e - input event object
   */
  #handleSearchSessionOnChange = (e) => {
    const { value } = e.target;
    // update the session items UI
    this.#filterSessionsByName(value);
    // add or remove the clear icon
    if (value.length === 0) {
      this.#setClearSearchBoxIconVisiblity(false);
    } else {
      this.#setClearSearchBoxIconVisiblity(true);
    }
  };

  /**
   * adds or removes the CSS class "videoPage" to slide the scrollerPage div right, or left
   * to expose the nav, or video page. It also updates isNavPageInFrame
   *
   * @param {String} page - defaults to null, and accepts the two constant strings navPage, or videoPage
   */
  togglePage(page = null) {
    const { NAV_PAGE, VIDEO_PAGE } = userInterfaceManager;
    switch (page) {
      case NAV_PAGE:
        this.isNavPageInFrame = true;
        this.scrollablePagesContainer.classList.remove(VIDEO_PAGE);
        break;
      case VIDEO_PAGE:
        this.isNavPageInFrame = false;
        this.scrollablePagesContainer.classList.add(VIDEO_PAGE);
        break;
      default:
        this.isNavPageInFrame = !isNavPageInFrame;
        this.scrollablePagesContainer.classList.toggle(VIDEO_PAGE);
    }
  }

  /**
   * sets the value of the h1 HTML element
   *
   * @param {String} title - the string value for the h1 element
   */
  #updateTitle(title) {
    this.sessionName.innerText = title;
  }

  /**
   * responsible for sliding the nav page into frame, and loading it's content from chrome.storage
   * through the use of a couple of helper functions.
   */
  renderNavPage() {
    // show the loading page
    this.#setNavPageIsLoading(true);
    // update the title
    this.#updateTitle("All Sessions");
    // remove the back button icon
    this.#setBackArrowIconVisibility(false);
    // drag the nav page in frame if it's not already
    this.togglePage(userInterfaceManager.NAV_PAGE);
    // wait for all sessions to be retreived from chrome.storage
    this.#getAllSessionNamesFromChromeStorage()
      .then((response) => {
        this.#renderNavSessionsUI(response.sessions);
        this.#setNavPageIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        this.#renderNavSessionsUI(null);
        this.#setNavPageIsLoading(false);
      });
  }

  /**
   * responsible for sliding the video page into frame, and loading it's content from chrome.storage
   * through the use of a couple of helper functions using the sessionName param as a storage key
   *
   * @param {String} sessionName - string session name value to be rendered in the video page div
   */
  renderVideoPage(sessionName) {
    // show the loading page
    this.#setVideoPageIsLoading(true);
    // update the title
    this.#updateTitle(sessionName);
    // show the back arrow icon
    this.#setBackArrowIconVisibility(true);
    // drag the video page in frame if it's not already
    this.togglePage(userInterfaceManager.VIDEO_PAGE);
    // get the video session from chrome.storage
    this.#getSessionFromChromeStorage(sessionName)
      .then((response) => {
        this.#renderVideoSessionUI(response.bookmarks);
        this.#setVideoPageIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        this.#renderVideoSessionUI(null);
        this.#setVideoPageIsLoading(false);
      });
  }

  /**
   * renders the elements corrosponding to each session name, or
   * an empty page indicating that there are no sessions present
   *
   * @param {Array} sessions - array of strings from chrome.storage holding session names
   * @returns
   */
  #renderNavSessionsUI(sessions) {
    this.mainNavPageContent.innerHTML = "";
    // if there are no sessions in storage, then render a simple msg
    if (!sessions) {
      const emptyPageElem = document
        .querySelector(".emptyPageTemplate")
        .content.firstElementChild.cloneNode(true);
      emptyPageElem.firstElementChild.innerText =
        "Create your first session by clicking the add session button";
      this.mainNavPageContent.appendChild(emptyPageElem);
      return;
    }

    // otherwise, render all the sessions
    this.mainNavPageContent.innerHTML = "";
    sessions.forEach((sessionName) => {
      const sessionElem =
        this.sessionItemTemplate.content.firstElementChild.cloneNode(true);
      const sessionNameElem = sessionElem.querySelector(".sessionName");
      sessionNameElem.innerText = sessionName;
      sessionNameElem.addEventListener("click", this.#handleSessionItemClick);
      // set attibute so the icons can delete the session item
      sessionElem
        .querySelector(".sessionItemIcons")
        .setAttribute("sessionName", sessionName);
      sessionElem
        .querySelector(".sessionConfirmIcon")
        .addEventListener("click", this.#handleSessionItemEditionConfirm);
      sessionElem
        .querySelector(".sessionEditIcon")
        .addEventListener("click", this.#handleSessionItemEdition);
      sessionElem
        .querySelector(".sessionDeleteIcon")
        .addEventListener("click", this.#handleSessionItemDeletion);

      this.mainNavPageContent.appendChild(sessionElem);
    });
  }

  /**
   * renders the HTML elements corrosponding to each bookmark passed in, or an empty page
   * if null is passed in. It uses a template from the popup.html page to render each bookmark
   *
   * @param {Object} bookmarks - the object from chrome.storage with timestamp "hh:mm:ss" keys
   */
  #renderVideoSessionUI(bookmarks) {
    // remove current content
    this.videoBookmarksPageContent.innerHTML = "";
    if (!bookmarks) {
      const emptyPageElem = document
        .querySelector(".emptyPageTemplate")
        .content.firstElementChild.cloneNode(true);
      emptyPageElem.firstElementChild.innerText =
        "Create your first bookmark by clicking the add bookmark button";
      this.videoBookmarksPageContent.appendChild(emptyPageElem);

      return;
    }
    // render the bookmarks
    for (const key in bookmarks) {
      this.#appendBookmarkItem(bookmarks[key]);
    }
  }

  /**
   * takes a bookmark object data and renders a single UI item and appends it to the videoBookmarksPageContent
   *
   * @param {Object} bookmark - bookmark object data to be rendered as a UI item
   */
  #appendBookmarkItem(bookmark) {
    const { isNested, text, title, timestamp } = bookmark;
    const bookmarkElem =
      this.bookmarkTemplate.content.firstElementChild.cloneNode(true);
    // add or remove the nested class
    isNested
      ? bookmarkElem.classList.add("nested")
      : bookmarkElem.classList.remove("nested");
    // set the content
    const bookmarkText = bookmarkElem.querySelector(".timestampText");
    bookmarkText.innerText = timestamp;
    bookmarkText.addEventListener("click", this.#handleBookmarkTimestampClick);
    bookmarkElem.querySelector(".title").innerText = title;
    bookmarkElem.querySelector(".bookmarkBodyText").innerText = text;
    // set the timestamp attribute
    bookmarkElem
      .querySelector(".headerIcons")
      .setAttribute("timestamp", timestamp);
    // wire event listeners for header icons
    bookmarkElem
      .querySelector(".editIcon")
      .addEventListener("click", this.#handleBookmarkEditIconClick);
    bookmarkElem
      .querySelector(".nestIcon")
      .addEventListener("click", this.#handleBookmarkNestIconClick);
    bookmarkElem
      .querySelector(".trashIcon")
      .addEventListener("click", this.#handleBookmarkTrashIconClick);
    // append the new bookmark
    this.videoBookmarksPageContent.appendChild(bookmarkElem);
  }

  /**
   * Helper function to wire all event listeners for presistent components
   * such as the back button or close icon
   */
  #wireEventListeners() {
    // wire event for closing sidebar
    this.closeBtnIcon.addEventListener("click", this.#handleCloseIconClick);
    // wire event handler for the back btn
    this.backArrowIcon.addEventListener(
      "click",
      this.#handleBackArrowIconClick
    );
    this.addBookmarkBtn.addEventListener(
      "click",
      this.#handleNewBookmarkBtnClick
    );

    // wire copy event for button
    this.copyTableBtn.addEventListener("click", this.#handleCopyTableBtn);

    // wire event handler for create new session click
    this.newSessionButton.addEventListener(
      "click",
      this.#handleNewSessionButtonClick
    );
    // wire event listener for search box
    this.searchSessions.addEventListener(
      "input",
      this.#handleSearchSessionOnChange
    );

    // wire event listener for search input field to clear any text
    this.clearSearchIcon.addEventListener("click", () => {
      this.searchSessions.value = "";
      this.#setClearSearchBoxIconVisiblity(false);
      this.#filterSessionsByName("");
    });
  }

  /**
   * Triggered when the copy table button is clicked. It sends a msg to the content script to copy all bookmarks
   *
   * @param {Event} e - click event object
   */
  #handleCopyTableBtn = (e) => {
    sendMessageToActiveTab(
      {
        action: MSG.COPY_TABLE,
        payload: { sessionName: this.sessionName.innerText },
      },
      (response) => {
        if (response.status === MSG.SUCCESS) {
          const successModal = new ModalBuilder(
            ModalBuilder.TYPES.modal_type.WARNING,
            "Success!"
          )
            .addBodyText(
              "Bookmarks copied as a table format to your clipboard!",
              "alignCenter"
            )
            .addActionButton(
              ModalBuilder.TYPES.btn_type.DISMISS,
              "Okay",
              () => {
                successModal.remove();
              }
            )
            .build()
            .show();
        } else {
          const failedModal = new ModalBuilder(
            ModalBuilder.TYPES.modal_type.ALERT,
            "Failure!"
          )
            .addBodyText(response.payload, "alignCenter")
            .addActionButton(
              ModalBuilder.TYPES.btn_type.DISMISS,
              "Dismiss",
              () => {
                failedModal.remove();
              }
            )
            .build()
            .show();
        }
      }
    );
  };

  /**
   * Shows or hides the clear icon (X) in search input field
   *
   * @param {Boolean} show
   */
  #setClearSearchBoxIconVisiblity(show) {
    const { INLINE_BLOCK, NONE } = userInterfaceManager.DISPLAY;
    this.clearSearchIcon.style.display = show ? INLINE_BLOCK : NONE;
  }

  /**
   * Loops over all session wrapper items and hides that ones that dont'
   * contain the desired string.
   *
   * @param {String} match - takes a string to match session names against
   */
  #filterSessionsByName(match) {
    const { NONE, FLEX } = userInterfaceManager.DISPLAY;
    const allSessions = document.querySelectorAll(".sessionWrapper");
    allSessions.forEach((session) => {
      const currSessionName = session
        .querySelector(".sessionName")
        .innerText.toLowerCase();

      session.style.display =
        currSessionName.indexOf(match.toLowerCase()) === -1 ? NONE : FLEX;
    });
  }

  /**
   * Triggered when the new bookmark button is clicked. It sends a msg to the content script to get the current timestamp
   * then another msg to create the new bookmark
   *
   * @param {Event} e - click event object
   */
  #handleNewBookmarkBtnClick = (e) => {
    const { btn_type, modal_type } = ModalBuilder.TYPES;
    sendMessageToActiveTab(
      {
        action: MSG.GET_CURRENT_TIMESTAMP,
        payload: { pauseVideo: true },
      },
      (response) => {
        if (response.status === MSG.SUCCESS) {
          // grab the data from the content script msg
          const { timestamp, bookmark } = response.payload;
          const formModal = new ModalBuilder(
            ModalBuilder.TYPES.modal_type.FORM,
            `Create a bookmark at ${timestamp}`
          )
            .addInputField(
              "Title:",
              "title",
              false,
              "Enter the title:",
              18,
              bookmark?.title || ""
            )
            .addInputField(
              "Bookmark text:",
              "bookmarkText",
              true,
              "Type the description:",
              200,
              bookmark?.text || ""
            )
            .addActionButton(
              ModalBuilder.TYPES.btn_type.CANCEL,
              "Cancel",
              () => {
                formModal.remove();
              }
            )
            .addActionButton(
              ModalBuilder.TYPES.btn_type.SUBMIT,
              "Create",
              () => {
                const { title, bookmarkText } = formModal.getFormValues();
                const newBookmark = new Bookmark(
                  title,
                  bookmarkText,
                  timestamp
                );
                sendMessageToActiveTab(
                  {
                    action: MSG.ADD_BOOKMARK,
                    payload: { bookmark: newBookmark },
                  },
                  (response) => {
                    formModal.remove();
                    if (response.status === MSG.SUCCESS) {
                      // if there's no bookmark, remove the empty page element
                      if (
                        this.videoBookmarksPageContent.querySelectorAll(
                          ".bookmark"
                        ).length === 0
                      ) {
                        this.videoBookmarksPageContent.innerHTML = "";
                      }
                      this.#appendBookmarkItem(newBookmark);
                    } else {
                      alert("failed to add bookmark in userInterface");
                    }
                  }
                );
              }
            )
            .build()
            .show();
        } else {
          // render failed modal
          const failedModal = new ModalBuilder(modal_type.ALERT, "Failed!")
            .addBodyText(response.payload, "alignCenter")
            .addActionButton(btn_type.DISMISS, "Dismiss", () => {
              failedModal.remove();
            })
            .build()
            .show();
        }
      }
    );
  };

  /**
   * Messages the content script to close the sidebarIframe
   *
   * @param {Event} e - click event object
   */
  #handleCloseIconClick(e) {
    sendMessageToActiveTab({ action: MSG.TOGGLE }, (response) => {
      if (response.status === MSG.SUCCESS) {
      }
    });
  }

  /**
   * Triggered when the back arrow icon is clicked. It renders the nav page
   *
   * @param {Event} e - click event object
   */
  #handleBackArrowIconClick = (e) => {
    // ? TODO: send msg to content script to remove reference to the video object
    this.renderNavPage();
  };

  /**
   * Makes the cursor a spinning icon on all elements
   *
   * @param {Boolean} isLoading - whether the cursor on the page should be a loading icon
   */
  setDocumentLoadingState(isLoading) {
    document.body.style.cursor = isLoading ? "wait" : "";
  }

  /**
   * triggered when the createNewSession Button is clicked. It messages the content script to create a new session,
   * and renders the video page, or an alert msg depending on the response from the content script
   *
   * @param {Event} e - click event object
   */
  #handleNewSessionButtonClick = (e) => {
    const { btn_type, modal_type } = ModalBuilder.TYPES;
    const newSessionModal = new ModalBuilder(modal_type.FORM, "New session")
      .addActionButton(btn_type.CANCEL, "Cancel", () => {
        newSessionModal.remove();
      })
      .addActionButton(btn_type.SUBMIT, "Create", () => {
        const { sessionNameText } = newSessionModal.getFormValues();
        this.setDocumentLoadingState(true);
        sendMessageToActiveTab(
          { action: MSG.CREATE_NEW_SESSION, payload: sessionNameText },
          (response) => {
            newSessionModal.remove();
            this.setDocumentLoadingState(false);
            if (response.status === MSG.SUCCESS) {
              this.renderVideoPage(sessionNameText);
            } else {
              const modal = new ModalBuilder(modal_type.ALERT, "Failed!")
                .addBodyText(response.payload)
                .addActionButton(btn_type.DISMISS, "Dismiss", () => {
                  modal.remove();
                })
                .build()
                .show();
            }
          }
        );
      })
      .addInputField(
        "Enter the session name:",
        "sessionNameText",
        false,
        "Session name",
        15
      )
      .build()
      .show();
  };

  /**
   * triggered when a session items is clicked from the nav page. It render the video page with the clicked session item
   *
   * @param {Event} e - click event object
   */
  #handleSessionItemClick = (e) => {
    // add a spinner
    this.#addSpinnerToSessionItem(e.target);
    const { innerText } = e.target;
    sendMessageToActiveTab(
      { action: MSG.SELECT_SESSION, payload: innerText },
      (response) => {
        // remove the spinner when a response is recieved from the content script
        this.#removeSpinnerFromSessionItem(e.target);
        if (response.status === MSG.SUCCESS) {
          this.renderVideoPage(innerText);
        } else {
          const { btn_type, modal_type } = ModalBuilder.TYPES;
          const modal = new ModalBuilder(modal_type.ALERT, "Failed!")
            .addBodyText(response.payload, "alignCenter")
            .addActionButton(btn_type.DISMISS, "Dismiss", () => {
              modal.remove();
            })
            .build()
            .show();
        }
      }
    );
  };

  /**
   * Handles when the trash icon for a session item is clicked. It sends a msg
   * to the content script to remove the session from the all session names
   * array as well as under the session name key
   *
   * @param {Event} e - click event object
   */
  #handleSessionItemDeletion = (e) => {
    const iconGroupDiv = e.target.parentElement;
    const sessionWrapper = iconGroupDiv.parentElement;
    this.#addSpinnerToSessionItem(sessionWrapper);
    const sessionName = iconGroupDiv.getAttribute("sessionName");
    // render a modal to make sure the user is sure of deleting
    const { btn_type, modal_type } = ModalBuilder.TYPES;
    const areYouSureModal = new ModalBuilder(modal_type.WARNING, "Warning")
      .addBodyText(
        `Are you sure you want to delete ${sessionName} session?`,
        "alignCenter"
      )
      .setCloseIconClickHandler(() => {
        this.#removeSpinnerFromSessionItem(sessionWrapper);
        areYouSureModal.remove();
      })
      .addActionButton(btn_type.CANCEL, "No", () => {
        this.#removeSpinnerFromSessionItem(sessionWrapper);
        areYouSureModal.remove();
      })
      .addActionButton(btn_type.SUBMIT, "Yes", () => {
        sendMessageToActiveTab(
          { action: MSG.DELETE_SESSION, payload: sessionName },
          (response) => {
            this.#removeSpinnerFromSessionItem(sessionWrapper);
            areYouSureModal.remove();
            if (response.status === MSG.SUCCESS) {
              sessionWrapper.remove();
              if (
                this.mainNavPageContent.querySelectorAll(".sessionWrapper")
                  .length === 0
              ) {
                this.renderNavPage();
              }
            } else {
              // render a modal with the error
              const failedToDeleteModal = new ModalBuilder(
                modal_type.ALERT,
                "Failed!"
              )
                .addActionButton(btn_type.DISMISS, "Dismiss", () => {
                  failedToDeleteModal.remove();
                })
                .addBodyText(response.payload, "alignCenter")
                .build()
                .show();
            }
          }
        );
      })
      .build()
      .show();
  };

  /**
   * Updates the session item ui to allow the user to edit the name
   *
   * @param {Event} e - event object
   */
  #handleSessionItemEdition = (e) => {
    // TODO: allow one box to be edited at a time
    const iconGroupDiv = e.target.parentElement;
    // hide the session name span
    const currentSessionNameElem = iconGroupDiv.previousElementSibling;
    currentSessionNameElem.style.display = userInterfaceManager.DISPLAY.NONE;
    // create a text input field
    const textInputField = document.createElement("input");
    textInputField.setAttribute("type", "text");
    textInputField.classList.add("sessionItemEditTextInput");
    textInputField.value = currentSessionNameElem.innerText;
    // append the text box to the session wrapper
    const sessionWrapper = iconGroupDiv.parentElement;
    sessionWrapper.insertBefore(
      textInputField,
      sessionWrapper.firstElementChild
    );
    // toggle the edit icons
    this.#showEditIcon(iconGroupDiv, false);
  };

  /**
   * Triggered when the check icon is clicked after modifying a session name. It confirms the edit
   *
   * @param {Event} e - click event object
   * @returns
   */
  #handleSessionItemEditionConfirm = (e) => {
    const iconGroupDiv = e.target.parentElement;
    const sessionWrapper = iconGroupDiv.parentElement;
    const sessionName = sessionWrapper.querySelector(".sessionName");
    const textInput = sessionWrapper.querySelector(".sessionItemEditTextInput");
    const oldValue = sessionName.innerText;
    const newValue = textInput.value;
    // if the value provided is nothing, or the value hasn't changed,
    // go with the old value
    if (newValue === "" || newValue === oldValue) {
      this.#showEditIcon(iconGroupDiv, true);
      textInput.remove();
      sessionName.style.display = userInterfaceManager.DISPLAY.INLINE;
      return;
    }

    this.#addSpinnerToSessionItem(sessionWrapper);
    sendMessageToActiveTab(
      { action: MSG.EDIT_SESSION, payload: { oldValue, newValue } },
      (response) => {
        this.#removeSpinnerFromSessionItem(sessionWrapper);
        if (response.status === MSG.SUCCESS) {
          this.#showEditIcon(iconGroupDiv, true);
          textInput.remove();
          sessionName.innerText = newValue;
          iconGroupDiv.setAttribute("sessionName", newValue);
          sessionName.style.display = userInterfaceManager.DISPLAY.INLINE;
        } else {
          // render a modal with the error
          const { modal_type, btn_type } = ModalBuilder.TYPES;
          const failedToEditModal = new ModalBuilder(
            modal_type.ALERT,
            "Failed!"
          )
            .addActionButton(btn_type.DISMISS, "Dismiss", () => {
              failedToEditModal.remove();
            })
            .addBodyText(response.payload, "alignCenter")
            .build()
            .show();
        }
      }
    );
  };

  /**
   * Sets the visiblity of the edit icon, and confirm edit icon for each session item
   *
   * @param {HTML Element} sessionItemIcons - div containing all the icons for a session item
   * @param {Boolean} show - true if the edit icon should be shown, false otherwise
   */
  #showEditIcon = (sessionItemIcons, show) => {
    const sessionConfirmIcon = sessionItemIcons.querySelector(
      ".sessionConfirmIcon"
    );
    const sessionEditIcon = sessionItemIcons.querySelector(".sessionEditIcon");
    const { INLINE_BLOCK, NONE } = userInterfaceManager.DISPLAY;
    if (show) {
      sessionEditIcon.style.display = INLINE_BLOCK;
      sessionConfirmIcon.style.display = NONE;
    } else {
      sessionEditIcon.style.display = NONE;
      sessionConfirmIcon.style.display = INLINE_BLOCK;
    }
  };

  /**
   * sets the the session item into a loading state. Adds the spinner // TODO: prevent other clicks
   *
   * @param {HTML Element} element - a session item HTML element where the spinner will be added
   */
  #addSpinnerToSessionItem(element) {
    const spinner = document.createElement("img");
    spinner.setAttribute("src", "../../images/icons/spinner_sm.gif");
    spinner.setAttribute("alt", "spinner icon");
    spinner.classList.add("sessionItemSpinner");
    element.appendChild(spinner);
  }

  /**
   * removes the loading state from the session item
   *
   * @param {HTML Element} element - a session item HTML element where the spinner will be removed
   */
  #removeSpinnerFromSessionItem(element) {
    element.querySelector(".sessionItemSpinner").remove();
  }

  /**
   * searches chrome.storage for the key ALL_SESSIONS
   *
   * @returns {Promise} - resolved with a sessions array from chrome.storage, or rejected
   */
  #getAllSessionNamesFromChromeStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(userInterfaceManager.ALL_SESSIONS, (response) => {
        // if there is a session in storage, then return it
        if (Object.keys(response).length > 0) {
          const sessions = response[userInterfaceManager.ALL_SESSIONS];
          sessions.length ? resolve({ sessions }) : reject();
        } else {
          reject();
        }
      });
    });
  }

  /**
   * Searches chrome.storage for the session name, and returns the bookmarks
   *
   * @param {String} sessionName - the session name key to be searched for in chrome.storage
   * @returns {Promise} - resolves a promise with a bookmarks object if found in chrome.storage
   */
  #getSessionFromChromeStorage(sessionName) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(sessionName, (response) => {
        if (Object.keys(response).length > 0) {
          const { bookmarks } = response[sessionName];
          Object.keys(bookmarks).length
            ? resolve({ bookmarks })
            : reject("No bookmarks");
        } else {
          reject("Can't find the session name in storage!");
        }
      });
    });
  }

  /**
   * shows the loading page and hides the nav content, or the exact opposite
   *
   * @param {Boolean} isLoadingNav - whether the nav page is loading or not
   */
  #setNavPageIsLoading(isLoadingNav) {
    const { NONE, FLEX, BLOCK } = userInterfaceManager.DISPLAY;
    this.mainNavPageContentLoading.style.display = isLoadingNav ? FLEX : NONE;
    // hide or show the content
    this.mainNavPageContent.style.display = isLoadingNav ? NONE : BLOCK;
  }

  /**
   * shows the loading page and hides the video content, or the exact opposite
   *
   * @param {Boolean} isLoadingVideo - whether the video page is loading or not
   */
  #setVideoPageIsLoading(isLoadingVideo) {
    const { NONE, FLEX, BLOCK } = userInterfaceManager.DISPLAY;
    this.videoBookmarksPageContentLoading.style.display = isLoadingVideo
      ? FLEX
      : NONE;
    // hide or show the content
    this.videoBookmarksPageContent.style.display = isLoadingVideo
      ? NONE
      : BLOCK;
  }

  /**
   * shows or hides the back arrow button icon
   *
   * @param {Boolean} isShown - true for shown, false for hidden
   */
  #setBackArrowIconVisibility(isShown) {
    this.backArrowIcon.style.display = isShown ? "block" : "none";
  }

  #handleBookmarkTimestampClick = (e) => {
    const timestamp = e.target.innerText;
    sendMessageToActiveTab(
      { action: MSG.JUMP_TO_TIMESTAMP, payload: timestamp },
      (response) => {
        if (response.status !== MSG.SUCCESS) {
          const failedModal = new ModalBuilder(modal_type.ALERT, "Failed")
            .addBodyText(response.payload, "alignCenter")
            .addActionButton(btn_type.DISMISS, "Dismiss", () => {
              failedModal.remove();
            })
            .build()
            .show();
        }
      }
    );
  };

  #handleBookmarkTrashIconClick = (e) => {
    const timestamp = e.target.parentElement.getAttribute("timestamp");
    const { btn_type, modal_type } = ModalBuilder.TYPES;
    const areYouSureModal = new ModalBuilder(modal_type.WARNING, "Warning")
      .addBodyText(
        `Are you sure you'd like to delete bookmark at ${timestamp}?`
      )
      .addActionButton(btn_type.CANCEL, "No", () => {
        areYouSureModal.remove();
      })
      .addActionButton(btn_type.SUBMIT, "Yes", () => {
        this.setDocumentLoadingState(true);
        sendMessageToActiveTab(
          { action: MSG.DELETE_BOOKMARK, payload: timestamp },
          (response) => {
            this.setDocumentLoadingState(false);
            areYouSureModal.remove();

            if (response.status === MSG.SUCCESS) {
              e.target.parentElement.parentElement.parentElement.remove();
              // if the bookmark deleted is the last one
              if (
                this.videoBookmarksPageContent.querySelectorAll(".bookmark")
                  .length === 0
              ) {
                this.#renderVideoSessionUI(null);
              }
            } else {
              const failedModal = new ModalBuilder(modal_type.ALERT, "Failed")
                .addBodyText(response.payload, "alignCenter")
                .addActionButton(btn_type.DISMISS, "Dismiss", () => {
                  failedModal.remove();
                })
                .build()
                .show();
            }
          }
        );
      })
      .build()
      .show();
  };

  #handleBookmarkNestIconClick = (e) => {
    const timestamp = e.target.parentElement.getAttribute("timestamp");
    sendMessageToActiveTab(
      { action: MSG.TOGGLE_BOOKMARK_NESTING, payload: timestamp },
      (response) => {
        if (response.status === MSG.SUCCESS) {
          this.#toggleBookmarkNesting(
            e.target.parentElement.parentElement.parentElement
          );
        } else {
          const failedModal = new ModalBuilder(modal_type.ALERT, "Failed")
            .addBodyText(response.payload, "alignCenter")
            .addActionButton(btn_type.DISMISS, "Dismiss", () => {
              failedModal.remove();
            })
            .build()
            .show();
        }
      }
    );
  };

  /**
   * Triggered when the edit icon is clicked for each bookmark item. It renders a prepopulated
   * modal from chrome.storage
   *
   * @param {Event} e - click event object
   */
  #handleBookmarkEditIconClick = (e) => {
    // TODO: ask content script to pause video
    const timestamp = e.target.parentElement.getAttribute("timestamp");
    sendMessageToActiveTab(
      { action: MSG.GET_BOOKMARK_AT_TIMESTAMP, payload: timestamp },
      (response) => {
        if (response.status === MSG.SUCCESS) {
          const { btn_type, modal_type } = ModalBuilder.TYPES;
          const bookmark = response.payload;

          const formModal = new ModalBuilder(
            modal_type.FORM,
            `Edit bookmark at ${timestamp}`
          )
            .addInputField(
              "Title:",
              "title",
              false,
              "Enter the title:",
              18,
              bookmark?.title || ""
            )
            .addInputField(
              "Bookmark text:",
              "bookmarkText",
              true,
              "Type the description:",
              200,
              bookmark?.text || ""
            )
            .addActionButton(btn_type.CANCEL, "Cancel", () => {
              formModal.remove();
              // TODO: play video back
            })
            .addActionButton(btn_type.SUBMIT, "Confirm", () => {
              const { title, bookmarkText } = formModal.getFormValues();
              const newBookmark = new Bookmark(title, bookmarkText, timestamp);
              sendMessageToActiveTab(
                {
                  action: MSG.ADD_BOOKMARK,
                  payload: { bookmark: newBookmark },
                },
                (response) => {
                  formModal.remove();
                  if (response.status === MSG.SUCCESS) {
                    this.#updateBookmarkUI(
                      e.target.parentElement.parentElement.parentElement,
                      newBookmark
                    );
                  } else {
                    alert("failed to add bookmark in userInterface");
                  }
                }
              );
            })
            .build()
            .show();
        } else {
          // render failed modal
          const failedModal = new ModalBuilder(modal_type.ALERT, "Failed!")
            .addBodyText(response.payload, "alignCenter")
            .addActionButton(btn_type.DISMISS, "Dismiss", () => {
              failedModal.remove();
            })
            .build()
            .show();
        }
      }
    );
  };

  /**
   * Takes an HTML bookmark element and modifies it's contents
   *
   * @param {HTML Element} bookmarkElem - the bookmark element to be modified
   * @param {Object} bookmark - contains bookmark information
   */
  #updateBookmarkUI(bookmarkElem, bookmark) {
    const titleElem = bookmarkElem.querySelector(".title");
    const bodyTextElem = bookmarkElem.querySelector(".bookmarkBodyText");
    titleElem.innerText = bookmark.title;
    bodyTextElem.innerText = bookmark.text;
  }

  /**
   * toggles the CSS "nested" class, and changes the src of the nest icon
   *
   * @param {HTML Element} bookmarkElem - bookmark element to be nested
   */
  #toggleBookmarkNesting(bookmarkElem) {
    bookmarkElem.classList.toggle("nested");
    const BASE_SRC = "../images/icons/";
    const NEST_ICON = "list-nested.svg";
    const UNNEST_ICON = "list.svg";

    const nestingIcon = bookmarkElem.querySelector(".nestIcon");
    if (bookmarkElem.classList.contains("nested")) {
      nestingIcon.setAttribute("src", BASE_SRC + UNNEST_ICON);
    } else {
      nestingIcon.setAttribute("src", BASE_SRC + NEST_ICON);
    }
  }
}
