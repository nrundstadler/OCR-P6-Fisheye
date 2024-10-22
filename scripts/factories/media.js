import { createElement } from "../utils/domUtils.js";

export function mediaFactory(data, photographerName) {
  const { id, title, image, video, likes } = data;

  // Function to generate the correct media path based on photographerName
  function getMediaPath() {
    const photographerDirectory = photographerName.split(" ").shift().replace("-", " ");
    return `assets/photographers/media/${photographerDirectory}/${image ? image : video}`;
  }

  // Function to create an image DOM
  function createImgDom() {
    return createElement("img", {
      classes: ["galery-card__img"],
      attributes: {
        src: getMediaPath(),
        alt: `Photographie nommée ${title}`,
        tabindex: 0,
      },
    });
  }

  // Function to create a video DOM
  function createVideoDom() {
    // Create the <video> element without controls, autoplay, or muted
    const videoElement = createElement("video", {
      classes: ["galery-card__video"],
      attributes: {
        "aria-label": `Vidéo nommée ${title}`,
        tabindex: 0,
      },
    });

    // Create the <source> element for the video
    const sourceElement = createElement("source", {
      attributes: {
        src: getMediaPath(),
        type: "video/mp4",
      },
    });

    // Fallback text for unsupported browsers
    const fallbackText = document.createTextNode("Votre navigateur ne peut pas afficher la vidéo.");

    // Append the source and fallback text to the <video> element
    videoElement.appendChild(sourceElement);
    videoElement.appendChild(fallbackText);

    return videoElement;
  }

  function createMediaCardDOM() {
    // Create the <article> element
    const galleryCard = createElement("article", {
      classes: ["galery-card"],
      attributes: {
        "data-id": id,
      },
    });

    // Create the <img> ou <video> element
    const mediaElement = image ? createImgDom() : createVideoDom();

    // Create the details container
    const detailsDiv = createElement("div", {
      classes: ["galery-card__details"],
    });

    // Create the <h2> title element
    const titleElement = createElement("h2", {
      classes: ["galery-card__title"],
      content: title,
    });

    // Create the likes container <div>
    const likeDiv = createElement("div", {
      classes: ["galery-card__like"],
    });

    // Append the title and like container to the details container
    detailsDiv.appendChild(titleElement);
    detailsDiv.appendChild(likeDiv);

    // Create the likes score <p>
    const likeScore = createElement("p", {
      classes: ["galery-card__like-score"],
      content: likes,
    });

    // Create the like button <button>
    const likeButton = createElement("button", {
      classes: ["galery-card__like-btn"],
      attributes: {
        "aria-label": "Aimer cette photo",
      },
    });

    // Append the like score and button to the like container
    likeDiv.appendChild(likeScore);
    likeDiv.appendChild(likeButton);

    // Create the <span> element for hidden text (accessibility)
    const srOnlyText = createElement("span", {
      classes: ["sr-only"],
      content: "J'aime",
    });

    // Append the <span> to the button
    likeButton.appendChild(srOnlyText);

    // Append the image / video and details container to the gallery card
    galleryCard.appendChild(mediaElement);
    galleryCard.appendChild(detailsDiv);

    return galleryCard;
  }
  return { createMediaCardDOM };
}
