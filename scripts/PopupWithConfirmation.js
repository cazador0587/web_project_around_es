import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._form = this._popup.querySelector(".popup__form");
    this._cancelButton = this._popup.querySelector(
      ".popup__button_type_cancel"
    );
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });

    if (this._cancelButton) {
      this._cancelButton.addEventListener("click", () => {
        this.close();
      });
    }
  }
}
