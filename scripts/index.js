// index.js

// Importa las clases y utilidades
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal, setModalCloseListeners } from "./utils.js";

// --- Constantes y Configuración ---

// 1. Configuración de validación (debe coincidir con tus clases CSS)
const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
