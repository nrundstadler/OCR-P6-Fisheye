export function initStatsPhotographer(totalLikes, price, collectionMediaModel) {
  document.querySelector(".stats__price-text").textContent = price + "€ / jour";
  updateTotalLike();

  // Ajoutez un écouteur de clics sur le conteneur parent des cartes
  const galerySection = document.querySelector(".galery-section");
  galerySection.addEventListener("click", handleMediaLikeEvent);
  galerySection.addEventListener("keydown", handleMediaLikeEvent);

  function handleMediaLikeEvent(event) {
    // Vérifiez si l'événement vient d'un bouton de like (par clic ou "Enter")
    if (
      event.target.classList.contains("galery-card__like-btn") &&
      (event.type === "click" || (event.type === "keydown" && event.key === "Enter"))
    ) {
      // Trouvez le conteneur de média ayant l'attribut `data-id`
      const mediaContainer = event.target.closest("[data-id]");
      const mediaId = mediaContainer.getAttribute("data-id");

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
