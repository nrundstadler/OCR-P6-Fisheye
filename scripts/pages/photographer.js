import { getData } from "../utils/data.js";
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { initModalContact } from "../utils/contactForm.js";
import { initModalLightBox } from "../utils/modalLightbox.js";
import { initStatsPhotographer } from "../utils/statsPhotographer.js";

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

    // Filter media by photographerId
    const photographerMedia = media.filter(mediaItem => mediaItem.photographerId === photographerId);

    if (photographerMedia.length > 0) {
      let totalLikes = 0; // Initialize total likes count

      const collectionMediaModel = {};

      // Loop the filtered media
      photographerMedia.forEach(mediaItem => {
        totalLikes += mediaItem.likes; // Accumulate likes for each media

        collectionMediaModel[mediaItem.id] = mediaFactory(mediaItem, photographerName);
        const mediaCardDOM = collectionMediaModel[mediaItem.id].createMediaCardDOM();
        $galerySection.appendChild(mediaCardDOM);
      });

      initStatsPhotographer(totalLikes, photographerModel.getPrice(), collectionMediaModel);

      // Pass only the filtered media to initModalLightBox
      initModalLightBox(photographerMedia, photographerName);
    }
  } catch (error) {
    console.error(error.message);
  }
}

init();
