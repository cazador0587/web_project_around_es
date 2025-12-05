// utils.js

// Función para abrir la ventana modal
export function openModal(modalElement) {
  modalElement.classList.add("modal_is-opened");
  document.addEventListener("keydown", closeModalOnEsc);
}

// Función para cerrar la ventana modal
export function closeModal(modalElement) {
  modalElement.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", closeModalOnEsc);
}

// Controlador de eventos para cerrar la modal con la tecla ESC
export function closeModalOnEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Controlador de eventos para cerrar la modal al hacer click en el overlay o en el botón de cerrar
export function setModalCloseListeners(modalElement) {
  modalElement.addEventListener('click', (evt) => {
    // Si se hace click en el overlay (el propio elemento modal) o en el botón de cerrar
    if (evt.target.classList.contains('modal') || evt.target.classList.contains('modal__close-button')) {
      closeModal(modalElement);
    }
  });
}