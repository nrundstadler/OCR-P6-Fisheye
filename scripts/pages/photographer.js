import { getData } from "../utils/data.js";
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { initModalContact } from "../utils/contactForm.js";

async function init() {
  const $profilSection = document.querySelector(".profil");
  const $galerySection = document.querySelector(".galery-section");

  // Get data API
  const { photographers, media } = await getData();

  // Get id URL
  const urlParam = new URL(document.location).searchParams;
  let photographerId = parseInt(urlParam.get("id"));

  try {
    // Search Photographer
    const selectedPhotographer = photographers.find(photographer => photographer.id === photographerId);

    // Check if selectedPhotographer exists, else throw an error
    if (!selectedPhotographer) {
      throw new Error("Photographer not found");
    }

    // DOM Photographer Profil
    const photographerModel = photographerFactory(selectedPhotographer);
    const photographerName = photographerModel.getName();
    const photographerProfilDOM = photographerModel.createPhotographerProfileDOM();
    $profilSection.appendChild(photographerProfilDOM);

    // Prepare the contact modal and add the event listeners
    initModalContact(photographerName);

    if (Array.isArray(media) && media.length > 0) {
      // Loop the media
      media.forEach(mediaItem => {
        // Check media that matches the photographer's ID
        if (mediaItem.photographerId === photographerId) {
          const mediaModel = mediaFactory(mediaItem, photographerName);
          const mediaCardDOM = mediaModel.createMediaCardDOM();
          $galerySection.appendChild(mediaCardDOM);
        }
      });
    }
  } catch (error) {
    console.error(error.message);
  }
}

init();
