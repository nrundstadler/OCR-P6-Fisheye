import { createElement } from "../utils/domUtils.js";

export function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  function createPhotographerCardDOM() {
    // Create the article element
    const article = createElement("article", {
      classes: ["photographer-card"],
      attributes: {
        "data-photographer-id": id,
      },
    });

    // Create the link element
    const link = createElement("a", {
      classes: ["photographer-card__link"],
      attributes: {
        href: `./photographer.html?id=${id}`,
        "aria-label": `Lien vers la page du photographe ${name}`,
      },
    });

    // Create the img element
    const img = createElement("img", {
      classes: ["photographer-card__img"],
      attributes: {
        src: `assets/photographers/profil/${portrait}`,
        alt: `Portrait du photographe ${name}`,
      },
    });

    // Create the h2 element
    const h2 = createElement("h2", {
      classes: ["photographer-card__title"],
      content: name,
    });

    // Append img and h2 to the link
    link.appendChild(img);
    link.appendChild(h2);

    // Create the div photographer-card__infos
    const cardInfos = createElement("div", {
      classes: ["photographer-card__infos"],
    });

    // Create the p elements for city, tagline, and price
    const cityInfo = createElement("p", {
      classes: ["photographer-card__city"],
      content: `${city}, ${country}`,
    });

    const taglineInfo = createElement("p", {
      classes: ["photographer-card__tag"],
      content: tagline,
    });

    const priceInfo = createElement("p", {
      classes: ["photographer-card__price"],
      content: `${price}€/jour`,
    });

    // Append the p elements to the div
    cardInfos.appendChild(cityInfo);
    cardInfos.appendChild(taglineInfo);
    cardInfos.appendChild(priceInfo);

    // Append the link and div to the article
    article.appendChild(link);
    article.appendChild(cardInfos);

    return article;
  }

  return { createPhotographerCardDOM };
}
