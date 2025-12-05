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
      .content.querySelector(".card") // Asumiendo que el selector de tarjeta es '.card' dentro del template
      .cloneNode(true);

    return cardElement;
  }

  // 3. Método privado para el controlador de eventos "Like"
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // 4. Método privado para el controlador de eventos "Delete"
  _handleDeleteCard() {
    // Elimina el elemento de la tarjeta del DOM
    this._element.remove();
    this._element = null; // Buena práctica para liberar la referencia
  }

  // 5. Método privado para configurar los detectores de eventos
  _setEventListeners() {
    // Botón de Like
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    // Botón de Eliminar
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    // Imagen (para abrir la ventana modal con la imagen grande)
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.addEventListener("click", () => {
      // Usa el callback para manejar la apertura de la modal de imagen
      this._handleImageClick(this._name, this._link);
    });
  }

  // 6. Método público que devuelve el elemento card completamente funcional
  generateCard() {
    // Obtiene el elemento de la plantilla
    this._element = this._getTemplate();

    // Rellena la tarjeta con datos
    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name; // Se añade 'alt' para accesibilidad

    // Configura los eventos
    this._setEventListeners();

    // Devuelve el elemento final
    return this._element;
  }
}