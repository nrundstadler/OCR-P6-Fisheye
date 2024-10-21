/**
 * Utility function to create an HTML element with classes, attributes, and content.
 *
 * @param {string} tag - The type of HTML element to create (e.g., 'div', 'span').
 * @param {object} options - Options for the element including classes, attributes, and content.
 * @param {Array} options.classes - An array of class names to add to the element.
 * @param {object} options.attributes - An object representing attributes to set on the element.
 * @param {string} options.content - The content to be added inside the element
 * @returns {HTMLElement} - The created HTML element.
 */
export function createElement(tag, { classes = [], attributes = {}, content = "" } = {}) {
  // Create the HTML element with the specified tag
  const element = document.createElement(tag);

  // Add the provided classes (if any) to the element
  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  // Set the provided attributes (if any) on the element
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }

  // Set the content inside the element
  element.textContent = content;

  return element;
}
