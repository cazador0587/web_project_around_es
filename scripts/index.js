import { enableValidation, resetValidation } from "./validate.js";
//document.addEventListener("DOMContentLoaded", function () {

// Seleccionar los elementos del DOM
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const closeModalButton = editProfileModal.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);

// 1️⃣ Seleccionamos el formulario
const editProfileForm = document.querySelector("#edit-profile-form");

// Contenedor y template de tarjetas
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;
// 🔹 Botón para abrir el popup "Agregar una tarjeta"
const addCardButton = document.querySelector(".profile__add-button");
// 🔹 Ventana emergente (popup) para agregar una tarjeta
const addCardModal = document.querySelector("#new-card-popup");
// 🔹 Botón para cerrar la ventana de agregar tarjeta
const closeAddCardButton = addCardModal.querySelector(".popup__close");
// 🔹 Formulario dentro de la ventana emergente
const addCardForm = document.querySelector("#new-card-form");
// 🔹 Campos del formulario
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");

// 🖼️ Popup para ver imágenes
const imageModal = document.querySelector("#image-popup");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const imageModalImage = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");

console.log("creando la configuracion inicial");

// Datos iniciale
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

/** ---------------------------------Card-------------------------------------------------------------------- */
// Función para crear una tarjeta a partir de un objeto con name y link
function getCardElement(name, link) {
  // Clonamos el contenido del template
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  // Seleccionamos los elementos internos de la tarjeta
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  // 🌟 NUEVO: Selecciona el botón de "Me Gusta"
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Asignamos los valores dinámicos
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // 💖 Asignamos el manejador de "Me gusta"
  likeButton.addEventListener("click", handleLikeButton);

  // 🗑️ Botón Eliminar
  deleteButton.addEventListener("click", handleDeleteCard);

  cardImage.addEventListener("click", () => handleImageClick(name, link));

  // Retornamos el elemento completamente configurado
  return cardElement;
}

function handleLikeButton(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(evt) {
  const cardToDelete = evt.target.closest(".card");
  cardToDelete.remove();
}

function handleImageClick(name, link) {
  imageModalImage.src = link;
  imageModalImage.alt = name;
  imageModalCaption.textContent = name;
  openModal(imageModal);
}

// ✅ // Inserta una tarjeta en el contenedor renderCard
function renderCard(name, link, container) {
  const newCard = getCardElement(name, link);
  container.append(newCard);
}
// ✅ // Renderiza todas las tarjetas iniciales
initialCards.forEach((cardData) => {
  renderCard(cardData.name, cardData.link, cardsContainer);
});
/**---------------------------------------Card--------------------------------------------------------------------- */

/** --------------------------------Modal---------------------------------------------------------- */
// Función reutilizable: abrir modal
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

// Función reutilizable: cerrar modal
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  console.log("✅ handleOpenEditModal ejecutada");
  fillProfileForm();
  // 🧼 Añadir: Limpia errores y restablece el botón
  resetValidation(editProfileForm);
  openModal(editProfileModal);
}

// 2️⃣ Definimos la función manejadora del evento submit
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Evita el comportamiento por defecto (recargar la página)

  // Obtenemos los valores del formulario
  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  // Actualizamos el contenido del perfil
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;

  // Cerramos el modal
  closeModal(editProfileModal);
}

console.log(editProfileButton, editProfileModal);

function handleCardFormSubmit(evt) {
  evt.preventDefault(); // Evita que se recargue la página

  // Obtenemos los valores del formulario
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  // Creamos la nueva tarjeta
  const newCard = getCardElement(name, link);

  // La agregamos como primer elemento en el contenedor
  cardsContainer.prepend(newCard);

  // Limpiamos el formulario
  addCardForm.reset();

  // Cerramos el modal
  closeModal(addCardModal);
}
/** -------------------------------fIN modal------------------------------------------------------------- */

/**  ---------------------------------Eventos de los Modales------------------------------------------------------------ */
// Evento para abrir el modal al hacer clic en "Editar perfil"
// ✏️ Modal Editar perfil
editProfileButton.addEventListener("click", handleOpenEditModal);
// 3️⃣ Vinculamos la función al evento 'submit' del formulario
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
// Evento para cerrar el modal al hacer clic en el botón de cerrar (X)
closeModalButton.addEventListener("click", () => closeModal(editProfileModal));
imageModalCloseButton.addEventListener("click", () => closeModal(imageModal));

// ➕ Modal Agregar tarjeta
// 🟢 Abrir la ventana "Agregar tarjeta"
addCardButton.addEventListener("click", () => {
  // 1. Limpiamos los campos del formulario
  addCardForm.reset();
  // 2. 🧼 Añadir: Limpia errores y restablece el botón a inactivo
  resetValidation(addCardForm);
  openModal(addCardModal);
});
// 🟢 Detectar el envío del formulario "Agregar tarjeta"
addCardForm.addEventListener("submit", handleCardFormSubmit);
// 🔴 Cerrar la ventana "Agregar tarjeta"
closeAddCardButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

// Cerrar popup al hacer clic en la superposición (overlay)
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    // Si el clic NO se hace dentro del contenido, entonces cierra
    if (!evt.target.closest(".popup__content")) {
      closeModal(popup);
    }
  });
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closeModal(openedPopup);
  }
});

/** ------------------------------------------------------------------------------------------------------- */
// 🚀 INICIAR LA VALIDACIÓN EN TODOS LOS FORMULARIOS
enableValidation();