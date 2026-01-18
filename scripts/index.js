import Api from "./Api.js";
import { apiConfig } from "./constants.js";
import Card from "./card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./formValidator.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. CONFIGURACIÓN ---
  const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  const api = new Api(apiConfig);
  let userId;
  let cardSection;

  // --- 2. COMPONENTES ---
  const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
    avatarSelector: ".profile__image",
  });

  const imagePopup = new PopupWithImage("#image-popup");
  imagePopup.setEventListeners();

  const confirmPopup = new PopupWithConfirmation("#confirm-popup");
  confirmPopup.setEventListeners();

  // --- 3. FUNCIÓN AYUDANTE (CREAR TARJETAS) ---
  function createCard(item) {
    const card = new Card(
      item,
      "#card-template",
      (data) => imagePopup.open(data),
      (cardInstance) => {
        /* Lógica Like... igual que antes */
        cardInstance.disableLike();
        const isLiked = cardInstance.isLiked();
        const request = isLiked
          ? api.removeLike(cardInstance.getId())
          : api.addLike(cardInstance.getId());

        request
          .then((data) => {
            console.log("Datos recibidos:", data);

            // 1. Definimos el estado del Like basándonos en lo que responda la API
            let currentlyLiked;

            if (data.likes && Array.isArray(data.likes)) {
              // Caso A: La API devuelve un array de likes
              currentlyLiked = data.likes.some((u) => (u._id || u) === userId);
            } else if (typeof data.isLiked !== "undefined") {
              // Caso B: La API devuelve directamente un booleano isLiked (Tu caso actual)
              currentlyLiked = data.isLiked;
            } else {
              // Caso C: Fallback por si la estructura es distinta
              currentlyLiked = !isLiked;
            }

            console.log("¿Resultado final del Like?", currentlyLiked);
            cardInstance.toggleLike(currentlyLiked);
          })
          .catch((err) => console.log("Error al procesar el like:", err))
          .finally(() => cardInstance.enableLike());
      },
      (cardInstance) => {
        confirmPopup.open();
        confirmPopup.setSubmitAction(() => {
          api
            .deleteCard(cardInstance.getId())
            .then(() => {
              cardInstance.removeCard();
              confirmPopup.close();
            })
            .catch(console.log);
        });
      },
      userId
    );
    return card.generateCard();
  }

  // --- 4. POPUPS CON FORMULARIO ---

  // NUEVO: Avatar
  const avatarPopup = new PopupWithForm("#avatar-popup", (data) => {
    avatarPopup.renderLoading(true);
    api
      .updateAvatar(data.avatar) // Asegúrate de tener este método en Api.js
      .then((res) => {
        userInfo.setUserInfo({ avatar: res.avatar });
        avatarPopup.close();
      })
      .catch(console.log)
      .finally(() => avatarPopup.renderLoading(false));
  });
  avatarPopup.setEventListeners();

  // Editar Perfil e hilos de tarjetas... (mantener igual que el anterior)
  // Popup Editar Perfil
  const editProfilePopup = new PopupWithForm("#edit-popup", (data) => {
    editProfilePopup.renderLoading(true);
    api
      .updateUserInfo({ name: data.name, about: data.description })
      .then((userData) => {
        userInfo.setUserInfo({ name: userData.name, job: userData.about });
        editProfilePopup.close();
      })
      .catch(console.log)
      .finally(() => editProfilePopup.renderLoading(false));
  });
  editProfilePopup.setEventListeners();

  // Popup Nueva Tarjeta
  const addCardPopup = new PopupWithForm("#new-card-popup", (data) => {
    addCardPopup.renderLoading(true);
    api
      .addCard({ name: data.name, link: data.link })
      .then((newCardData) => {
        const cardElement = createCard(newCardData);
        cardSection.addItem(cardElement);
        addCardPopup.close();
      })
      .catch(console.log)
      .finally(() => addCardPopup.renderLoading(false));
  });
  addCardPopup.setEventListeners();

  // --- 5. VALIDACIÓN ---
  // Usamos document.querySelector directamente para evitar errores de variables no definidas
  const profileValidator = new FormValidator(
    validationConfig,
    document.querySelector("#edit-profile-form")
  );
  const newCardValidator = new FormValidator(
    validationConfig,
    document.querySelector("#new-card-form")
  );
  const avatarValidator = new FormValidator(
    validationConfig,
    document.querySelector("#avatar-form")
  );

  /*document
    .querySelector(".profile__avatar-edit-button")
    .addEventListener("click", () => {
      avatarValidator.resetValidation();
      avatarPopup.open();
    });*/

  profileValidator.setEventListeners();
  newCardValidator.setEventListeners();
  avatarValidator.setEventListeners();

  // --- 6. EVENTOS DE BOTONES ---
  document
    .querySelector(".profile__avatar-edit-button")
    .addEventListener("click", () => {
      avatarValidator.resetValidation();
      avatarPopup.open();
    });

  document
    .querySelector(".profile__add-button")
    .addEventListener("click", () => {
      newCardValidator.resetValidation();
      addCardPopup.open();
    });

  document
    .querySelector(".profile__edit-button")
    .addEventListener("click", () => {
      const currentUserData = userInfo.getUserInfo();
      document.querySelector(".popup__input_type_name").value =
        currentUserData.name;
      document.querySelector(".popup__input_type_description").value =
        currentUserData.job;
      profileValidator.resetValidation();
      editProfilePopup.open();
    });

  // --- 7. CARGA INICIAL ---
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      userId = userData._id;
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });
      // Inicializar Section y renderizar
      cardSection = new Section(
        {
          items: cards,
          renderer: (item) => {
            const cardElement = createCard(item);
            cardSection.addItem(cardElement);
          },
        },
        ".cards__list"
      );
      cardSection.renderItems(cards);
    })
    .catch(console.log);
});
