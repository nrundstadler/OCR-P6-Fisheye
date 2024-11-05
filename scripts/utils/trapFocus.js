/**
 * Traps the focus inside the element.
 * The focus stays in the specified focusable elements (like buttons, text boxes, inputs)
 * and prevents the user from leaving by pressing Tab or Shift + Tab.
 *
 * @param {HTMLElement} element - The container element within which the focus should be trapped.
 * @returns {Function} - A cleanup function to remove the keydown event listener
 */

export function trapFocus(element) {
  const focusableElements = element.querySelectorAll('button, textarea, input[type="text"]');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  function handleKeyDown(e) {
    // Check if the Tab key was pressed
    if (e.key === "Tab") {
      // If Shift + Tab is pressed, move focus to the last element when on the first
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      }
      // If only Tab is pressed, move focus to the first element when on the last
      else {
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  }

  element.addEventListener("keydown", handleKeyDown);

  // Set initial focus on the first focusable element
  firstFocusableElement.focus();

  // Return a function to remove the keydown event listener
  return () => {
    element.removeEventListener("keydown", handleKeyDown);
  };
}
