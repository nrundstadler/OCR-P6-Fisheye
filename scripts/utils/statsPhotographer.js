export function initStatsPhotographer(totalLikes, price, collectionMediaModel) {
  document.querySelector(".stats__price-text").textContent = price + "€ / jour";
  updateTotalLike();

  const $mediaLikeElements = document.querySelectorAll(".galery-card__like-btn");

  $mediaLikeElements.forEach(mediaLike => {
    mediaLike.addEventListener("click", handleMediaLikeEvent);
    mediaLike.addEventListener("keydown", handleMediaLikeEvent);
  });

  function handleMediaLikeEvent(mediaLikeEvent) {
    if (mediaLikeEvent.type === "click" || (mediaLikeEvent.type === "keydown" && mediaLikeEvent.key === "Enter")) {
      // Go back to the closest parent element with the `data-id` attribute
      const $mediaContainer = mediaLikeEvent.target.closest("[data-id]");
      const mediaId = $mediaContainer.getAttribute("data-id");

      if (collectionMediaModel.hasOwnProperty(mediaId)) {
        const liked = collectionMediaModel[mediaId].toggleLike();

        liked ? totalLikes++ : totalLikes--;

        updateTotalLike();
      }
    }
  }

  function updateTotalLike() {
    document.querySelector(".stats__likes-text").textContent = totalLikes;
  }
}
