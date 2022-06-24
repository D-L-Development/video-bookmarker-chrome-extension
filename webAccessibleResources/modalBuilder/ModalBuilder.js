/**
 * Class implements the builder pattern to create ui modals
 * Each class instance contains a modal HTML element, with the ability to
 * embed more elements within. There are 3 sections within the modal:
 * the header, which contains the title and close icon (the behavior of the close icon can be overridden)
 * the body, which contains text and/or input elements
 * the action buttons section, which allows for button addition
 */
class ModalBuilder {
  // possible types to be used in the class for styles and logic handling
  static TYPES = {
    btn_type: {
      DISMISS: "dismiss",
      CANCEL: "cancel",
      SUBMIT: "submit",
    },
    modal_type: {
      ALERT: "alert",
      WARNING: "warning",
      FORM: "form",
    },
  };
  constructor(type, title) {
    this.type = type;
    this.title = title;
    this.modalWrapperTemplate = document.querySelector(".modalWrapper");
    this.modalButtonTemplate = document.querySelector(".modalButtons");
    this.modal = null;
    this.buttons = [];
    this.bodyElements = [];
    // members to keep track of form submission disabling
    this.preventSubmitConditions = {};
    this.submitButtonDisabled = false;
  }

  /**
   * Adds an HTML button to the buttons array, in which it will be
   * appended to the modal when the build() method is invoked
   *
   * @param {String} type - a string from one of the options in the static member TYPES
   * @param {String} text - the text within the button added
   * @param {Function} clickHandler - the click callback invoked when the user clicks the button
   * @returns {ModalBuilder} - returns this
   */
  addActionButton(type, text, clickHandler) {
    // clone the btn template
    const newButton =
      this.modalButtonTemplate.content.firstElementChild.cloneNode(true);
    // set content and attributes
    newButton.innerText = text;
    newButton.classList.add(type);

    // check if btn is type submit, if so prevent the modal from being sub
    const isSubmitBtn = type === ModalBuilder.TYPES.btn_type.SUBMIT;

    newButton.addEventListener("click", () => {
      if (isSubmitBtn && this.submitButtonDisabled) {
        return;
      }
      clickHandler();
    });
    this.buttons.push(newButton);
    return this;
  }

  /**
   * Adds an HTML input text element to the body array. The element will be appended
   * to the modal when the build() method is invoked
   *
   * @param {String} label - the text label for the text input
   * @param {String} id - the id for text input so the value of the input can be retreived later
   * @param {Boolean} isTextArea - true if the input is text area, false for a text input
   * @param {String} placeholder - placeholder within the input
   * @param {Number} maxCharCount - the maximum amount of characters allowed in the input
   * @param {String} initialValue - used to prepopulate the input field
   * @param {Boolean} required - if true, the modal can't be submitted when this field is empty
   * @returns {ModalBuilder} - this
   */
  addInputField(
    label,
    id,
    isTextArea,
    placeholder = "",
    maxCharCount = Infinity,
    initialValue = "",
    required = true
  ) {
    // grab the template
    const textInputFieldTemplate = document.querySelector(
      `${isTextArea ? ".textAreaField" : ".textInputField"}`
    );
    // clone the template
    const newInput =
      textInputFieldTemplate.content.firstElementChild.cloneNode(true);
    // give it an attribute for getting form values
    newInput.setAttribute("name", id);
    // set the content for the label
    const labelElem = newInput.firstElementChild;
    labelElem.innerText = label;
    labelElem.setAttribute("for", id);
    // set the content for the input field
    const textInputElem = labelElem.nextElementSibling;
    textInputElem.setAttribute("placeholder", placeholder);
    textInputElem.setAttribute("id", id);
    textInputElem.value = initialValue;
    // set the content for secondary text
    const secondaryText = textInputElem.nextElementSibling;
    // if the initial string length is longer than the specified mas char count,
    //  or the field is empty and required, then set a condition in the array to prevent submission
    if (
      initialValue.length > maxCharCount ||
      (initialValue.length === 0 && required)
    ) {
      this.preventSubmitConditions[id] = true;
    } else if (maxCharCount !== Infinity || required) {
      this.preventSubmitConditions[id] = false;
    }
    // wire event on change event
    textInputElem.addEventListener("input", (e) => {
      const userInputLength = e.target.value.length;

      // change css and add text label to warn that there are too many chars
      if (userInputLength > maxCharCount) {
        secondaryText.innerText = `Exceeds ${maxCharCount} characters!`;
        textInputElem.classList.add("error");
        this.preventSubmitConditions[id] = true;
      } else if (userInputLength === 0 && required) {
        secondaryText.innerText = "Missing field";
        textInputElem.classList.add("error");
        this.preventSubmitConditions[id] = true;
      } else {
        secondaryText.innerText = "";
        textInputElem.classList.remove("error");
        this.preventSubmitConditions[id] = false;
      }

      this.#updateSubmissonState();
    });

    // push it onto the array
    this.bodyElements.push(newInput);
    return this;
  }

