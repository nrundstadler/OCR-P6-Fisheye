import { createElement } from "../utils/domUtils.js";

export function mediaFactory(data, photographerName = "") {
  const { id, title, image, video, date } = data;
  let likes = data.likes;
  let liked = false;

  // Function to generate the correct media path based on photographerName
  function getMediaPath() {
    const photographerDirectory = photographerName.split(" ").shift().replace("-", " ");
    return `assets/photographers/media/${photographerDirectory}/${image ? image : video}`;
  }

  // Function to create an image DOM
  function createImgDom(classCSSName = "galery-card__media", tabindex = 0) {
    return createElement("img", {
      classes: [classCSSName],
      attributes: {
        src: getMediaPath(),
        alt: `Photographie nommée ${title}`,
        tabindex: String(tabindex),
      },
    });
  }

  // Function to create a video DOM
  function createVideoDom(classCSSName = "galery-card__media", tabindex = 0, autoplay = false, loop = false) {
    // Create the <video> element without controls, autoplay, or muted
    const videoElement = createElement("video", {
      classes: [classCSSName],
      attributes: {
        "aria-label": `Vidéo nommée ${title}`,
        tabindex: String(tabindex),
      },
    });

    // Add the autoplay attribute if the autoplay parameter is set to true
    if (autoplay) videoElement.setAttribute("autoplay", "");

    // Add the loop attribute if the loop parameter is set to true
    if (loop) videoElement.setAttribute("loop", "");

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

    // Create the <span> element for "likes" text, hidden for screen readers
    const srOnlyTextLikes = createElement("span", {
      classes: ["sr-only"],
      content: " likes",
    });

    // Append the <span> to the likeScore <p> element
    likeScore.appendChild(srOnlyTextLikes);

    // Create the like button <button>
    const likeButton = createElement("button", {
      classes: liked ? ["galery-card__like-btn", "galery-card__like-btn--liked"] : ["galery-card__like-btn"],
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

  function toggleLike() {
    // add or remove like to media
    liked ? likes-- : likes++;

    // Toggle the like status
    liked = !liked;

    // Select the like score element in the DOM and update it
    const $galleryCard = document.querySelector(`[data-id="${id}"]`);

    const $likeScoreElement = $galleryCard.querySelector(".galery-card__like-score");
    const $likeBtnElement = $galleryCard.querySelector(".galery-card__like-btn");
    const $likeBtnTextElement = $likeBtnElement.querySelector(".sr-only");

    if ($likeScoreElement) {
      const currentLikes = parseInt($likeScoreElement.textContent);
      $likeScoreElement.textContent = liked ? currentLikes + 1 : currentLikes - 1;
    }

    $likeBtnElement.classList.toggle("galery-card__like-btn--liked", liked);

    $likeBtnTextElement.textContent = !liked ? "J'aime" : "Je n'aime plus";

    return liked;
  }

  function getId() {
    return id;
  }

  function getDate() {
    return date;
  }

  function getImage() {
    return image;
  }

  function getTitle() {
    return title;
  }

  function getLikes() {
    return likes;
  }

  return { createMediaCardDOM, createImgDom, createVideoDom, getId, getDate, getLikes, getImage, getTitle, toggleLike };
}
