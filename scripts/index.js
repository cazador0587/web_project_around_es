//document.addEventListener("DOMContentLoaded", function () {
  
  // Seleccionar los elementos del DOM
  const editProfileButton = document.querySelector(".profile__edit-button");
  const editProfileModal = document.querySelector("#edit-popup");
  const closeModalButton = editProfileModal.querySelector(".popup__close");

  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const nameInput = document.querySelector(".popup__input_type_name");
  const descriptionInput = document.querySelector(".popup__input_type_description");
  
  // 1️⃣ Seleccionamos el formulario
const editProfileForm = document.querySelector("#edit-profile-form");
  
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

  console.log("creando la configuracion inicial");
  const initialCards = [
    {
      name: "Valle de Yosemite",
      link: "https://placehold.co/282x282/0063d2/white",
    },
    {
      name: "Lago Louise",
      link: "https://placehold.co/282x282/0063d2/white",
    },
    {
      name: "Montañas Calvas",
      link: "https://placehold.co/282x282/0063d2/white",
    },
    {
      name: "Latemar",
      link: "https://placehold.co/282x282/0063d2/white",
    },
    {
      name: "Parque Nacional de la Vanoise",
      link: "https://placehold.co/282x282/0063d2/white",
    },
    {
      name: "Lago di Braies",
      link: "https://placehold.co/282x282/0063d2/white",
    },
  ];

/** ---------------------------------Card-------------------------------------------------------------------- */
// Función para crear una tarjeta a partir de un objeto con name y link
function getCardElement(name = "Sin título", link = "./images/placeholder.jpg") {
  // Clonamos el contenido del template
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  // Seleccionamos los elementos internos de la tarjeta
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  // 🌟 NUEVO: Selecciona el botón de "Me Gusta"
  const likeButton = cardElement.querySelector(".card__like-button");

  // Asignamos los valores dinámicos
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Añadimos el listener que toggles (alterna) la clase de activo
  likeButton.addEventListener("click", () => {
    // La clase 'card__like-button_is-active' es la que le da el estilo lleno
    likeButton.classList.toggle("card__like-button_is-active");
  });

  // Retornamos el elemento completamente configurado
  return cardElement;
}

function renderInitialCards(cardsData, container) {
  cardsData.forEach((cardData) => {
    const newCard = getCardElement(cardData.name, cardData.link);
    container.append(newCard);
  });
}
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
/** -------------------------------fIN modal------------------------------------------------------------- */

/**  ---------------------------------Evento Modal------------------------------------------------------------ */
// Llama a la función para que el proceso de renderizado inicie.
renderInitialCards(initialCards, cardsContainer); 

  // Evento para abrir el modal al hacer clic en "Editar perfil"
  editProfileButton.addEventListener("click", handleOpenEditModal);

  // 3️⃣ Vinculamos la función al evento 'submit' del formulario
  editProfileForm.addEventListener("submit", handleProfileFormSubmit);

  // Evento para cerrar el modal al hacer clic en el botón de cerrar (X)
  closeModalButton.addEventListener("click", function () {
    closeModal(editProfileModal);
  });
//});
/** ------------------------------------------------------------------------------------------------------- */
