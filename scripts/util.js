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
