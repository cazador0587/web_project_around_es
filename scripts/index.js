// index.js

// Importa las clases y utilidades
import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { openModal, closeModal, setModalCloseListeners } from "./util.js";

// index.js (Línea 7)
document.addEventListener("DOMContentLoaded", () => {
// --- Constantes y Configuración ---

// 1. Configuración de validación (debe coincidir con tus clases CSS)
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// 2. Datos iniciales de las tarjetas
const initialCards = [
  // ... Tus 6 objetos de tarjetas aquí (e.g., { name: "Yosemite Valley", link: "..." })
  {
    name: "Valle de Yosemite",
    link: "./images/valle-yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "./images/lago-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "./images/montaña-calva.jpg",
  },
  {
    name: "Latemar",
    link: "./images/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "./images/parque-vanoise.jpg",
  },
  {
    name: "Lago Di Braies",
    link: "./images/lago-braies.jpg",
  },
];

// --- Elementos del DOM ---
const cardsContainer = document.querySelector('.cards__list');
const templateSelector = '#card-template'; // Selector de la plantilla de la tarjeta

// Modales
const modalEditProfile = document.querySelector('#edit-popup');
const modalAddCard = document.querySelector('#new-card-popup');
const modalImageView = document.querySelector('#image-popup');

// Formularios
const formEditProfile = modalEditProfile.querySelector('.popup__form');
const formAddCard = modalAddCard.querySelector('.popup__form');

// Botones
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

// Campos del formulario de perfil
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector('.profile__description');

// Elementos de la modal de imagen
const imageViewImage = modalImageView.querySelector('.popup__image');
const imageViewCaption = modalImageView.querySelector(".popup__caption");

// --- Funciones de Lógica de la Tarjeta ---

// Función que crea e inserta una tarjeta
function createCard(data) {
  const card = new Card(data, templateSelector, handleImageClick);
  return card.generateCard();
}

// Handler para el clic en la imagen (pasa a la clase Card)
function handleImageClick(name, link) {
  imageViewImage.src = link;
  imageViewImage.alt = name;
  imageViewCaption.textContent = name;
  openModal(modalImageView);
}

// --- Inicialización de la Lógica de Validación ---

// Instancia de FormValidator para el formulario de Perfil
const profileValidator = new FormValidator(validationConfig, formEditProfile);
profileValidator.setEventListeners();

// Instancia de FormValidator para el formulario de Nueva Tarjeta
const newCardValidator = new FormValidator(validationConfig, formAddCard);
newCardValidator.setEventListeners();

// --- Controladores de Eventos del Proyecto ---

// 1. Manejo de la Modal de Edición de Perfil
buttonEditProfile.addEventListener('click', () => {
  // Llenar inputs con datos actuales antes de abrir
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  // Asegurar que la validación se reinicia (oculta errores y habilita/deshabilita el botón)
  profileValidator.resetValidation(); 

  openModal(modalEditProfile);
});

formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(modalEditProfile);
});

// 2. Manejo de la Modal de Añadir Tarjeta
buttonAddCard.addEventListener('click', () => {
  formAddCard.reset(); // Limpia los inputs

  // Reinicia la validación (oculta errores y deshabilita el botón)
  newCardValidator.resetValidation();

  openModal(modalAddCard);
});

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  
  const cardNameInput = formAddCard.querySelector(
    ".popup__input_type_card-name"
  );
  const cardLinkInput = formAddCard.querySelector(".popup__input_type_url");

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  const newCardElement = createCard(newCardData);
  cardsContainer.prepend(newCardElement); // Añade la nueva tarjeta al principio
  
  closeModal(modalAddCard);
  formAddCard.reset(); // Reinicia el formulario
});

// 3. Cierre de Modales Universal
// Configura los listeners de clic de overlay y botón de cerrar para todas las modales
setModalCloseListeners(modalEditProfile);
setModalCloseListeners(modalAddCard);
setModalCloseListeners(modalImageView);


// --- Renderizado Inicial de Tarjetas ---
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardsContainer.append(cardElement);
});
// index.js (Última línea)
}); // 👈 Cierra el listener de DOMContentLoaded