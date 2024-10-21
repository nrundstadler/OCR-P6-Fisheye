import { photographerFactory } from "../factories/photographer.js";

async function getData() {
  const requestURL = "/data/photographers.json";
  try {
    const response = await fetch(requestURL);
    const resultatAPI = await response.json();
    return resultatAPI;
  } catch (error) {
    console.log("Erreur getData : " + error);
    return {};
  }
}

function renderPhotographerProfiles(photographers) {
  const $photographersSection = document.querySelector(".photographer_section");

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