  /**
   * Loops over preventSubmitConditions array and check if
   * any conditions are true, if so, it will set a flag to
   * disable the submission of the modal
   */
  #updateSubmissonState() {
    this.submitButtonDisabled = false;
    if (!Object.keys(this.preventSubmitConditions).length) {
      return;
    }
    for (const key in this.preventSubmitConditions) {
      if (this.preventSubmitConditions[key]) {
        this.submitButtonDisabled = true;
        break;
      }
    }

    this.#updateSubmissionButton();
  }

  /**
   * Checks if there's a button of type submit, and disables
   * it if necessary. It toggles a css class on the button
   */
  #updateSubmissionButton() {
    // disable the submission button in css
    const submissionBtn = document.querySelector(
      `.${ModalBuilder.TYPES.btn_type.SUBMIT}`
    );
    if (submissionBtn) {
      if (this.submitButtonDisabled) {
        submissionBtn.classList.add("btnDisabled");
      } else {
        submissionBtn.classList.remove("btnDisabled");
      }
    }
  }

  /**
   * Loops over the body elements and finds all the text inputs
   * and returns an object representing the data
   *
   * @returns {Object} - the name attibute for the input as key, and the value is the text input value
   */
  getFormValues() {
    const data = {};
    for (const element of this.bodyElements) {
      const name = element.getAttribute("name");
      if (name) {
        const inputField = element.querySelector(".textField");
        if (inputField) {
          data[name] = inputField.value;
        }
      }
    }
    return data;
  }

  /**
   * Appends an HTML element with text to the body array
   * it gets added to the modal when the build() method is invoked
   *
   * // TODO: maybe pass an array of css classes, and add types to the class
   * @param {String} text - content of the body element added
   * @param {String} css_class - css class to be added to the element
   * @returns {ModalBuilder} - this
   */
  addBodyText(text, css_class = "") {
    const bodyElem = document
      .querySelector(".bodyTextTemplate")
      .content.firstElementChild.cloneNode("true");
    bodyElem.innerText = text;
    if (css_class) {
      bodyElem.classList.add(css_class);
    }

    this.bodyElements.push(bodyElem);
    return this;
  }

  /**
   * Overrides the functionality of the close icon
   *
   * @param {Function} callback - function to be invoked when the close icon is clicked
   * @returns {ModalBuilder} - this
   */
  setCloseIconClickHandler(callback) {
    this.closeIconHandler = callback;
    return this;
  }

  /**
   * Loops over all body elements and focuses the cursor on the first
   * input field
   *
   * @returns
   */
  #focusOnFirstInput() {
    for (let bodyItem of this.bodyElements) {
      const textInputElem = bodyItem.querySelector(".textField");
      if (textInputElem) {
        textInputElem.focus();
        return;
      }
    }
  }

  /**
   * Must be invoked after all required memebers are instantiated. It loops through
   * all buttons and body elements and appends them to the modal. This will now show
   * the modal, and only gets it ready to be rendered
   *
   * @returns {ModalBuilder} - this
   */
  build() {
    this.modal =
      this.modalWrapperTemplate.content.firstElementChild.cloneNode(true);
    // hide modal by default
    this.hide();
    // color the header and set the type
    this.modal.querySelector(".modalHeader").classList.add(this.type);
    // set the title
    this.modal.querySelector(".modalTitle").innerText = this.title;
    // wire event listener to close icon
    const closeIcon = this.modal.querySelector(".modalCloseIcon");
    if (!this.closeIconHandler) {
      closeIcon.addEventListener("click", this.remove.bind(this));
    } else {
      closeIcon.addEventListener("click", this.closeIconHandler);
    }
    // set body content
    const modalBody = this.modal.querySelector(".modalBody");
    for (let bodyItem of this.bodyElements) {
      modalBody.appendChild(bodyItem);
    }
    // set buttons
    const modalButtons = this.modal.querySelector(".actionButtons");
    for (let button of this.buttons) {
      modalButtons.appendChild(button);
    }
    // add modal to document
    document.body.appendChild(this.modal);

    // update the submission button state
    this.#updateSubmissonState();

    return this;
  }

  /**
   * Shows the modal by changing it's display property
   *
   * @returns {ModalBuilder} - this
   */
  show() {
    this.modal.classList.remove("hide");
    this.#focusOnFirstInput();
    return this;
  }

  /**
   * Hides the modal by changing it's display property
   *
   * @returns {ModalBuilder} - this
   */
  hide() {
    this.modal.classList.add("hide");
    return this;
  }

  /**
   * Removes the modal HTML element from the DOM
   */
  remove() {
    this.modal.remove();
  }
}
