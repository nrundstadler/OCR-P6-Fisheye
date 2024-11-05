import { getData } from "../utils/data.js";
import { photographerFactory } from "../factories/photographer.js";

// Function to render photographer profiles on the page
function renderPhotographerProfiles(photographers) {
  // Select the HTML section where photographer profiles will be displayed
  const $photographersSection = document.querySelector(".photographer-section");

  // Check if the photographers array is valid and contains data
  if (Array.isArray(photographers) && photographers.length > 0) {
    photographers.forEach(photographer => {
      // Use the photographer factory to create a photographer model
      // The photographer model serves as an interface between data and the display in the application
      const photographerModel = photographerFactory(photographer);

      // Generate the DOM element for the photographer card
      const photographerCardDOM = photographerModel.createPhotographerCardDOM();

      // Append the photographer card to the section
      $photographersSection.appendChild(photographerCardDOM);
    });
  }
}

async function init() {
  // Fetch photographers data (json)
  const { photographers } = await getData();

  renderPhotographerProfiles(photographers);
}

init();
