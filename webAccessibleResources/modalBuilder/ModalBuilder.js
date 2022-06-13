class ModalBuilder {
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
  }

  addActionButton(type, text, clickHandler) {
    const newButton =
      this.modalButtonTemplate.content.firstElementChild.cloneNode(true);
    newButton.innerText = text;
    newButton.classList.add(type);
    newButton.addEventListener("click", clickHandler);
    this.buttons.push(newButton);
    return this;
  }

  addInputField(label, id, isTextArea, placeholder = "") {
    // grab the template
    const textInputFieldTemplate = document.querySelector(
      `${isTextArea ? ".textAreaField" : ".textInputField"}`
    );
    // clone the template
    const newInput =
      textInputFieldTemplate.content.firstElementChild.cloneNode(true);
    // set the content for the label
    const labelElem = newInput.firstElementChild;
    labelElem.innerText = label;
    labelElem.setAttribute("for", id);
    // set the content for the input field
    const textInputElem = labelElem.nextElementSibling;
    textInputElem.setAttribute("placeholder", placeholder);
    textInputElem.setAttribute("id", id);
    // push it onto the array
    this.bodyElements.push(newInput);
    return this;
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
