"use strict";

const navbar = document.querySelector("nav");
const hamburgerIcon = document.querySelector(".hamburger");

hamburgerIcon.addEventListener("click", () => {
    navbar.classList.toggle("hidden");
});
