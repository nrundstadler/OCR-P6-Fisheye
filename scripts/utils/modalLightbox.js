import { trapFocus } from "./trapFocus.js";
import { mediaFactory } from "../factories/media.js";

export function initModalLightBox(photographerMedia, photographerName, photographerId) {
  let modalIsOpen = false;
  let releaseFocusTrap = null; // Variable to store the function to release the focus trap

  const $body = document.querySelector("body");
  const $mainWrapper = document.querySelector(".main-wrapper");
  const $modalLightbox = document.querySelector(".lightbox-modal");
  const $closeBtn = document.querySelector(".lightbox__close");
  const $prevBtn = document.querySelector(".lightbox__prev");
  const $nextBtn = document.querySelector(".lightbox__next");
  const $mediaElements = document.querySelectorAll(".galery-card__media");

  function initModal(mediaEvent) {
    const $mediaParentElement = mediaEvent.target.closest("[data-id]");

    if (!$mediaParentElement) {
      throw new Error("Parent element with data-id not found");
    }

    const mediaId = $mediaParentElement.getAttribute("data-id");

    console.log(photographerMedia);

    const selectedMedia = photographerMedia.find(photographerMedia => {
      return photographerMedia.id === parseInt(mediaId) && photographerMedia.photographerId === photographerId;
    });

    if (!selectedMedia) {
      throw new Error("Media with the specified ID not found");
    }

    const mediaModel = mediaFactory(selectedMedia, photographerName);

    document.querySelector(".lightbox__title").textContent = mediaModel.data.title;

    const srTitle = `Visualisation de ${mediaModel.data.image ? "l'image" : "la vidéo"} agrandie`;
    document.getElementById("lightbox-sr-title").textContent = srTitle;

    const mediaElement = mediaModel.data.image
      ? mediaModel.createImgDom("lightbox__media", -1)
      : mediaModel.createVideoDom("lightbox__media", -1, true, true);
    document.querySelector(".lightbox__content").replaceChildren(mediaElement);
  }

  function openModal() {
    modalIsOpen = true;
    $body.classList.add("no-scroll");
    $modalLightbox.classList.add("contact-modal--is-open");

    $mainWrapper.setAttribute("aria-hidden", "true");
    $modalLightbox.setAttribute("aria-hidden", "false");
    $modalLightbox.setAttribute("aria-modal", "true");

    // Enable focus trap
    releaseFocusTrap = trapFocus($modalLightbox);
  }

  function closeModal() {
    modalIsOpen = false;
    $body.classList.remove("no-scroll");
    $modalLightbox.classList.remove("contact-modal--is-open");

    $mainWrapper.setAttribute("aria-hidden", "false");
    $modalLightbox.setAttribute("aria-hidden", "true");
    $modalLightbox.setAttribute("aria-modal", "false");

    // Disable focus trap
    if (releaseFocusTrap) {
      releaseFocusTrap();
      releaseFocusTrap = null; // Set to null to free memory by removing the reference
    }
  }

  $mediaElements.forEach(media => {
    media.addEventListener("click", e => {
      try {
        initModal(e);
        openModal();
      } catch (error) {
        console.error("An error occurred in initModal:", error.message);
      }
    });
  });

  $closeBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modalIsOpen) {
      closeModal();
    }
  });
}
