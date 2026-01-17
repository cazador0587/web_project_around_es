// Card.js

export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes || [];
    this._userId = userId;

    // Determinamos si el dueño de la tarjeta es el usuario actual
    this._ownerId =
      typeof data.owner === "object" ? data.owner._id : data.owner;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    // Botón de Like
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    // Botón de Borrar
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    // Click en la imagen para ampliar
    this._image.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  // Método para actualizar el estado visual del Like
  toggleLike(isLiked) {
    this._isLiked = isLiked;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    // Calculamos si el usuario actual ya le dio Like
    this._isLiked = this._likes.some((user) => user._id === this._userId);

    // 🗑️ Si no soy el dueño, elimino el botón de basura del DOM
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();
    this.toggleLike(this._isLiked); // Aplicamos el estado inicial del Like

    return this._element;
  }

  // Métodos de utilidad para index.js
  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  // Métodos para prevenir múltiples clics mientras la API responde
  disableLike() {
    this._likeButton.style.pointerEvents = "none";
  }

  enableLike() {
    this._likeButton.style.pointerEvents = "auto";
  }
}
