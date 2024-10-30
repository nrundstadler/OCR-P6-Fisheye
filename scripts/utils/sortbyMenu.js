// Manages interaction and accessibility for the sort menu
export function initSortbyMenu(onSortChange) {
  const $triggerButton = document.getElementById("sortbyTrigger");
  const $chevron = document.querySelector(".sortby__chevron");
  const $menu = document.querySelector(".sortby__menu");
  const $options = $menu.querySelectorAll(".sortby__item");
  let isOpen = false;
  let activeIndex = 0;

  // Toggles the sort menu open or closed
  function toggleMenu() {
    isOpen = !isOpen;
    $triggerButton.setAttribute("aria-expanded", isOpen);
    $menu.classList.toggle("sortby__menu--open", isOpen);
    $chevron.classList.toggle("sortby__chevron--down", !isOpen);
  }

  // Updates the active option in the menu
  function updateActiveOption() {
    $options.forEach(($option, i) => {
      const isActive = i === activeIndex;
      $option.setAttribute("aria-selected", isActive);
      if (isActive) {
        $menu.setAttribute("aria-activedescendant", $option.id);
      }
    });
  }

  // Sets the selected option and updates the button label
  function selectOption() {
    const selectedOption = $options[activeIndex];
    $triggerButton.innerHTML = `${selectedOption.textContent} <span aria-hidden="true" class="sortby__chevron"></span>`;
    updateActiveOption();
    toggleMenu();

    // Calls the onSortChange callback.
    // This allows the parent code to respond to the sort change.
    onSortChange(selectedOption.id);
  }

  // Handles keyboard navigation events
  function handleKeydown(event) {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        selectOption();
        $triggerButton.focus();
        break;
      case "Escape":
        if (isOpen) {
          toggleMenu();
          $triggerButton.focus();
        }
        break;
    }
  }

  /// Updates activeIndex when an option receives focus
  // and selects the option on click
  $options.forEach(($option, index) => {
    $option.addEventListener("focus", () => {
      activeIndex = index;
    });
    $option.addEventListener("click", () => {
      selectOption();
    });
  });

  // Event listener for keyboard navigation within the menu
  $menu.addEventListener("keydown", handleKeydown);

  // Event listener to open menu on click
  $triggerButton.addEventListener("click", toggleMenu);

  // Event listener to close the menu if clicking outside )
  document.addEventListener("click", event => {
    if (isOpen && !$menu.contains(event.target) && event.target !== $triggerButton) {
      toggleMenu();
    }
  });
}
