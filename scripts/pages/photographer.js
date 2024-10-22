import { getData } from "../utils/data.js";
import { photographerFactory } from "../factories/photographer.js";

async function init() {
  const $profilSection = document.querySelector(".profil");

  const { photographers } = await getData();

  // Get id URL
  const urlParam = new URL(document.location).searchParams;
  let photographerId = parseInt(urlParam.get("id"));

  // Search Photographer
  const selectedPhotographer = photographers.find(photographer => photographer.id === photographerId);

  // DOM Photographer Profil
  const photographerModel = photographerFactory(selectedPhotographer);
  const photographerProfilDOM = photographerModel.createPhotographerProfileDOM();
  $profilSection.appendChild(photographerProfilDOM);
}

init();
