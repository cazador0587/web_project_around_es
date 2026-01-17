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

  // --- 2. INSTANCIAS DE COMPONENTES ---
  const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
    avatarSelector: ".profile__image",
  });

  const imagePopup = new PopupWithImage("#image-popup");
  imagePopup.setEventListeners();

  const confirmPopup = new PopupWithConfirmation("#confirm-popup");
  confirmPopup.setEventListeners();

  // ============================================================
  // --- 3. PUNTO C: FUNCIÓN AYUDANTE (Única lógica de tarjetas) ---
  // ============================================================
  function createCard(item) {
    const card = new Card(
      item,
      "#card-template",
      (data) => imagePopup.open(data), // Click en imagen

      // Manejador de Like ❤️
      (cardInstance) => {
        cardInstance.disableLike();
        const isLiked = cardInstance.isLiked();
        const request = isLiked
          ? api.removeLike(cardInstance.getId())
          : api.addLike(cardInstance.getId());

        request
          .then((updatedCard) => {
            cardInstance.toggleLike(updatedCard.isLiked);
          })
          .catch(console.log)
          .finally(() => cardInstance.enableLike());
      },

      // Manejador de Borrar 🗑️
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

  // --- 4. INICIALIZACIÓN DE LA SECCIÓN ---
  cardSection = new Section(
    {
      items: [],
      renderer: (item) => {
        const cardElement = createCard(item);
        cardSection.addItem(cardElement);
      },
    },
    ".cards__list"
  );

  // --- 5. CARGA DE DATOS (API) ---
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      userId = userData._id;
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });
      cardSection.renderItems(cards);
    })
    .catch(console.log);

  // --- 6. FORMULARIOS (Popups) ---

  // Editar Perfil
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

  // Nueva Tarjeta
  const addCardPopup = new PopupWithForm("#new-card-popup", (data) => {
    addCardPopup.renderLoading(true);
    api
      .addCard({ name: data.name, link: data.link })
      .then((newCardData) => {
        const cardElement = createCard(newCardData); // <--- USO DE PUNTO C
        cardSection.addItem(cardElement);
        addCardPopup.close();
      })
      .catch(console.log)
      .finally(() => addCardPopup.renderLoading(false));
  });
  addCardPopup.setEventListeners();

  // --- 7. VALIDACIÓN Y EVENTOS DE BOTONES ---
  const profileValidator = new FormValidator(
    validationConfig,
    document.querySelector("#edit-popup .popup__form")
  );
  profileValidator.setEventListeners();

  const newCardValidator = new FormValidator(
    validationConfig,
    document.querySelector("#new-card-popup .popup__form")
  );
  newCardValidator.setEventListeners();

  // Abrir modal de añadir
  document
    .querySelector(".profile__add-button")
    .addEventListener("click", () => {
      newCardValidator.resetValidation();
      addCardPopup.open();
    });

  // Abrir modal de editar
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
});
