import { getData } from "../utils/data.js";
import { photographerFactory } from "../factories/photographer.js";

function renderPhotographerProfiles(photographers) {
  const $photographersSection = document.querySelector(".photographer-section");

  if (Array.isArray(photographers) && photographers.length > 0) {
    photographers.forEach(photographer => {
      const photographerModel = photographerFactory(photographer);
      const photographerCardDOM = photographerModel.createPhotographerCardDOM();
      $photographersSection.appendChild(photographerCardDOM);
    });
  }
}

async function init() {
  const { photographers } = await getData();
  renderPhotographerProfiles(photographers);
}

init();
