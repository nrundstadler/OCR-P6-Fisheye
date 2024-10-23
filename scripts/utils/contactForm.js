import { trapFocus } from "./trapFocus.js";

export function initModalContact(photographerName) {
  let modalIsOpen = false;
  let releaseFocusTrap = null; // Variable to store the function to release the focus trap

  const $body = document.querySelector("body");
  const $mainWrapper = document.querySelector(".main-wrapper");
  const $modalContact = document.querySelector(".contact-modal");
  const $modalCloseBtn = document.querySelector(".modal__close-btn");
  const $modalOpenBtn = document.querySelector(".profil__contact");

  const $form = document.getElementById("formContact");
  const $formElements = {
    firstName: document.getElementById("firstname"),
    lastName: document.getElementById("lastname"),
    email: document.getElementById("email"),
    message: document.getElementById("message"),
  };

  function updateModalTitle() {
    // Select the existing <h2> element
    const $modalTitle = document.querySelector(".modal__title");
    // Create a <br> element
    const lineBreakElement = document.createElement("br");
    // Create a text node for "Mimi Keel"
    const nameElement = document.createTextNode(photographerName);

    // Append the <br> and the photographer name to the existing title
    $modalTitle.appendChild(lineBreakElement);
    $modalTitle.appendChild(nameElement);
  }

  function openModal() {
    modalIsOpen = true;
    $body.classList.add("no-scroll");
    $modalContact.classList.add("contact-modal--is-open");
    $mainWrapper.setAttribute("aria-hidden", "true");
    $modalContact.setAttribute("aria-hidden", "false");
    $modalContact.setAttribute("aria-modal", "true");

    // Enable focus trap
    releaseFocusTrap = trapFocus($modalContact);
  }

  function closeModal() {
    modalIsOpen = false;
    $body.classList.remove("no-scroll");
    $modalContact.classList.remove("contact-modal--is-open");
    $mainWrapper.setAttribute("aria-hidden", "false");
    $modalContact.setAttribute("aria-hidden", "true");
    $modalContact.setAttribute("aria-modal", "false");

    // Disable focus trap
    if (releaseFocusTrap) {
      releaseFocusTrap();
      releaseFocusTrap = null; // Set to null to free memory by removing the reference
    }
  }

  updateModalTitle();

  $modalOpenBtn.addEventListener("click", openModal);
  $modalCloseBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modalIsOpen) {
      closeModal();
    }
  });

  $form.addEventListener("submit", e => {
    e.preventDefault();

    console.log({
      firstName: $formElements.firstName.value,
      lastName: $formElements.lastName.value,
      email: $formElements.email.value,
      message: $formElements.message.value,
    });

    $formElements.firstName.value = "";
    $formElements.lastName.value = "";
    $formElements.email.value = "";
    $formElements.message.value = "";

    closeModal();
  });
}
