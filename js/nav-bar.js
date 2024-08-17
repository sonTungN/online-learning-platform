const mobileNav = document.querySelector(".navbar__hamburger");
const navbar = document.querySelector(".navbar__menubar");

const toggleNav = () => {
    navbar.classList.toggle("active");
    mobileNav.classList.toggle("navbar__hamburger-active");
};

mobileNav.addEventListener("click", toggleNav);
