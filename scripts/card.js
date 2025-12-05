// Card.js

export class Card {
  // 1. Constructor: recibe datos de la tarjeta y selector de plantilla
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // 2. Método privado para obtener el marcado de la tarjeta (clonación de plantilla)
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card') // Asumiendo que el selector de tarjeta es '.card' dentro del template
      .cloneNode(true);

    return cardElement;
  }

  // 3. Método privado para el controlador de eventos "Like"
  _handleLikeIcon() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  // 4. Método privado para el controlador de eventos "Delete"
  _handleDeleteCard() {
    // Elimina el elemento de la tarjeta del DOM
    this._element.remove();
    this._element = null; // Buena práctica para liberar la referencia