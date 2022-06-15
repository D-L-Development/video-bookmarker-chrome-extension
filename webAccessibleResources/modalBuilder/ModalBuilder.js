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
  constructor(type, title, preventEmptyFieldSubmission = false) {
    this.type = type;
    this.title = title;
    this.modalWrapperTemplate = document.querySelector(".modalWrapper");
    this.modalButtonTemplate = document.querySelector(".modalButtons");
    this.modal = null;
    this.buttons = [];
    this.bodyElements = [];
    // members to keep track of form submission disabling
    this.preventEmptyFieldSubmission = preventEmptyFieldSubmission;
    this.preventSubmitConditions = {};
    this.submitButtonDisabled = preventEmptyFieldSubmission;
  }

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

  addInputField(
    label,
    id,
    isTextArea,
    placeholder = "",
    maxCharCount = Infinity,
    initialValue = ""
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
    // if a max char is specified, then set a condition in the array
    if (maxCharCount !== Infinity) {
      this.preventSubmitConditions[id] = true;
    }
    // wire event on change event
    textInputElem.addEventListener("input", (e) => {
      const userInputLength = e.target.value.length;

      // change css and add text label to warn that there are too many chars
      if (userInputLength > maxCharCount) {
        secondaryText.innerText = `Exceeds ${maxCharCount} characters!`;
        textInputElem.classList.add("error");
        this.preventSubmitConditions[id] = true;
      } else {
        secondaryText.innerText = "";
        textInputElem.classList.remove("error");
        // add prevent condition if the text length is 0
        this.preventSubmitConditions[id] = userInputLength === 0;
      }

      this.#updateSubmissonState();
    });

    // push it onto the array
    this.bodyElements.push(newInput);
    return this;
  }

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

  setCloseIconClickHandler(callback) {
    this.closeIconHandler = callback;
    return this;
  }

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
      closeIcon.addEventListener("click", this.closeIcon);
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

  show() {
    this.modal.classList.remove("hide");
    return this;
  }
  hide() {
    this.modal.classList.add("hide");
    return this;
  }
  remove() {
    this.modal.remove();
  }
}
