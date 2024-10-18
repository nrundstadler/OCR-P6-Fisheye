function photographerTemplate(data) {
  const { name, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("photographer-card");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.classList.add("photographer-card__img");

    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.classList.add("photographer-card__title");

    article.appendChild(img);
    article.appendChild(h2);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
