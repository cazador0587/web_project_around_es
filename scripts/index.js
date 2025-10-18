// Seleccionar los elementos del DOM
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const closeModalButton = editProfileModal.querySelector(".popup__close");

console.log("creando la configuracion inicial");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://tripleten-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach(function (card) {
  console.log(card.name);
});

// Función reutilizable: abrir modal
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

// Función reutilizable: cerrar modal
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// Evento para abrir el modal al hacer clic en "Editar perfil"
editProfileButton.addEventListener("click", function () {
  openModal(editProfileModal);
});

// Evento para cerrar el modal al hacer clic en el botón de cerrar (X)
closeModalButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});
