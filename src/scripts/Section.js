export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  // Para las tarjetas iniciales de la API (van una tras otra abajo)
  appendItem(element) {
    this._container.append(element);
  }

  renderItems(items) {
    items.forEach((item) => {
      const element = this._renderer(item);
      this.appendItem(element);
    });
  }
}