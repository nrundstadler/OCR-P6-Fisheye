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
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      }
      // If Tab is pressed
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

  return () => {
    element.removeEventListener("keydown", handleKeyDown);
  };
}
