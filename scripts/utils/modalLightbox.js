import { trapFocus } from "./trapFocus.js";
import { mediaFactory } from "../factories/media.js";

export function initModalLightBox(photographerMedia, photographerName) {
  let modalIsOpen = false;
  let releaseFocusTrap = null; // Variable to store the function to release the focus trap

  const $body = document.querySelector("body");
  const $mainWrapper = document.querySelector(".main-wrapper");
  const $modalLightbox = document.querySelector(".lightbox-modal");
  const $closeBtn = document.querySelector(".lightbox__close");
  const $prevBtn = document.querySelector(".lightbox__prev");
  const $nextBtn = document.querySelector(".lightbox__next");
  const $mediaElements = document.querySelectorAll(".galery-card__media");

  // Variable to track the current index
  let currentMediaIndex = 0;

  function goToNextMedia() {
    currentMediaIndex = currentMediaIndex + 1;
    if (currentMediaIndex > photographerMedia.length - 1) currentMediaIndex = 0;
    initModal();
  }

  function goToPrevMedia() {
    currentMediaIndex = currentMediaIndex - 1;
    if (currentMediaIndex < 0) currentMediaIndex = photographerMedia.length - 1;
    initModal();
  }

  function handleMediaEvent(mediaEvent) {
    if (mediaEvent.type === "click" || (mediaEvent.type === "keydown" && mediaEvent.key === "Enter")) {
      mediaEvent.preventDefault();
      try {
        const $mediaParentElement = mediaEvent.target.closest("[data-id]");

        if (!$mediaParentElement) {
          throw new Error("Parent element with data-id not found");
        }

        const mediaId = $mediaParentElement.getAttribute("data-id");

        // Find the index of the media that matches mediaId
        currentMediaIndex = photographerMedia.findIndex(media => media.id === parseInt(mediaId));

        if (currentMediaIndex !== -1) {
          initModal();
          openModal();
        } else {
          throw new Error("Media with the specified ID not found");
        }
      } catch (error) {
        console.error("An error occurred in handleMediaEvent:", error.message);
      }
    }
  }

  function initModal() {
    const selectedMedia = photographerMedia[currentMediaIndex];

    const mediaModel = mediaFactory(selectedMedia, photographerName);

    document.querySelector(".lightbox__title").textContent = mediaModel.data.title;

    const srTitle = `Visualisation de ${mediaModel.data.image ? "l'image" : "la vidéo"} agrandie`;
    document.getElementById("lightbox-sr-title").textContent = srTitle;

    const mediaElement = mediaModel.data.image
      ? mediaModel.createImgDom("lightbox__media", -1)
      : mediaModel.createVideoDom("lightbox__media", -1, true, true);
    document.querySelector(".lightbox__content").replaceChildren(mediaElement);
  }

  function handleKeyboardNavigation(event) {
    if (event.key === "ArrowRight") {
      goToNextMedia();
    } else if (event.key === "ArrowLeft") {
      goToPrevMedia();
    } else if (event.key === "Escape" && modalIsOpen) {
      closeModal();
    }
  }

  function openModal() {
    modalIsOpen = true;
    $body.classList.add("no-scroll");
    $modalLightbox.classList.add("contact-modal--is-open");

    $mainWrapper.setAttribute("aria-hidden", "true");
    $modalLightbox.setAttribute("aria-hidden", "false");
    $modalLightbox.setAttribute("aria-modal", "true");

    $prevBtn.addEventListener("click", goToPrevMedia);
    $nextBtn.addEventListener("click", goToNextMedia);

    // Add keyboard navigation for escape and left / right arrow keys
    document.addEventListener("keydown", handleKeyboardNavigation);

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

    // Remove keyboard navigation for escape and left / right arrow keys
    document.removeEventListener("keydown", handleKeyboardNavigation);

    // Disable focus trap
    if (releaseFocusTrap) {
      releaseFocusTrap();
      releaseFocusTrap = null; // Set to null to free memory by removing the reference
    }
  }

  $mediaElements.forEach(media => {
    media.addEventListener("click", handleMediaEvent);
    media.addEventListener("keydown", handleMediaEvent);
  });

  $closeBtn.addEventListener("click", closeModal);
}
