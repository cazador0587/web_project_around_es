// FormValidator.js

export default class FormValidator {
  // 1. Constructor: recibe la configuración de selectores y el elemento del formulario
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  // 2. Método privado para mostrar el mensaje de error
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(
      `.${inputElement.name}-error`
    );

    if (!errorElement) return;

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // 3. Método privado para ocultar el mensaje de error
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-error`
    );
    if (errorElement) {
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
      errorElement.textContent = "";
    }
  }

  // 4. Método privado para verificar la validez del campo (Check Validity)
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // 5. Método privado para comprobar si hay campos no válidos
  _hasInvalidInput() {
    // El método `some()` devolverá `true` si al menos un elemento no es válido
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // 6. Método privado para cambiar el estado del botón Submit (Toggle Button State)
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // 7. Método público para activar la validación del formulario (Set Event Listeners)
  setEventListeners() {
    // Inicia el estado del botón al cargar (útil si hay campos ya llenos)
    this._toggleButtonState();

    // Agrega el controlador de eventos `input` a cada campo
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(); // Cambia el estado del botón con cada entrada
      });
    });
  }

  // Método para restablecer la validación al abrir/cerrar la modal
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    // Deshabilita el botón (necesario si la modal se cierra con el botón Submit activo)
    this._toggleButtonState();
  }
}