/* -----------------------------------------
  Have focus outline only for keyboard users
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");

    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove("user-is-tabbing");

  window.removeEventListener("mousedown", handleMouseDownOnce);
  window.addEventListener("keydown", handleFirstTab);
};

window.addEventListener("keydown", handleFirstTab);

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

const toggleButton = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");
const content = document.querySelector(".content"); // Ensure content has the "content" class
const navLinks = document.querySelectorAll(".nav a"); // Adjust this selector if needed

toggleButton.addEventListener("click", () => {
  const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";

  toggleButton.setAttribute("aria-expanded", !isExpanded);

  if (!isExpanded) {
    const menuHeight = nav.offsetHeight;
    nav.classList.add("is-active"); // Show sidebar
    content.classList.add("menu-expanded"); // Shift content
    content.style.marginTop = `${menuHeight}`;
  } else {
    nav.classList.remove("is-active"); // Hide sidebar
    content.classList.remove("menu-expanded"); // Reset content
    content.style.marginTop = "1";
  }
});

// Adjust scroll position when clicking on a nav link in the hamburger menu
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (event) => {
    if (window.innerWidth <= 900 && nav.classList.contains("is-active")) {
      const menuHeight = nav.offsetHeight;

      // Prevent default behavior to manually adjust scroll
      event.preventDefault();

      const targetId = navLink.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const targetPosition = targetElement.offsetTop - menuHeight;

      // Smooth scrolling
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Collapse the menu
      toggleButton.setAttribute("aria-expanded", false);
      nav.classList.remove("is-active");
      content.classList.remove("menu-expanded");
      content.style.marginTop = "1";
    }
  });
});