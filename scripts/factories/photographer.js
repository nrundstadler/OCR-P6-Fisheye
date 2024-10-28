import { createElement } from "../utils/domUtils.js";

export function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  const portraitSrc = `assets/photographers/profil/${portrait}`;

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
        src: portraitSrc,
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

  function createPhotographerProfileDOM() {
    // Create the container for the profile infos
    const profileInfos = createElement("div", {
      classes: ["profil__infos"],
    });

    // Create the h1 element for the photographer's name
    const nameElement = createElement("h1", {
      classes: ["profil__name"],
      content: name,
    });

    // Create the p element for the city and country
    const cityElement = createElement("p", {
      classes: ["profil__city"],
      content: `${city}, ${country}`,
    });

    // Create the p element for the tagline
    const taglineElement = createElement("p", {
      classes: ["profil__tag"],
      content: tagline,
    });

    // Append name, city, and tagline to the profile infos container
    profileInfos.appendChild(nameElement);
    profileInfos.appendChild(cityElement);
    profileInfos.appendChild(taglineElement);

    // Create the button for contact
    const contactButton = createElement("button", {
      classes: ["btn", "profil__contact"],
      attributes: {
        "aria-label": "Ouvre la fenêtre de contact",
      },
      content: "Contactez-moi",
    });

    // Create the img element for the photographer's portrait
    const imgElement = createElement("img", {
      classes: ["profil__img"],
      attributes: {
        src: portraitSrc,
        alt: `Portrait du photographe ${name}`,
      },
    });

    // Create a fragment to return everything together
    const fragment = document.createDocumentFragment();
    fragment.appendChild(profileInfos);
    fragment.appendChild(contactButton);
    fragment.appendChild(imgElement);

    return fragment;
  }

  function getName() {
    return name;
  }

  return { createPhotographerCardDOM, createPhotographerProfileDOM, getName };
}
