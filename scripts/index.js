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

// 2. Datos iniciales de las tarjetas
const initialCards = [
  // ... Tus 6 objetos de tarjetas aquí (e.g., { name: "Yosemite Valley", link: "..." })
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/images/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/images/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/images/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/images/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/images/vanoise.jpg"
  },
  {
    name: "Lago Di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/images/lago.jpg"
  }
];

// --- Elementos del DOM ---
const cardsContainer = document.querySelector('.cards__list');
const templateSelector = '#card-template'; // Selector de la plantilla de la tarjeta

// Modales
const modalEditProfile = document.querySelector('#modal-edit-profile');
const modalAddCard = document.querySelector('#modal-add-card');
const modalImageView = document.querySelector('#modal-image-view');

// Formularios
const formEditProfile = modalEditProfile.querySelector('.modal__form');
const formAddCard = modalAddCard.querySelector('.modal__form');

// Botones
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

// Campos del formulario de perfil
const nameInput = document.querySelector('#profile-name-input');
const jobInput = document.querySelector('#profile-job-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

// Elementos de la modal de imagen
const imageViewImage = modalImageView.querySelector('.image-view__image');
const imageViewCaption = modalImageView.querySelector('.image-view__caption');