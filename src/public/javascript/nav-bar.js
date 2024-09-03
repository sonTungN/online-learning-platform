const mobileNav = document.querySelector(".navbar__hamburger");
const navbar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");

const toggleNav = () => {
  navbar.classList.toggle("active");
  mobileNav.classList.toggle("navbar__hamburger-active");
  overlay.classList.toggle("active");
};

// Hide sidebar and overlay if clicking outside of the sidebar
const closeNavOnClickOutside = (event) => {
  if (
    navbar.classList.contains("active") &&
    !navbar.contains(event.target) &&
    !mobileNav.contains(event.target)
  ) {
    navbar.classList.remove("active");
    mobileNav.classList.remove("navbar__hamburger-active");
    overlay.classList.remove("active");
  }
};

// Hide sidebar and overlay if the screen is resized to be wider
const closeNavOnResize = () => {
  if (window.innerWidth > 780 && navbar.classList.contains("active")) {
    navbar.classList.remove("active");
    mobileNav.classList.remove("navbar__hamburger-active");
    overlay.classList.remove("active");
  }
};

// Add event listeners
mobileNav.addEventListener("click", toggleNav);
overlay.addEventListener("click", closeNavOnClickOutside);
window.addEventListener("resize", closeNavOnResize);