// Card.js

export default class Card {
  constructor(data, cardSelector, handleCardClick, handleLikeClick, userId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes || []; /*Array.isArray(data.likes) ? data.likes : [];*/
    this._userId = userId;
    this._isLiked = this._likes.some(user => user._id === this._userId);

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      //this._likeButton.classList.toggle("card__like-button_is-active");
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });
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

    this._isLiked = this._likes.some((user) => user._id === this._userId);

    this._setEventListeners();
    this.toggleLike(this._isLiked);

    return this._element;
  }

  toggleLike(isLiked) {
    this._isLiked = isLiked;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }
}
