// index.js
// Importa las clases y utilidades
import Api from "./Api.js";
import { apiConfig } from "./constants.js";
import Card from "./card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./formValidator.js";

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
  /*const initialCards = [
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
  ];*/

  // --- Elementos del DOM ---
  //const cardsContainer = document.querySelector('.cards__list');
  //const templateSelector = '#card-template'; // Selector de la plantilla de la tarjeta

  // Modales
  const modalEditProfile = document.querySelector("#edit-popup");
  const modalAddCard = document.querySelector("#new-card-popup");
  //const modalImageView = document.querySelector('#image-popup');

  // Formularios
  const formEditProfile = modalEditProfile.querySelector(".popup__form");
  const formAddCard = modalAddCard.querySelector(".popup__form");

  // Botones
  const buttonEditProfile = document.querySelector(".profile__edit-button");
  const buttonAddCard = document.querySelector(".profile__add-button");

  // Campos del formulario de perfil
  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_description");
  //const profileName = document.querySelector(".profile__title");
  //const profileJob = document.querySelector('.profile__description');

  // Elementos de la modal de imagen
  /*const imageViewImage = modalImageView.querySelector('.popup__image');
  const imageViewCaption = modalImageView.querySelector(".popup__caption");*/

  //instancia de la API
  const api = new Api(apiConfig);
  let userId;
  // --- Funciones de Lógica de la Tarjeta ---

  // Función que crea e inserta una tarjeta
  /*function createCard(data) {
    const card = new Card(data, templateSelector, handleImageClick);
    return card.generateCard();
  }*/

  //Creación de instancias
  const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
    avatarSelector: ".profile__image",
  });

  const imagePopup = new PopupWithImage("#image-popup");
  imagePopup.setEventListeners();

  const cardSection = new Section(
    {
      items: [],
      renderer: (item) => {
        const card = new Card(
          item,
          "#card-template",
          (data) => imagePopup.open(data),
          (cardInstance) => {
            const isLiked = cardInstance.isLiked();

            const request = isLiked
              ? api.removeLike(cardInstance.getId())
              : api.addLike(cardInstance.getId());

            /*request
              .then((updatedCard) => {
                cardInstance.toggleLike(updatedCard.likes.some(
                  (user) => user._id === userId));
              })
              .catch((err) => console.log(err));*/
            /*request
              .then((updatedCard) => {
                if (!updatedCard || !Array.isArray(updatedCard.likes)) {
                  console.error(
                    "Respuesta inválida del servidor:",
                    updatedCard
                  );
                  return;
                }

                const isLiked = updatedCard.likes.some(
                  (user) => user._id === userId
                );

                cardInstance.toggleLike(isLiked);
              })
              .catch((err) => console.log(err));*/
            request
              .then((updatedCard) => {
                cardInstance.toggleLike(updatedCard.isLiked);
              })
              .catch((err) => console.log(err));
          },
          userId
        );
        cardSection.addItem(card.generateCard());
      },
    },
    ".cards__list"
  );

  //llamada a la API
  api
    .getUserInfo()
    .then((data) => {
      userId = data._id;

      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
        avatar: data.avatar,
      });
    })
    .catch((err) => console.log(err));

  api
    .getInitialCards()
    .then((cards) => {
      cardSection.renderItems(cards);
    })
    .catch((err) => console.log(err));

  // --- Controladores de Eventos del Proyecto ---

  // 1. Manejo de la Modal de Edición de Perfil
  /*const editProfilePopup = new PopupWithForm("#edit-popup", (data) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.description,
    });
  });*/

  const editProfilePopup = new PopupWithForm("#edit-popup", (data) => {
    editProfilePopup.renderLoading(true);

    api
      .updateUserInfo({
        name: data.name,
        about: data.description,
      })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          job: userData.about,
        });
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editProfilePopup.renderLoading(false);
      });
  });

  editProfilePopup.setEventListeners();


  /*const addCardPopup = new PopupWithForm("#new-card-popup", (data) => {
    api
      .addCard(data)
      .then((cardData) => {
        const card = new Card(cardData, "#card-template", (item) =>
          imagePopup.open(item)
        );

        cardSection.addItem(card.generateCard());
        addCardPopup.close();
      })
      .catch((err) => console.log(err));
  });
  addCardPopup.setEventListeners();
*/
  
  const addCardPopup = new PopupWithForm("#new-card-popup", (data) => {
    addCardPopup.renderLoading(true);

    api
      .addCard({
        name: data["name"],
        link: data.link,
      })
      .then((cardData) => {
        const card = new Card(cardData, "#card-template", (cardInfo) =>
          imagePopup.open(cardInfo),(cardInstance) => {
          const isLiked = cardInstance.isLiked();
          const request = isLiked
            ? api.removeLike(cardInstance.getId())
            : api.addLike(cardInstance.getId());
          request
            .then((updatedCard) => {
              const likes = Array.isArray(updatedCard.likes)
                ? updatedCard.likes
                : [];
              
              cardInstance.toggleLike(
                likes.some(user => user._id === userId)
              );
            })
            .catch((err) => console.log(err));
        },
          userId
        );

        cardSection.addItem(card.generateCard());
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addCardPopup.renderLoading(false);
      });
  });

  addCardPopup.setEventListeners();
  
  /*const addCardPopup = new PopupWithForm("#new-card-popup", (data) => {
    const card = new Card(data, "#card-template", (cardData) =>
      imagePopup.open(cardData)
    );

    cardSection.addItem(card.generateCard());
  });

  addCardPopup.setEventListeners();
  */
  
  /*imagePopup.open({
   name: "Prueba",
   link: "https://placehold.co/600x400",
 });*/

  // --- Inicialización de la Lógica de Validación ---

  // Instancia de FormValidator para el formulario de Perfil
  const profileValidator = new FormValidator(validationConfig, formEditProfile);
  profileValidator.setEventListeners();

  // Instancia de FormValidator para el formulario de Nueva Tarjeta
  const newCardValidator = new FormValidator(validationConfig, formAddCard);
  newCardValidator.setEventListeners();

  // 2. Manejo de la Modal de Añadir Tarjeta
  buttonAddCard.addEventListener("click", () => {
    newCardValidator.resetValidation();
    addCardPopup.open();
  });

  buttonEditProfile.addEventListener("click", () => {
    const currentUserData = userInfo.getUserInfo();
    nameInput.value = currentUserData.name;
    jobInput.value = currentUserData.job;

    profileValidator.resetValidation();
    editProfilePopup.open();
  });

  //cardSection.renderItems();
});
