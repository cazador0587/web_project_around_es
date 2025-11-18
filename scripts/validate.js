/******************************** VALIDACIÓN DE FORMULARIOS - MÓDULO ************************************************/

// Muestra el mensaje de error para un input específico.
function showInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

  // Añade la clase de estilo para indicar el error visualmente en el input
  inputElement.classList.add("popup__input_type_error"); 
  // Muestra el mensaje de error nativo de HTML5 (minlength, required, etc.)
  if (errorElement) {
    errorElement.textContent = inputElement.validationMessage;
  }
}

// Oculta el mensaje de error.
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

  // Elimina la clase de error del input
  inputElement.classList.remove("popup__input_type_error"); 
  // Borra el mensaje de texto del error
  if (errorElement) {
    errorElement.textContent = "";
  }
}

// Verifica la validez de un input y muestra/oculta el error.
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Devuelve 'true' si al menos un input en la lista es inválido.
function hasInvalidInput(inputList) {
  // Utiliza Array.some() para verificar si algún elemento no cumple la validez
  return inputList.some((input) => !input.validity.valid);
}

// Activa o desactiva el botón de envío según la validez del formulario.
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    // Si hay inputs inválidos, desactiva el botón
    buttonElement.classList.add("popup__save-button_disabled");
    buttonElement.disabled = true;
  } else {
    // Si todos son válidos, activa el botón
    buttonElement.classList.remove("popup__save-button_disabled");
    buttonElement.disabled = false;
  }
}

// Asigna listeners de eventos 'input' a cada campo del formulario.
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  // Establece el estado inicial del botón al cargar (necesario si hay inputs con datos)
  toggleButtonState(inputList, buttonElement); 

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// 🔑 Función principal: Activa la validación en todos los formularios.
function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    // Deshabilita la validación nativa del navegador para usar la personalizada
    formElement.setAttribute("novalidate", true); 
    setEventListeners(formElement);
  });
}

// 🧼 Función de limpieza: Restablece el estado de un formulario (ocultar errores, desactivar botón).
function resetValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  // Limpia el estado visual de error de todos los inputs
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  
  // Desactiva el botón de envío, ya que los campos suelen estar vacíos o pre-llenados (sin interactuar)
  toggleButtonState(inputList, buttonElement);
}

// Exportamos las funciones que serán utilizadas en index.js
export { enableValidation, resetValidation };