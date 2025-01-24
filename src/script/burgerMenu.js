// burgerMenu.js

document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector(".burger-menu");

  const navMenu = document.querySelector(".nav-menu");
  const menuText = document.querySelector(".menu-text");
  const cartIcon = document.querySelector(".cart-icon");

  // Toggle nav menu and update burger color & menu text color
  burgerMenu.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    menuText.classList.toggle("active");
    cartIcon.style.display = navMenu.classList.contains("active")
      ? "none"
      : "block";
  });
});
