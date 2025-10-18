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

  // Evento para abrir el modal al hacer clic en "Editar perfil"
  editProfileButton.addEventListener("click", handleOpenEditModal);

  // 3️⃣ Vinculamos la función al evento 'submit' del formulario
  editProfileForm.addEventListener("submit", handleProfileFormSubmit);

  // Evento para cerrar el modal al hacer clic en el botón de cerrar (X)
  closeModalButton.addEventListener("click", function () {
    closeModal(editProfileModal);
  });
//});
