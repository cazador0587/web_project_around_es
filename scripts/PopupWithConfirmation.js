import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._form = this._popup.querySelector(".popup__form");
    this._cancelButton = this._popup.querySelector(
      ".popup__button_type_cancel"
    );
    this._submitButton = this._form.querySelector(
      '.popup__button[type="submit"]'
    );
    this._submitAction = null;
    this._defaultText = this._submitButton.textContent;
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  renderLoading(isLoading) {
    this._submitButton.textContent = isLoading
      ? "Eliminando..."
      : this._defaultText;

    this._submitButton.disabled = isLoading;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._submitAction) {
        this.renderLoading(true);
        this._submitAction();
      }
      this._handleSubmit();
    });

    if (this._cancelButton) {
      this._cancelButton.addEventListener("click", () => {
        this.close();
      });
    }
  }
  close() {
    super.close();
    this.renderLoading(false);
  }
}
