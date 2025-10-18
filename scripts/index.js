// Seleccionar los elementos del DOM
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButtons = document.querySelectorAll(".popup__close");

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

// Función para abrir el popup
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

// Función para cerrar el popup
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

// Abrir el modal al hacer clic en "Editar"
editButton.addEventListener("click", () => {
  openPopup(editPopup);
});

// Cerrar el modal al hacer clic en la "X"
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
