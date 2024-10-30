import { getData } from "../utils/data.js";
import { photographerFactory } from "../factories/photographer.js";
import { mediaFactory } from "../factories/media.js";
import { initModalContact } from "../utils/contactForm.js";
import { initModalLightBox } from "../utils/modalLightbox.js";
import { initStatsPhotographer } from "../utils/statsPhotographer.js";
import { initSortbyMenu } from "../utils/sortbyMenu.js";

async function init() {
  const $profileSection = document.querySelector(".profil");

  // Step 1: Fetch photographers and media data
  const { photographers, media } = await getData();

  // Step 2: Retrieve photographer ID from URL
  const photographerId = getPhotographerIdFromUrl();

  try {
    // Step 3: Select the photographer by ID and create profile
    const selectedPhotographer = getPhotographerById(photographers, photographerId);
    const photographerModel = photographerFactory(selectedPhotographer);
    const photographerName = photographerModel.getName();
    const photographerProfilDOM = photographerModel.createPhotographerProfileDOM();
    $profileSection.appendChild(photographerProfilDOM);

    // Step 4: Initialize contact modal
    initModalContact(photographerName);

    // Step 5: Filter and render media gallery for the selected photographer
    const photographerMedia = filterMediaByPhotographer(media, photographerId);
    const collectionMediaModel = createMediaCollection(photographerMedia, photographerName); // Create a collection of media instances
    const sortedArrayMedia = sortMedia(collectionMediaModel, "optionPopularity");
    renderMediaGallery(sortedArrayMedia);

    // Step 6: Initialize statistics block and add like listeners
    initStatsPhotographer(calculateTotalLikes(sortedArrayMedia), photographerModel.getPrice(), collectionMediaModel);

    // Step 7: Initialize lightbox functionality
    initModalLightBox(sortedArrayMedia);

    // Use a callback to update the media gallery and reset the lightbox
    // whenever a new sorting option is selected from the sort menu
    initSortbyMenu(sortCriterion => {
      const sortedArrayMedia = sortMedia(collectionMediaModel, sortCriterion);
      renderMediaGallery(sortedArrayMedia);
      initModalLightBox(sortedArrayMedia);
    });
  } catch (error) {
    console.error(error.message);
  }
}

function getPhotographerIdFromUrl() {
  const urlParam = new URL(document.location).searchParams;
  return parseInt(urlParam.get("id"));
}

function getPhotographerById(photographers, id) {
  const photographer = photographers.find(photographer => photographer.id === id);
  if (!photographer) throw new Error("Photographer not found");
  return photographer;
}

function filterMediaByPhotographer(media, photographerId) {
  return media.filter(mediaItem => mediaItem.photographerId === photographerId);
}

function createMediaCollection(mediaItems, photographerName) {
  const collectionMediaModel = {};

  mediaItems.forEach(mediaItem => {
    collectionMediaModel[mediaItem.id] = mediaFactory(mediaItem, photographerName);
  });

  return collectionMediaModel;
}

function renderMediaGallery(sortedArrayMedia) {
  const $gallerySection = document.querySelector(".galery-section");
  $gallerySection.innerHTML = "";

  sortedArrayMedia.forEach(mediaInstance => {
    const mediaCardDOM = mediaInstance.createMediaCardDOM();
    $gallerySection.appendChild(mediaCardDOM);
  });
}

function calculateTotalLikes(sortedArrayMedia) {
  return sortedArrayMedia.reduce((total, mediaModelItem) => total + mediaModelItem.getLikes(), 0);
}

// Function to sort media based on the selected criterion
function sortMedia(collectionMediaModel, criterion) {
  const mediaArray = Object.values(collectionMediaModel);

  switch (criterion) {
    case "optionDate":
      return mediaArray.sort((a, b) => new Date(a.getDate()) - new Date(b.getDate()));
    case "optionTitle":
      return mediaArray.sort((a, b) => a.getTitle().localeCompare(b.getTitle()));
    case "optionPopularity":
      return mediaArray.sort((a, b) => b.getLikes() - a.getLikes());
    default:
      return mediaArray;
  }
}

init();
